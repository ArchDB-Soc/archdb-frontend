import { apiURL } from "../const/contextFields";
// import Cookies from 'js-cookie'

export const addContextToDb = (data) => {
  // const token = Cookies.get('access_token')
  const userStored = JSON.parse(localStorage.getItem('userStored'))
  fetch(`${apiURL}/contexts`, {
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

    console.log(resToJson.data)

    if (resToJson.message) {
      setError(resToJson.message);
    } else {
      setError('');
      console.log(resToJson.data.user.email)
      const userStored = {
        email: resToJson.data.user.email,
        token: resToJson.data.token,
      };
      localStorage.setItem('userStored', JSON.stringify(userStored));
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
