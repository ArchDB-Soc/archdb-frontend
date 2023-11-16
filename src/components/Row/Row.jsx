import {
  Tr, Td, Button, useDisclosure
} from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { deleteDataFromDb } from '../../api/calls'

const EditModal = lazy(() => import("../EditModal/EditModal"))


const Row = ({ data, columns, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const createArrayOfSummaryValues = (summaryFields, dataObject) =>
    summaryFields.map(key => key.id)
      .reduce((result, field) => {
        result.push({ [field]: dataObject[field] });
        return result;
      }, [])
      .map(obj => Object.values(obj))

  const summaryValues = createArrayOfSummaryValues(columns, data)



  const deleteData = () => {
    const parentid = ((data._site) ? data._site : undefined)
    deleteDataFromDb(type, data._id, parentid)
  }

  return (
    <Tr className="card">
      {summaryValues.map((value, index) => <Td key={index}>{value}</Td>)}
      <Td w="100px" p="10px">
        <Button onClick={onOpen}>Edit</Button>

        <Suspense fallback={<h2>Loading edit button.</h2>}>
          <EditModal isOpen={isOpen} onClose={onClose} data={data}
            type={type} />
        </Suspense>

      </Td>
      <Td w="100px" p="10px">
        <Button colorScheme="red" onClick={deleteData}>Delete</Button>
      </Td>
    </Tr >
  )
}

export default Row