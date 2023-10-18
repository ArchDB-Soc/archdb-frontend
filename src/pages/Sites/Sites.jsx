import { useEffect, useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getAllDataFromDb } from '../../api/calls'
import { Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { siteFields } from '../../const/dataFields'
import SummaryTable from '../../components/SummaryTable/SummaryTable'

const Sites = () => {

  const [sites, setSites] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)
  const keyInfo = siteFields.filter(field => field.keyInfo === true)

  useEffect(() => {
    getAllDataFromDb(setSites, "sites")
  }, [])

  return (
    <Stack spacing={5} m={5} className="sites">
      <Breadcrumb separator='-'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/'>
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" size="md" m={5}>Sites</Heading>
      {isLoggedIn ?
        <Link to="/add-site">
          <Button>Add Site</Button>
        </Link>
        : null}
      <SummaryTable columns={keyInfo} data={sites} dataType="sites" />
    </Stack>
  )
}

export default Sites