import { addSiteToDb } from "../../api/calls";
import { siteFields } from "../../const/contextFields";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'
import buildObjectFromForm, { capitaliseFirstLetter } from "../../utils/utils";
import { NavLink, useNavigate } from "react-router-dom";
// import ChakraAccordionItem from "../../components/Accordion/Accordion";

const AddSite = () => {

  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    addSiteToDb(data)
    document.getElementById("site-form").reset()
    navigate("/")
  }

  const createCategoriesArray = (siteArr) => {
    const typesArr = [...new Set(siteArr.map((site) => site.category))]
    return typesArr
  }

  const findAllFieldsFromCategory = (fieldsArr, category) => {
    return fieldsArr.filter(item => item.category === category)
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
        <Accordion allowToggle>
          {(createCategoriesArray(siteFields)).map((category, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <AccordionIcon />
                  {capitaliseFirstLetter(category)}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {
                  findAllFieldsFromCategory(siteFields, category).map(item => (
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
        </Accordion>
        <Button type="submit" m={5}>Submit</Button>
      </form>
    </Stack>
  )
}

export default AddSite