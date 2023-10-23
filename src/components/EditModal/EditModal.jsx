import React, { useRef, useState, useEffect } from 'react'
import { Stack, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Text } from '@chakra-ui/react'
import buildObjectFromForm from '../../utils/utils'
import { updateDataInDb } from '../../api/calls'

const EditModal = ({ isOpen, onClose, data,
  // handleSubmit, 
  type }) => {

  const updatableFields = { ...data }
  const readOnlyFields = {}

  const [updatedData, setUpdatedData] = useState(data)
  const isInitialRender = useRef(true)
  const handleSubmit = (e) => {
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

  useEffect(() => {
    if (!isInitialRender.current) { // ensure updateDataInDb() doesn't trigger an infinite loop
      updateDataInDb(updatedData, type)
    }
  }, [updatedData])

  delete updatableFields._id
  delete updatableFields.__v

  if (type === "records") {
    readOnlyFields._site = updatableFields._site
    delete updatableFields._site
    readOnlyFields.siteName = updatableFields.siteName
    delete updatableFields.siteName
    readOnlyFields._set = updatableFields._set
    delete updatableFields._set
  } else if (type === "sets") {
    readOnlyFields._site = updatableFields._site
    delete updatableFields._site
    readOnlyFields.siteName = updatableFields.siteName
    delete updatableFields.siteName
    readOnlyFields._records = updatableFields._records
    delete updatableFields._records
  } else if (type === "sites") {
    readOnlyFields._sets = updatableFields._sets
    delete updatableFields._sets
    delete updatableFields._records
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {data._id}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={(e) => handleSubmit(e)} id="update-data-form">
          <ModalBody>
            <Stack>
              {Object.entries(updatableFields).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key}>{key}:</label>
                  {value ?
                    <Input id={key} placeholder={value} name={key}></Input>
                    : <Input id={key} placeholder="-" name={key}></Input>
                  }
                </div>
              ))}
            </Stack>
            <Stack>
              {Object.entries(readOnlyFields).map(([key, value]) => (
                <div key={key}>
                  <Text>{key}:</Text>
                  {Array.isArray(value) ? (
                    <Text p={3} color="gray">
                      {value.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index < value.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </Text>
                  ) : (
                    <Text p={3} color="gray">{value}</Text>
                  )}
                </div>
              ))}
            </Stack>
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
  )
}

export default EditModal