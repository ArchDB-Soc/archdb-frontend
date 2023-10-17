import { addContextToSite, getAllDataFromDb } from "../../api/calls";
import { contextFields } from "../../const/dataFields";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Stack, Text } from '@chakra-ui/react'
import buildObjectFromForm, { capitaliseFirstLetter } from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import ChakraAccordionItem from "../../components/Accordion/Accordion";

const AddContext = () => {

  const navigate = useNavigate()
  const [sites, setSites] = useState([{}])
  // const [openSites, setOpenSites] = useState(false)

  const submitForm = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    console.log(data._site)
    addContextToSite(data, data._site)
    document.getElementById("context-form").reset()
    navigate("/contexts")
  }

  const createCategoriesArray = (contextArr) => {
    const typesArr = [...new Set(contextArr.map((context) => context.category))]
    const typesArrWithoutSite = typesArr.filter(item => item !== 'site')
    return typesArrWithoutSite
  }

  const findAllFieldsFromCategory = (fieldsArr, category) => {
    return fieldsArr.filter(item => item.category === category)
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
          <BreadcrumbLink as={NavLink} to='/contexts'>
            Contexts
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={NavLink} to='/add-context'>
            Add Context
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <form onSubmit={submitForm} id="context-form">
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
          {(createCategoriesArray(contextFields)).map((category, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton type="button">
                  <AccordionIcon />
                  {capitaliseFirstLetter(category)}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {
                  findAllFieldsFromCategory(contextFields, category).map(item => (
                    <HStack key={item.id}>
                      <Text minW="100px" maxW="150px" w="25%">{item.name}:</Text>
                      <Input
                        type={item.type}
                        id={item.id}
                        required={item.required === "true"}
                      />
                    </HStack>
                  ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
          {/* <AccordionItem>

            <h2>
              <AccordionButton onClick={() => setOpenSites(!openSites)} type="button">
                <AccordionIcon />
                Site
              </AccordionButton>
            </h2>

            <AccordionPanel>

              <Select placeholder='Select Site' id="site" >
                {sites.map((site, index) => (
                  <option value={site._id} key={index}>{site.name}</option>
                ))}
              </Select>

            </AccordionPanel>

          </AccordionItem> */}
        </Accordion>
        <Button type="submit" m={5}>Submit</Button>
      </form>
    </Stack>
  )
}

export default AddContext