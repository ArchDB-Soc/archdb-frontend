import { addRecordToSite, getAllDataFromDb } from "../../api/calls";
import { recordFields } from "../../const/dataFields";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Stack, Text } from '@chakra-ui/react'
import buildObjectFromForm, { capitaliseFirstLetter } from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";

const AddRecord = () => {

  const navigate = useNavigate()
  const [sites, setSites] = useState([{}])
  const [sets, setSets] = useState([{}])
  // const [openSites, setOpenSites] = useState(false)

  const submitForm = (e) => {
    e.preventDefault();

    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    const chosenSite = sites.find(obj => obj._id === data._site)
    data.siteName = chosenSite.name // user-friendly name to use instead of site id
    addRecordToSite(data, data._site)
    document.getElementById("record-form").reset()
    navigate("/records")
  }

  const createCategoriesArray = (recordArr) => {
    const typesArr = [...new Set(recordArr.map((record) => record.category))]
    const typesArrWithoutSite = typesArr.filter(item => (item !== 'site' && item !== "internal")) // treat Sites separately as a required field
    return typesArrWithoutSite
  }

  const findAllFieldsFromCategory = (fieldsArr, category) => {


    return fieldsArr.filter(item => item.category === category)
  }

  useEffect(() => {
    // if (openSites) { 
    getAllDataFromDb(setSites, "sites")
    getAllDataFromDb(setSets, "sets")
    // }  only request site list when accordion item is open
  }, [
    // openSites
  ])

  return (
    <Stack m={5} className='form-container'>
      <Breadcrumb separator='-'>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to='/records'>
            Records
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/add-record'>
            Add Record
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <form onSubmit={submitForm} id="record-form">
        <Accordion allowToggle>
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
          <Box textAlign={"left"} padding={5}>
            <h2>Set</h2>
            <Box paddingTop={3} paddingBottom={3}>
              <Select placeholder='Select Set' id="_set">
                {sets.map((set, index) => (
                  <option value={set._id} key={index}>{set._id}</option>
                ))}
              </Select>
            </Box>
          </Box>
          {(createCategoriesArray(recordFields)).map((category, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton type="button">
                  <AccordionIcon />
                  {capitaliseFirstLetter(category)}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {
                  findAllFieldsFromCategory(recordFields, category).map((item, index) => (
                    <CustomInput item={item} key={index} />
                  ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Button type="submit" m={5}>Submit</Button>
      </form>
    </Stack>
  )
}

export default AddRecord