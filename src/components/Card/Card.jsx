import {
  Tr,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import ModalEntry from '../ModalEntry/ModalEntry'
import { useState, useEffect, useRef } from 'react'
import { deleteContextFromDb, updateContextInDb } from '../../api/calls'
import buildObjectFromForm from '../../utils/utils'

const Card = ({ data, keyInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updatedData, setUpdatedData] = useState(data)
  const isInitialRender = useRef(true)

  // filter out key values from data to show in the card 
  const createArrayOfKeyValues = (keyFields, dataObject) =>
    keyFields.map(key => key.id)
      .reduce((result, field) => {
        if (dataObject.hasOwnProperty(field)) {
          result.push({ [field]: dataObject[field] });
        }
        return result;
      }, [])
      .map(obj => Object.values(obj))
  const keyValues = createArrayOfKeyValues(keyInfo, data)

  useEffect(() => {
    // isInitialRender ensures reload in updateContextInDb() doesn't trigger infinite loop
    if (!isInitialRender.current) {
      updateContextInDb(updatedData)
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

    setUpdatedData({
      ...newData,
      _id: data._id
    })
    onClose()
  }

  const deleteContext = () => {
    deleteContextFromDb(data._id)
  }

  return (
    <Tr className="card">
      {<Td>{keyValues[0]}</Td>}
      {<Td>{keyValues[1]}</Td>}
      {<Td>{keyValues[2]}</Td>}
      {<Td>{keyValues[3]}</Td>}
      <Td
        w="100px"
        p="10px"
      ><Button onClick={onOpen}>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit data {data._id}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={(e) => handleUpdateFormSubmit(e)} id="update-data-form">
              <ModalBody>
                <ModalEntry data={data} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button variant='ghost' type="submit">Update</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Td>
      <Td
        w="100px"
        p="10px"
      ><Button color="red" onClick={deleteContext}>Delete</Button></Td>
    </Tr >
  )
}

export default Card