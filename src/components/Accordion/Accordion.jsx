import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react"

const ChakraAccordionItem = ({ key, title }) => {
  return (
    <AccordionItem key={key}>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' textAlign='left'>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ChakraAccordionItem