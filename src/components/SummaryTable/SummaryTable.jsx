import { lazy, Suspense } from 'react'
import { Table, Thead, Td, Tr, Th, Tbody } from '@chakra-ui/react'
const Row = lazy(() => import("../Row/Row"))

const SummaryTable = ({ columns, data, dataType, loading, header }) => {

  return (
    <Table variant='striped'>
      {header ?
        <Thead>
          <Tr>
            {columns.map((col) => <Th key={col.id}>{col.name}</Th>)}
          </Tr>
        </Thead> : null}

      <Tbody>
        {loading ? <Tr><Td>Loading data</Td></Tr> : data?.map((item, index) =>
          <Suspense key={index} fallback={<Tr><Td>Loading data.</Td></Tr>}>
            <Row
              key={index} data={item} type={dataType} columns={columns} />
          </Suspense>
        )}
      </Tbody>
    </Table>
  )
}

export default SummaryTable