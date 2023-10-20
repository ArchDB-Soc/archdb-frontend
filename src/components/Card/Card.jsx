import {
  Tr, Td, Button, useDisclosure
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { deleteDataFromDb, updateDataInDb } from '../../api/calls'
import buildObjectFromForm from '../../utils/utils'
import EditModal from '../EditModal/EditModal'


const Card = ({ data, columns, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [updatedData, setUpdatedData] = useState(data)
  const isInitialRender = useRef(true)

  const createArrayOfSummaryValues = (summaryFields, dataObject) =>
    summaryFields.map(key => key.id)
      .reduce((result, field) => {
        result.push({ [field]: dataObject[field] });
        return result;
      }, [])
      .map(obj => Object.values(obj))

  const summaryValues = createArrayOfSummaryValues(columns, data)

  useEffect(() => {
    if (!isInitialRender.current) { // ensure updateDataInDb() doesn't trigger an infinite loop
      updateDataInDb(updatedData, type)
    }
  }, [updatedData])

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    isInitialRender.current = false
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const fieldsAndResponsesAsObject = buildObjectFromForm(fields, responses)
    const newData = Object.fromEntries(
      Object.entries(fieldsAndResponsesAsObject).filter(([key, value]) => value !== '')
    )
    setUpdatedData({ ...newData, _id: data._id })
    onClose()
  }

  const deleteData = () => {
    const parentid = ((data._site) ? data._site : undefined)
    deleteDataFromDb(type, data._id, parentid)
  }

  return (
    <Tr className="card">
      {summaryValues.map((value, index) => <Td key={index}>{value}</Td>)}
      <Td w="100px" p="10px">
        <Button onClick={onOpen}>Edit</Button>
        <EditModal isOpen={isOpen} onClose={onClose} data={data} handleSubmit={handleUpdateFormSubmit} type={type} />
      </Td>
      <Td w="100px" p="10px">
        <Button color="red" onClick={deleteData}>Delete</Button>
      </Td>
    </Tr >
  )
}

export default Card