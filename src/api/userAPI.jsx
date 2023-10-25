import { apiURL } from "../const/urls";

// Not currently used but might be soon
// const userStored = JSON.parse(localStorage.getItem('userStored'))

// export const getUserFromDbById = async (id, userSetter) => {
//   try {
//     const data = await fetch(`${apiURL}/users/${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${userStored?.token}`,
//       },
//     });
//     const dataToJson = await data.json();
//     // const updatedRecords = [...records, dataToJson.data[0]]
//     console.log("User retrieved from API");
//     userSetter(dataToJson)
//   } catch (error) {
//     console.log("error:", error);
//   }
// };

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

    }
  } catch (error) {
    console.error('Error:', error);
  }

};