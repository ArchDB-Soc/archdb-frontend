import { useState, useContext } from "react"
import { authenticationRequest } from "../../api/calls";
import { UserContext } from '../../App';
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";


const Login = () => {

  const [error, setError] = useState("")
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

  const authenticate = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value
    authenticationRequest(email, password, setError, setIsLoggedIn)
  }

  const outerBoxStyles = {
    p: '40',
    background:
      'url(https://images.pexels.com/photos/8070354/pexels-photo-8070354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2) center/cover no-repeat',
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  }

  const innerBoxStyles = {
    boxSize: '400px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',

  }

  return (
    <Box sx={outerBoxStyles}>
      <Box sx={innerBoxStyles} backdropFilter='auto' backdropBlur='8px'>
        <Heading as="h1" size="2xl">IADB</Heading>
        <Heading as="h2" size="l">Integrated Archaeological Database</Heading>
        <form onSubmit={authenticate}>
          <Stack>
            <Input
              id="email"
              type="text"
              placeholder="email"
              color='white'
              _placeholder={{ color: 'white' }}
              width="auto"
              required />
            <Input
              id="password"
              type='text'
              width="auto"
              color='white'
              placeholder='password'
              _placeholder={{ color: 'white' }}
              required />
          </Stack>
          <Button type="submit"
            disabled={isLoggedIn}>
            Log in
          </Button>
        </form>
      </Box>
      <Stack>
        <p>{isLoggedIn ? "Successfully logged in. Redirecting to Profile." : ""}</p>
        <p>{error ? `${error}` : ""}</p>
      </Stack>

    </Box>
  )
}

export default Login