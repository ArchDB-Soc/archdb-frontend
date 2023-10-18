import { HStack, Text, Input } from "@chakra-ui/react"
import React from "react"

const CustomInput = ({ item, key }) => {
  return (

    <HStack key={key}>
      <Text minW="100px" maxW="150px" w="25%">{item.name}:</Text>
      <Input
        type={item.type}
        id={item.id}
        required={item.required === "true"}
      />
    </HStack>
  )
}

export default CustomInput