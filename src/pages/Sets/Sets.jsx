import { useEffect, useState, useContext, lazy, Suspense, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getAllDataFromDb } from '../../api/calls'
import { Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { setFields } from '../../const/dataFields'
const SummaryTable = lazy(() => import("../../components/SummaryTable/SummaryTable"))

const Sets = () => {

  const [sets, setSets] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)
  const keyInfo = setFields.filter(field => field.keyInfo === true)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDataFromDb(setSets, "sets")
    setLoading(false)
  }, [])

  return (
    <Stack spacing={5} m={5} className="sets">
      <Breadcrumb separator='-'>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/'>
            Sets
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading as="h2" size="md" m={5}>Sets</Heading>
      {isLoggedIn ?
        <Link to="/add-set">
          <Button>Add Set</Button>
        </Link>
        : null}

      <Suspense fallback={<h2>Loading sets.</h2>}>
        <SummaryTable columns={keyInfo} data={sets} dataType="sets" loading={loading} />
      </Suspense>

    </Stack>
  )
}

export default Sets