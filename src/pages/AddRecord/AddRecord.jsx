import { addRecordToDb, getDataFromDb } from "../../api/entities";
import { recordFields } from "../../const/dataFields";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Stack, Text, filter } from '@chakra-ui/react'
import buildObjectFromForm, { capitaliseFirstLetter } from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";

const AddRecord = () => {

  const navigate = useNavigate()
  const [sites, setSites] = useState([{}])
  const [sets, setSets] = useState([{}])
  const [selectedSite, setSelectedSite] = useState("")

  const handleSiteSelectChange = (event) => {
    setSelectedSite(event.target.value);
    // const filteredSets = sets.map(set => set._site)
    // console.log("filtered sets", sets.filter(set => set._site === selectedSite.current))
    event.preventDefault();
  };

  const submitForm = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    const chosenSite = sites.find(obj => obj._id === data._site)
    data.siteName = chosenSite.name // user-friendly name instead of site id
    addRecordToDb(data, data._site)
    navigate("/records")
    location.reload()
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
    getDataFromDb(setSites, "sites")
    getDataFromDb(setSets, "sets")
  }, [])

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
              <Select placeholder='Select Site' id="_site" onChange={handleSiteSelectChange} required>
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
                {
                  (selectedSite === "") ?
                    sets.map((set, index) => (
                      <option value={set._id} key={index}>{set._id} ({set.siteName}) - {set.title}</option>
                    ))
                    :
                    sets.filter(set => set._site === selectedSite)
                      .map((set, index) => (
                        <option value={set._id} key={index}>{set._id} - {set.title}</option>
                      ))
                }
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
                    <div key={index}>
                      <CustomInput item={item} />
                    </div>
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