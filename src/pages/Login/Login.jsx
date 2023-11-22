import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../../App';
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import { useLogin } from "../../auth/auth";


const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()
  const { login, errorMessage } = useLogin()

  const submitLoginForm = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value
    await login(email, password)
    navigate("/")
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
        <Heading as="h1" size="2xl">ArchDB</Heading>
        <Heading as="h2" size="l">The Consolidated Archaeological Database</Heading>
        <form onSubmit={submitLoginForm}>
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
          <Box padding={3}>
            <p>{errorMessage ? `${errorMessage}` : ""}</p>
          </Box>
        </form>
      </Box>

    </Box>
  )
}

export default Login