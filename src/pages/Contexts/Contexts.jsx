import { useEffect, useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ContextCard from '../../components/ContextCard/ContextCard'
import { getAllContextsFromDb } from '../../api/calls'
import { Table, Thead, Tbody, Tr, Th, Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'

const Contexts = () => {

  const [contexts, setContexts] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)

  useEffect(() => {
    getAllContextsFromDb(setContexts)
  }, [])

  return (
    <Stack spacing={5} m={5} className="contexts">
      <Breadcrumb separator='-'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/'>
            Contexts
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" size="md" m={5}>Contexts</Heading>
      {isLoggedIn ?
        <Link to="/add-context">
          <Button>Add Context</Button>
        </Link>
        : null}
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Entered By</Th>
            <Th>Checked By</Th>
            <Th>Excavated On</Th>
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