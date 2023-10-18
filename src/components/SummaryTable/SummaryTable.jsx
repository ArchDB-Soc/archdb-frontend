import Card from '../Card/Card'
import { Table, Thead, Tr, Th, Tbody } from '@chakra-ui/react'

const SummaryTable = ({ columns, data, dataType }) => {
  return (
    <Table variant='striped'>
      <Thead>
        <Tr>
          {columns.map((col) => <Th key={col.id}>{col.name}</Th>)}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((item, index) =>
          <Card key={index} data={item} type={dataType} keyInfo={columns} />
        )}
      </Tbody>
    </Table>
  )
}

export default SummaryTable