import { addContextToDb } from "../../api/calls";
import { contextFields } from "../../const/contextFields";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'
import buildObjectFromForm, { capitaliseFirstLetter } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
// import ChakraAccordionItem from "../../components/Accordion/Accordion";

const AddContext = () => {

  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault();
    const fields = Array.from(e.target.elements).map(element => element.id)
    const responses = Array.from(e.target.elements).map(element => element.value)
    const data = buildObjectFromForm(fields, responses)
    addContextToDb(data)
    document.getElementById("context-form").reset()
    navigate("/")
  }

  const createCategoriesArray = (contextArr) => {
    const typesArr = [...new Set(contextArr.map((context) => context.category))]
    return typesArr
  }

  const findAllFieldsFromCategory = (fieldsArr, category) => {
    return fieldsArr.filter(item => item.category === category)
  }

  return (
    <Stack m={5} className='form-container'>
      <form onSubmit={submitForm} id="context-form">
        <Accordion allowToggle>
          {(createCategoriesArray(contextFields)).map((category, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
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
        </Accordion>
        <Button type="submit" m={5}>Submit</Button>
      </form>
    </Stack>
  )
}

export default AddContext