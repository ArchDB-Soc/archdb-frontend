const AddContext = () => {

  const postData = (e) => {
    e.preventDefault();
    const data = {
      description: e.target.elements[0].value
    };

    fetch("http://localhost:4001/api/contexts", {
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
      });
  }



  return (
    <div className='context-form'>
      <h3>Add Context</h3>
      <form onSubmit={postData}>
        <label htmlFor="description">Description:</label>
        <input id="description" type="text" />
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default AddContext