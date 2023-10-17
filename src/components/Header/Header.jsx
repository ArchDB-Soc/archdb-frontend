import { Heading, Tabs, TabList, Tab, Button, Spacer, Flex } from "@chakra-ui/react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext, useState } from "react";

const Header = () => {
  const { setIsLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()

  const logout = () => {
    setIsLoggedIn(false)
    console.log("User logged out")
    navigate("/login")
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
            <Tab><NavLink to="/">Sites</NavLink></Tab>
            <Tab><NavLink to="/contexts">Contexts</NavLink></Tab>
          </TabList>
        </Tabs>
      </nav>
    </header>
  )
}

export default Header