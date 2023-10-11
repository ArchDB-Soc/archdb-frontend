import { addContextToDb } from "../../api/calls";
import { contextFields } from "../../const/contextFields";
import { Input, Stack } from '@chakra-ui/react'
import buildObjectFromForm from "../../utils/utils";

const AddContext = () => {

  const postData = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    addContextToDb(data)
    document.getElementById("context-form").reset()
  }

  return (
    <Stack m={5} className='form-container'>
      <form onSubmit={postData} id="context-form">
        {contextFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.id}>{field.id}:</label>
            <Input id={field.id} type={field.type} />
          </div>
        )
        )}

        <button type="submit" >Submit</button>
      </form>
    </Stack>
  )
}

export default AddContext