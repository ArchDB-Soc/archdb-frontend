
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
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
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
        return urlBuilder("sites", `${id}`);
      case "records":
        return urlBuilder("sites", `${parentid}`, "records", `${id}`);
      case "sets":
        return urlBuilder("sites", `${parentid}`, "sets", `${id}`);
      default:
        console.log("no element found with that id or parent id");
        return urlBuilder("404");
    }
  }
  await apiRequest(urlCreator(type, id, parentid), "DELETE")
};

export const addDataToDb = async (data, type) => {
  await apiRequest(urlBuilder(type), "POST", JSON.stringify(data))
};

export const updateDataInDb = async (updatedData, y, yId, x, xId) => {
  await apiRequest(urlBuilder(y, yId, x, xId), "PUT", JSON.stringify(updatedData))
};

export const addRecordToDb = async (data, siteId) => {
  if (data._set === "") {
    console.log("no set")
    delete data._set
  }
  console.log(data._set)
  let response = {}
  response = await apiRequest(urlBuilder(`sites`, siteId, `records`), "PUT", JSON.stringify(data)) // create Record underneath Site

  if (data._set !== undefined) {
    console.log("set")
    await updateDataInDb(undefined, "sets", data._set, "records", response._id) // update Set to also include Record
  }
};