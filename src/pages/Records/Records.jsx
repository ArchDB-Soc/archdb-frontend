import { useEffect, useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { getAllDataFromDb } from '../../api/calls'
import { Table, Thead, Tbody, Tr, Th, Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { recordFields } from '../../const/dataFields'

const Records = () => {

  const [records, setRecords] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)
  const keyInfo = recordFields.filter(field => field.keyInfo === true)



  useEffect(() => {
    getAllDataFromDb(setRecords, "records")
  }, [])

  return (
    <Stack spacing={5} m={5} className="records">
      <Breadcrumb separator='-'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/records'>
            Records
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" size="md" m={5}>Records</Heading>
      {isLoggedIn ?
        <Link to="/add-record">
          <Button>Add Record</Button>
        </Link>
        : null}
      <Table variant='striped'>
        <Thead>
          <Tr>
            {keyInfo.map((info) => <Th key={info.id}>{info.name}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {records?.map((record, index) =>
            <Card key={index} data={record} type="records" keyInfo={keyInfo} />
          )}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default Records