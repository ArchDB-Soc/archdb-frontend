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
import { updateContextInDb } from '../../api/calls'
import buildObjectFromForm from '../../utils/utils'

const ContextCard = ({ context }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updatedContext, setUpdatedContext] = useState(context)
  // const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;



  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const fieldsAndResponsesAsObject = buildObjectFromForm(fields, responses)

    const newContext = Object.fromEntries(
      Object.entries(fieldsAndResponsesAsObject).filter(([key, value]) => value !== '')
    )

    setUpdatedContext({
      ...newContext,
      _id: context._id
    })
    onClose()
  }
  // location.reload()

  useEffect(() => {
    updateContextInDb(updatedContext)


    // console.log(reloadCount)
    // if (reloadCount != 0) {
    //   sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //   window.location.reload();
    // } else {
    //   sessionStorage.removeItem('reloadCount');
    // }

  }, [updatedContext])




  return (
    <Tr className="card">
      <Td>{context._id}</Td>
      <Td>{context.description}</Td>
      <Td>{context.enteredBy}</Td>
      <Td>{context.checkedBy}</Td>
      <Td><Button onClick={onOpen}>...</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Context {context._id}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={(e) => handleSubmit(e)} id="update-context-form">
              <ModalBody>
                <ModalEntry context={context} />
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
    </Tr >
  )
}

export default ContextCard