import { apiURL } from "../const/contextFields";
import Cookies from 'js-cookie'

export const addContextToDb = (data) => {
  const token = Cookies.get('access_token')
  fetch(`${apiURL}/contexts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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

export const getAllContextsFromDb = async (contextSetter) => {
  try {
    const data = await fetch(`${apiURL}/contexts`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    });
    const dataToJson = await data.json();
    // const updatedContexts = [...contexts, dataToJson.data[0]]
    console.log("The API has been called");
    contextSetter(dataToJson.data);
  } catch (error) {
    console.log("error:", error);
  }
};

export const authenticationRequest = async (email, password) => {
  console.log("checkpoint1")
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    console.log("checkpoint2")
    const status = response.status
    const res = await response.json();
    console.log(res)
    return res, status
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
