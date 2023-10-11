import { Heading, Tabs, TabList, Tab, Button, Spacer, Flex } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext } from "react";

const Header = () => {
  const { isLoggedIn } = useContext(UserContext)

  return (
    <header>
      <nav>
        <Flex m={5}>
          <Heading as="h1" size="2xl">The IADB</Heading>
          <Spacer />
          <Button><NavLink to="/login">Logout</NavLink></Button>
        </Flex>
      </nav>
      <nav>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab><NavLink to="/">Contexts</NavLink></Tab>
            <Tab>{isLoggedIn ? <NavLink to="/add-context">Add Context</NavLink> : null}</Tab>
          </TabList>
        </Tabs>
      </nav>
    </header>
  )
}

export default Header