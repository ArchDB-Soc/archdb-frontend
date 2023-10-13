import { Heading, Tabs, TabList, Tab, Button, Spacer, Flex } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext, useState } from "react";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

  const logout = () => {
    setIsLoggedIn(false)
    console.log("User logged out")
  }

  useState(() => {
  }, [])

  return (
    <header>
      <nav>
        <Flex m={5}>
          <Heading as="h1" size="2xl">The IADB</Heading>
          <Spacer />
          <Button onClick={logout}>Log Out </Button>
        </Flex>
      </nav>
      <nav>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab><NavLink to="/">Contexts</NavLink></Tab>
          </TabList>
        </Tabs>
      </nav>
    </header>
  )
}

export default Header