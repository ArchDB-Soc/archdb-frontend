import { addContext } from "../../api/calls";

const AddContext = () => {

  const postData = (e) => {
    e.preventDefault();
    const data = {
      description: e.target.elements[0].value
    };

    addContext(data)
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