import { apiURL } from "../const/urls";
const userStored = JSON.parse(localStorage.getItem('userStored'))

export const getAllDataFromDb = async (setData, type) => {
  try {
    const data = await fetch(`${apiURL}/${type}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    });
    const dataToJson = await data.json();
    setData(dataToJson.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const getPaginatedDataFromDb = async (setData, type, page) => {

  try {
    const url = page ? `${apiURL}/${type}?page=${page}` : `${apiURL}/${type}`
    const data = await fetch(url, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    });
    const dataToJson = await data.json();

    setData(prevData => {
      if ((Object.keys(prevData[0]).length === 0) && !prevData[1]) {
        return dataToJson.data;
      } else {
        return [...prevData, ...dataToJson.data];
      }
    });

    console.log(`Got data from page ${page ? page : 1} from the API`)
  } catch (error) {
    console.log("error:", error);
  }
};

export const updateDataInDb = async (dataToUpdate, type) => {
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
  console.log(url)
  try {
    await fetch(`${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
        "Content-Type": "application/json",
      },
    })

    location.reload()
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addSiteToDb = (data) => {
  // const token = Cookies.get('access_token')
  fetch(`${apiURL}/sites`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userStored?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("Saved:", JSON.stringify(response));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const addXToY = async (x, y, updatedData, yId) => {

  // addXToY("set", "site", data, data._site)

  const urlBuilder = (baseUrl, x, y, yId) => `${baseUrl}/${y}s/${yId}/${x}s`
  const dbUrl = urlBuilder(apiURL, x, y, yId)

  try {
    const response = await fetch(dbUrl, {
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