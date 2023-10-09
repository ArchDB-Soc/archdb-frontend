import { useEffect, useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'
import { getAllContextsFromDb } from '../../api/calls'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Stack
} from '@chakra-ui/react'

const Contexts = () => {

  const [contexts, setContexts] = useState([{}])

  useEffect(() => {
    getAllContextsFromDb(setContexts)
  }, [])

  return (
    <Stack spacing={5} m={5} className="contexts">
      <div>
        <p>All archeological contexts (records) uploaded to the IADB so far.</p>
      </div>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Description</Th>
            <Th>Eastings</Th>
            <Th>Checked By</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contexts?.map((context, index) =>
            <ContextCard key={index} context={context} />
          )}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default Contexts