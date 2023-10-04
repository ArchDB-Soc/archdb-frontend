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