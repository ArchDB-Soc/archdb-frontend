import { useEffect, useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getAllDataFromDb } from '../../api/calls'
import { Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { recordFields } from '../../const/dataFields'
import SummaryTable from "../../components/SummaryTable/SummaryTable"

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

      <SummaryTable columns={keyInfo} data={records} dataType="records" />


    </Stack>
  )
}

export default Records