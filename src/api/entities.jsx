import { apiURL } from "../const/urls";
const userStored = JSON.parse(localStorage.getItem('userStored'))

const simpleRequest = async (url, method, requestBody) => { // requestBody is optional
  const headers = (method === "GET") ? {} : {
    Authorization: `Bearer ${userStored?.token}`,
    "Content-Type": "application/json",
  } // currently all requests except GET require authorisation

  try {
    const data = await fetch(url, {
      method: method,
      headers: headers,
      body: requestBody ? requestBody : null,
    });
    const dataToJson = await data.json();
    console.log(`API request with method ${method} successful`)
    return dataToJson
  } catch (error) {
    console.log("error:", error);
  }
}

export const getAllDataFromDb = async (setData, type) => {
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
export const updateDataInDb = async (dataToUpdate, type) => {
  // PREPARING TO ADD THIS CODE BACK IN AFTER PUT REQUEST BUG IS FIXED
  // const url = `${apiURL}/${type}/${dataToUpdate._id}`
  // const method = "PUT"
  // const body = JSON.stringify(dataToUpdate)
  // const response = await simpleRequest(url, method, body)
  // console.log("Record updated:", JSON.stringify(response));

  try {
    const response = await fetch(`${apiURL}/${type}/${dataToUpdate._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Record updated:", JSON.stringify(data));
  } catch (error) {
    console.error("Error:", error);
  }

  location.reload()
};

export const addXToY = async (x, y, updatedData, yId) => {

  const urlBuilder = (baseUrl, x, y, yId) => `${baseUrl}/${y}s/${yId}/${x}s`
  const url = urlBuilder(apiURL, x, y, yId)

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Updated:", JSON.stringify(data));

  } catch (error) {
    console.error("Error:", error);
  }
};

const addRecordToSetInDb = async (recordId, setId) => {

  const dbUrl = `${apiURL}/sets/${setId}/records/${recordId}`

  try {
    const response = await fetch(dbUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Updated:", JSON.stringify(data));

  } catch (error) {
    console.error("Error:", error);
  }
};

export const addRecordToDb = async (data, siteid) => {
  if (data._set === "") {
    delete data._set
  }
  let responseData = {}
  try {
    const response = await fetch(`${apiURL}/sites/${siteid}/records`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    responseData = await response.json();
    console.log("Site updated with new Record:", JSON.stringify(responseData._id));
  } catch (error) {
    console.error("Error:", error);
  }

  if (data._set !== null) {
    try {
      addRecordToSetInDb(responseData._id, data._set)
    } catch (error) {
      console.error("Error:", error);
    }
  }

};