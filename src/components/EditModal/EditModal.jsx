import React from 'react'
import { Stack, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Text } from '@chakra-ui/react'

const EditModal = ({ isOpen, onClose, data, handleSubmit, type }) => {

  const updatableFields = { ...data }
  const readOnlyFields = {}

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
    readOnlyFields._records = updatableFields._records
    delete updatableFields._records
  }

  console.log(Object.entries(readOnlyFields))

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
              )
              )}
            </Stack>
            <Stack>
              {/* {Object.entries(readOnlyFields).map(([key, value]) => (
                <div key={key}>
                  <Text>{key}:</Text>
                  {value ?
                    <Text p={3} color="gray">{value}</Text>
                    : <Text>-</Text>
                  }
                </div>
              )
              )} */}

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