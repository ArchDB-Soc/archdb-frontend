export const addContext = (data) => {
  fetch("https://iadb-backend.onrender.com/api/contexts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log("Saved:", JSON.stringify(response));
      })
      .catch(error => {
        console.error('Error:', error);
      })
}

export const getAllContexts = async (contextSetter) => {
  const BACKEND_URL = "https://iadb-backend.onrender.com/api/contexts"
  try {
    const data = await fetch(BACKEND_URL, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`
      }
    })
    const dataToJson = await data.json()
    // const updatedContexts = [...contexts, dataToJson.data[0]]
    console.log("The API has been called")
    contextSetter(dataToJson.data)


  } catch (error) {
    console.log("error:", error)
  }
}