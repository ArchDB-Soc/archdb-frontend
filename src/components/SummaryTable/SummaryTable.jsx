import { lazy, Suspense } from 'react'
import { Table, Thead, Td, Tr, Th, Tbody } from '@chakra-ui/react'
const Card = lazy(() => import("../../components/Card/Card"))

const SummaryTable = ({ columns, data, dataType, loading }) => {
  return (
    <Table variant='striped'>
      <Thead>
        <Tr>
          {columns.map((col) => <Th key={col.id}>{col.name}</Th>)}
        </Tr>
      </Thead>
      <Tbody>
        {loading ? <Tr><Td>Loading data</Td></Tr> : data?.map((item, index) =>
          <Suspense key={index} fallback={<Tr><Td>Loading data.</Td></Tr>}>
            <Card key={index} data={item} type={dataType} columns={columns} />
          </Suspense>
        )}
      </Tbody>
    </Table>
  )
}

export default SummaryTable