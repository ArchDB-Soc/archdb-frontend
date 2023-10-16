import { apiURL } from "../const/api";
// import { AuthContext } from '../../context/AuthContext'


const userStored = JSON.parse(localStorage.getItem('userStored'))

// import Cookies from 'js-cookie'

export const addContextToDb = (context) => {
  // const token = Cookies.get('access_token')
  fetch(`${apiURL}/contexts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userStored?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(context),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("Saved:", JSON.stringify(response));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getAllContextsFromDb = async (contextSetter) => {
  try {
    const data = await fetch(`${apiURL}/contexts`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    });
    const dataToJson = await data.json();
    console.log("Contexts retrieved from API");
    contextSetter(dataToJson.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const getAllSitesFromDb = async (siteSetter) => {
  try {
    const data = await fetch(`${apiURL}/sites`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    });
    const dataToJson = await data.json();
    console.log("Sites retrieved from API");
    siteSetter(dataToJson.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const addSiteToDb = (context) => {
  // const token = Cookies.get('access_token')
  fetch(`${apiURL}/sites`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userStored?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(context),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("Saved:", JSON.stringify(response));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const updateContextInDb = async (updatedContext) => {
  try {
    const response = await fetch(`${apiURL}/contexts/${updatedContext._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContext),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Context updated:", JSON.stringify(data));
    location.reload()

  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteContextFromDb = async (contextid) => {
  try {
    await fetch(`${apiURL}/contexts/${contextid}`, {
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
}

export const getUserFromDbById = async (id, userSetter) => {
  try {
    const data = await fetch(`${apiURL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userStored?.token}`,
      },
    });
    const dataToJson = await data.json();
    // const updatedContexts = [...contexts, dataToJson.data[0]]
    console.log("User retrieved from API");
    userSetter(dataToJson)
  } catch (error) {
    console.log("error:", error);
  }
}

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
}
