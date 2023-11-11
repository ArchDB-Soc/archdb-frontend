import { apiURL } from "../const/urls";

export const authenticationRequest = async (email, password, setError, setIsLoggedIn) => {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status === 401) {
      setError("Incorrect user or password");
    } else {
      const resToJson = await response.json()
      setError('');
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

};