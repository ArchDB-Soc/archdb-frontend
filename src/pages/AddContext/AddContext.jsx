import { addContext } from "../../api/calls";
import { contextFields } from "../../const/contextFields";

const AddContext = () => {


  const buildObjectFromForm = (keys, values) => {

    const object = {};

    for (let i = 0; i < keys.length && i < values.length; i++) {
      const key = keys[i];
      const value = values[i];
      object[key] = value;
    }
    console.log(object)

    return object
  }

  const postData = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    addContext(data)
  }

  return (
    <div className='context-form'>
      <form onSubmit={postData}>
        {contextFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.id}>{field.id}</label>
            <input id={field.id} type={field.type} />
          </div>
        )
        )}

        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default AddContext