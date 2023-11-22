
import { apiURL } from "../const/urls";
const userStored = JSON.parse(localStorage.getItem('userStored'))

const apiRequest = async (url, method, data) => { // data is optional
  const headers = (method === "GET") ? {} : {
    Authorization: `Bearer ${userStored?.token}`,
    "Content-Type": "application/json",
  } // currently GET is the only method that doesn't require authorisation

  try {
    const responseData = await fetch(url, {
      method: method,
      headers: headers,
      body: data ? data : null,
    });
    const responseAsJson = await responseData.json();
    console.log(`API request with method ${method} successful`)
    return responseAsJson
  } catch (error) {
    console.log("error:", error);
  }
}

const urlBuilder = (...segments) => {
  let url = `${apiURL}`
  const tail = segments.join('/')
  url = url + "/" + tail
  console.log(url)
  return url
}

export const getDataFromDb = async (setData, type, page) => { // page is optional where the API supports pagination
  const url = page ? urlBuilder(`${type}?page=${page}`) : urlBuilder(type)
  const response = await apiRequest(url, "GET")
  setData(prevData => {
    if ((Object.keys(prevData[0]).length === 0) && !prevData[1]) {
      return response.data;
    } else {
      return [...prevData, ...response.data];
    }
  });
};

export const deleteDataFromDb = async (type, id, parentid) => { //parentid is optional and not available for Sites
  const urlCreator = (type, id, parentid) => {
    switch (type) {
      case "sites":
        return `${apiURL}/sites/${id}`;
      case "records":
        return `${apiURL}/sites/${parentid}/records/${id}`;
      case "sets":
        return `${apiURL}/sites/${parentid}/sets/${id}`;
      default:
        console.log("no element found with that id or parent id");
        return `${apiURL}/404`;
    }
  }
  const url = urlCreator(type, id, parentid)
  const method = "DELETE"
  await apiRequest(url, method)
  location.reload()
};

export const addDataToDb = async (data, type) => {
  await apiRequest(urlBuilder(type), "POST", JSON.stringify(data))
};

export const updateDataInDb = async (updatedData, type, id) => {
  await apiRequest(urlBuilder(type, id), "PUT", JSON.stringify(updatedData))
};

export const addXToY = async (updatedData, x, y, yId) => {
  await apiRequest(urlBuilder(`${y}s`, yId, `${x}s`), "PUT", JSON.stringify(updatedData))
};

const addRecordToSetInDb = async (recordId, setId) => {
  await apiRequest(urlBuilder(`sets`, setId, `records`, recordId), "PUT")
};

export const addRecordToDb = async (data, siteId) => {
  if (data._set === "") {
    delete data._set
  }
  let response = {}
  response = await apiRequest(urlBuilder(`sites`, siteId, `records`), "PUT", JSON.stringify(data))

  if (data._set !== null) {
    await addRecordToSetInDb(response._id, data._set)
  }

};