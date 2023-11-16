import { useEffect, useState, useContext, lazy, Suspense, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getPaginatedDataFromDb } from '../../api/calls'
import { Stack, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Box } from '@chakra-ui/react'
import { UserContext } from '../../App'
import { recordFields } from '../../const/dataFields'
import { sampleRecords } from '../../const/sampleData'
const SummaryTable = lazy(() => import("../../components/SummaryTable/SummaryTable"))

const Records = () => {

  const [records, setRecords] = useState([{}])
  const { isLoggedIn } = useContext(UserContext)
  const keyInfo = recordFields.filter(field => field.keyInfo === true)
  const [page, setPage] = useState(1)
  const pagesFetched = useRef([1])
  const isLoading = useRef(true);

  const renderCount = useRef(0)

  useEffect(() => {
    getPaginatedDataFromDb(setRecords, "records", 1)
    setPage(2)
    isLoading.current = false
    renderCount.current += 1;
    console.log(`Component has rendered ${renderCount.current} times`);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY > window.outerHeight
        && page <= 5 // need to replace "100" with fetch request to calculate total pages
      ) {
        if (!pagesFetched.current.includes(page)) {
          getPaginatedDataFromDb(setRecords, "records", page)
          pagesFetched.current.push(page)
          setPage(page + 1)
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, [
    page, records, setPage
  ]);


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

      <Box>
        <SummaryTable columns={keyInfo} data={sampleRecords} dataType="records" loading={false} header />
        <Suspense fallback={<h2>Loading records.</h2>}>
          <SummaryTable columns={keyInfo} data={records} dataType="records" loading={isLoading.current} />
        </Suspense>
      </Box>

    </Stack>
  )
}

export default Records