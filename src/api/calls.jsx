import { apiURL } from "../const/api";
// import { AuthContext } from '../../context/AuthContext'

const userStored = JSON.parse(localStorage.getItem('userStored'))

// import Cookies from 'js-cookie'

export const addDataToDb = (data, route) => {
  // const token = Cookies.get('access_token')
  fetch(`${apiURL}/${route}`, {
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

export const getAllDataFromDb = async (setter, route) => {
  try {
    const data = await fetch(`${apiURL}/${route}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    });
    const dataToJson = await data.json();
    setter(dataToJson.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const updateDataInDb = async (updatedData, route) => {
  try {
    const response = await fetch(`${apiURL}/${route}/${updatedData._id}`, {
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
    console.log("Record updated:", JSON.stringify(data));
    location.reload()

  } catch (error) {
    console.error("Error:", error);
  }
};

export const addRecordToSite = async (updatedData, siteid) => {

  console.log(updatedData)

  if (updatedData._set === "") {
    delete updatedData._set
    console.log(updatedData)
  }

  try {
    const response = await fetch(`${apiURL}/sites/${siteid}/records`, {
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
    console.log("Site updated with new Record:", JSON.stringify(data));

    if (updatedData._set !== null) {
      try {
        addExistingRecordToSet(data._id, updatedData._set)
      } catch (error) {
        console.error("Error:", error);
      }
    }

    location.reload()

  } catch (error) {
    console.error("Error:", error);
  }
};

const addExistingRecordToSet = async (recordId, setId) => {
  try {
    const response = await fetch(`${apiURL}/sets/${setId}/records/${recordId}`, {
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
    console.log("Set updated with Record ID:", JSON.stringify(data));

  } catch (error) {
    console.error("Error:", error);
  }
}

export const addSetToSite = async (updatedData, siteid) => {
  try {
    const response = await fetch(`${apiURL}/sites/${siteid}/sets`, {
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
    console.log("Data added:", JSON.stringify(data));
    location.reload()

  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteDataFromDb = async (type, id, parentid) => { //parentid is optional and not available for Sites
  const urlCreator = (baseURL, type, id, parentid) => {
    if (type === "sites") {
      const fullApiURL = `${baseURL}/sites/${id}`
      return fullApiURL
    } else if (type === "records") {
      const fullApiURL = `${baseURL}/sites/${parentid}/records/${id}`
      return fullApiURL
    } else if (type === "sets") {
      const fullApiURL = `${baseURL}/sites/${parentid}/sets/${id}`
      return fullApiURL
    } else {
      console.log("no element found with that id or parent id")
      return `${baseURL}/404`
    }
  }
  const url = urlCreator(apiURL, type, id, parentid)
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

export const getUserFromDbById = async (id, userSetter) => {
  try {
    const data = await fetch(`${apiURL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
      },
    });
    const dataToJson = await data.json();
    // const updatedRecords = [...records, dataToJson.data[0]]
    console.log("User retrieved from API");
    userSetter(dataToJson)
  } catch (error) {
    console.log("error:", error);
  }
};

export const authenticationRequest = async (email, password, setError, setIsLoggedIn) => {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    });

    const resToJson = await response.json()

    if (resToJson.message) {
      setError(resToJson.message);
    } else {
      setError('');
      const userStored = {
        email: resToJson.data.user.email,
        token: resToJson.data.token,
      };
      localStorage.setItem('userStored', JSON.stringify(userStored));
      setIsLoggedIn(true);
      console.log(setIsLoggedIn)
      location.reload()

    }
  } catch (error) {
    console.error('Error:', error);
  }
};
