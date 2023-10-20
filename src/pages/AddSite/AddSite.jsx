import { addDataToDb } from "../../api/calls";
import { siteFields } from "../../const/dataFields";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Stack } from '@chakra-ui/react'
import buildObjectFromForm from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";

const AddSite = () => {

  const navigate = useNavigate()

  const siteInputs = siteFields.filter(field => (field.id !== "records"));


  const submitForm = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    addDataToDb(data, "sites")
    navigate("/")
  }


  return (
    <Stack m={5} className='form-container'>
      <Breadcrumb separator='-'>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to='/'>
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/add-site'>
            Add Site
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <form onSubmit={submitForm} id="site-form">
        {siteInputs.map((field, index) => (
          <CustomInput item={field} key={index} />
        ))}
        <Button type="submit" m={5}>Submit</Button>
      </form>
    </Stack>
  )
}

export default AddSite