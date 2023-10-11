import { Grid, GridItem, Heading, Tabs, TabList, Tab } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { UserContext } from '../../App';
import { useContext } from "react";

const Header = () => {
  const { isLoggedIn } = useContext(UserContext)

  return (
    <header>
      <nav className="login">
        <Grid>
          <GridItem><NavLink to="/login">Login 🔐</NavLink></GridItem>
          <GridItem>{isLoggedIn ? <NavLink to="/profile">Profile 🙋🏻‍♀️</NavLink> : null}</GridItem>
        </Grid>
      </nav>
      <Heading as="h1" size="2xl">The IADB</Heading>
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