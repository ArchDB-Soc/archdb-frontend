import { useEffect, useState, useContext, lazy, Suspense, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getDataFromDb } from '../../api/entities'
import { Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { siteFields } from '../../const/dataFields'
const SummaryTable = lazy(() => import("../../components/SummaryTable/SummaryTable"))

const Sites = () => {

  const [sites, setSites] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)
  const keyInfo = siteFields.filter(field => field.keyInfo === true)
  const isLoading = useRef(true);

  useEffect(() => {
    getDataFromDb(setSites, "sites")
    isLoading.current = false
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
      <Link to="/add-site">
        <Button>Add Site</Button>
      </Link>
      <Suspense fallback={<h2>Loading sites.</h2>}>
        <SummaryTable columns={keyInfo} data={sites} dataType="sites" loading={isLoading.current} />
      </Suspense>

    </Stack>
  )
}

export default Sites