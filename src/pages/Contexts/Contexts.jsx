import { useEffect, useState } from 'react'
import ContextCard from '../../components/ContextCard/ContextCard'
import { getAllContextsFromDb } from '../../api/calls'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Stack,
  Heading
} from '@chakra-ui/react'

const Contexts = () => {

  const [contexts, setContexts] = useState([{}])

  useEffect(() => {
    getAllContextsFromDb(setContexts)
  }, [])

  return (
    <Stack spacing={5} m={5} className="contexts">
      <div>
        <Heading as="h2" size="md" m={5}>Contexts</Heading>
        <p>Archeological contexts (records) uploaded to the IADB.</p>
      </div>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Description</Th>
            <Th>Entered By</Th>
            <Th>Checked By</Th>
            <Th></Th>
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