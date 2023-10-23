import { addXToY, getAllDataFromDb } from "../../api/calls";
import { setFields } from "../../const/dataFields";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Select, Stack } from '@chakra-ui/react'
import buildObjectFromForm from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useEffect, useState } from "react";

const AddSet = () => {

  const navigate = useNavigate()
  const [sites, setSites] = useState([{}])

  const inputsForSets = setFields.filter(field => (field.id !== "_site" && field.id !== "siteName"));

  const submitForm = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    const chosenSite = sites.find(obj => obj._id === data._site)
    data.siteName = chosenSite.name // user-friendly name to use instead of site id
    addXToY("set", "site", data, data._site)
    navigate("/sets")
  }
  useEffect(() => {
    // if (openSites) { 
    getAllDataFromDb(setSites, "sites")
    // }  only request site list when accordion item is open
  }, [
    // openSites
  ])


  return (
    <Stack m={5} className='form-container'>
      <Breadcrumb separator='-'>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to='/'>
            Sets
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/add-set'>
            Add Set
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <form onSubmit={submitForm} id="set-form">

        <Box textAlign={"left"} padding={5}>
          <h2>Site *</h2>
          <Box paddingTop={3} paddingBottom={3}>
            <Select placeholder='Select Site' id="_site" required>
              {sites.map((site, index) => (
                <option value={site._id} key={index}>{site.name}</option>
              ))}
            </Select>
          </Box>
        </Box>


        {inputsForSets.map((field, index) => (
          <div key={index}>
            <CustomInput item={field} />
          </div>
        ))}
        <Button type="submit" m={5}>Submit</Button>
      </form>
    </Stack>
  )
}

export default AddSet