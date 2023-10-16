import { useEffect, useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { getAllSitesFromDb } from '../../api/calls'
import { Table, Thead, Tbody, Tr, Th, Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { siteFields } from '../../const/dataFields'

const Sites = () => {

  const [sites, setSites] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)
  const keyInfo = siteFields.filter(field => field.keyInfo === true)

  useEffect(() => {
    getAllSitesFromDb(setSites)
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
      <Table variant='striped'>
        <Thead>
          <Tr>
            {keyInfo.map((info) => <Th key={info.id}>{info.name}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {sites?.map((site, index) =>
            <Card key={index} data={site} keyInfo={keyInfo} />
          )}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default Sites