import { Heading, Tabs, TabList, Tab, Button, Spacer, Flex, Link, TabPanels, TabPanel, Text, Icon } from "@chakra-ui/react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext, useState, useEffect } from "react";

const Header = () => {
  const { loggedIn, setIsLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(0)


  useEffect(() => {
    const currentUrl = window.location.href
    if (currentUrl === "http://localhost:5173/records" || currentUrl === "http://localhost:5173/add-record") { setTabIndex(2) }
    else if (currentUrl === "http://localhost:5173/sets" || currentUrl === "http://localhost:5173/add-set") { setTabIndex(1) }
    else if (currentUrl === "http://localhost:5173/sites" || currentUrl === "http://localhost:5173/add-site") { setTabIndex(0) }
  }, [])

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

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
        <Tabs isFitted variant='enclosed' isLazy index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab><NavLink to="/">Sites</NavLink></Tab>
            <Tab><NavLink to="/sets">Sets</NavLink></Tab>
            <Tab><NavLink to="/records">Records</NavLink></Tab>
          </TabList>

        </Tabs>
      </nav>
    </header>
  )
}

export default Header