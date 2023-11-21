import { apiURL } from "../const/urls";



export const authenticationRequest = async (email, password, setErrorMessage) => {

  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status === 401) {
      setErrorMessage("Incorrect user or password");
    } else {
      const resToJson = await response.json()
      setErrorMessage('')
      console.log("Email and password verified")
      return resToJson
    }
  } catch (error) {
    console.error('Error:', error);
  }

};