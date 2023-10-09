import {
  Tr,
  Td
} from '@chakra-ui/react'

const ContextCard = ({ context }) => {
  return (
    <Tr className="card">
      <Td>ID: {context._id}</Td>
      <Td>{context.description}</Td>
      <Td>{context.eastings}</Td>
      <Td>{context.checkedBy}</Td>
      <Td>{context.notes}</Td>
    </Tr>
  )
}

export default ContextCard