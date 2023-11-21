
import { apiURL } from "../const/urls";
const userStored = JSON.parse(localStorage.getItem('userStored'))

const simpleRequest = async (url, method, content) => { // content is optional
  const headers = (method === "GET") ? {} : {
    Authorization: `Bearer ${userStored?.token}`,
    "Content-Type": "application/json",
  } // currently all requests except GET require authorisation

  try {
    const data = await fetch(url, {
      method: method,
      headers: headers,
      body: content ? content : null,
    });
    const dataToJson = await data.json();
    console.log(`API request with method ${method} successful`)
    return dataToJson
  } catch (error) {
    console.log("error:", error);
  }
}

export const getDataFromDb = async (setData, type) => {
  const url = `${apiURL}/${type}`
  const method = "GET"
  const response = await simpleRequest(url, method)
  setData(response.data)
};

export const getPaginatedDataFromDb = async (setData, type, page) => {
  const url = page ? `${apiURL}/${type}?page=${page}` : `${apiURL}/${type}`
  const method = "GET"
  const response = await simpleRequest(url, method)
  setData(prevData => {
    if ((Object.keys(prevData[0]).length === 0) && !prevData[1]) {
      return response.data;
    } else {
      return [...prevData, ...response.data];
    }
  });
  console.log(`Page ${page ? page : 1} retrieved`)
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
  await simpleRequest(url, method)
  location.reload()
};

export const addDataToDb = async (data, type) => {
  const urlCreator = (type) => {
    switch (type) {
      case "sites":
        return `${apiURL}/sites`;
      default:
        console.log("no element found with that id or parent id");
        return `${apiURL}/404`;
    }
  }
  const url = urlCreator(type)
  const method = "POST"
  const body = JSON.stringify(data)
  await simpleRequest(url, method, body)
};

// PUT requests
export const updateDataInDb = async (updatedData, type) => {
  const url = `${apiURL}/${type}/${updatedData._id}`
  const method = "PUT"
  const body = JSON.stringify(updatedData)
  await simpleRequest(url, method, body)
  location.reload()
};

export const addXToY = async (x, y, updatedData, yId) => {
  const urlBuilder = (baseUrl, x, y, yId) => `${baseUrl}/${y}s/${yId}/${x}s`
  const url = urlBuilder(apiURL, x, y, yId)
  const method = "PUT"
  const body = JSON.stringify(updatedData)
  await simpleRequest(url, method, body)
};

const addRecordToSetInDb = async (recordId, setId) => {
  const url = `${apiURL}/sets/${setId}/records/${recordId}`
  const method = "PUT"
  await simpleRequest(url, method)
  console.log(`record ${recordId} added to set ${setId}`)
};

export const addRecordToDb = async (data, siteid) => {
  console.log("check1")
  if (data._set === "") {
    delete data._set
  }
  let response = {}
  const url = `${apiURL}/sites/${siteid}/records`
  const method = "PUT"
  const body = JSON.stringify(data)
  response = await simpleRequest(url, method, body)
  console.log("Site updated with new Record:", JSON.stringify(response))

  if (data._set !== null) {
    await addRecordToSetInDb(response._id, data._set)
  }

};