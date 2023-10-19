import React from 'react'
import { Stack, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input } from '@chakra-ui/react'

const EditModal = ({ isOpen, onClose, data, handleSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit {data._id}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={(e) => handleSubmit(e)} id="update-data-form">
          <ModalBody>
            <Stack>
              {Object.entries(data).map(([key, value]) => (
                (key !== "_id") ?
                  <div key={key}>
                    <label htmlFor={key}>{key}:</label>
                    {value ?
                      <Input id={key} placeholder={value} name={key}></Input>
                      : <Input id={key} placeholder="-" name={key}></Input>
                    }
                  </div> : null
              )
              )}
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