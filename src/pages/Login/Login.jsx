import { useState, useContext } from "react"
import { authenticationRequest } from "../../api/calls";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';

const Login = () => {

  const [error, setError] = useState("")
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

  const authenticate = async (e) => {
    console.log(isLoggedIn)
    e.preventDefault();
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value
    authenticationRequest(email, password, navigate, setError, setIsLoggedIn)
    console.log(isLoggedIn)
  }

  return (
    <div>
      <form onSubmit={authenticate}>
        <div>
          <input id="email" type="text" placeholder="email" required />
          <input id="password" type="text" placeholder="password" required />
        </div>
        <button type="submit"
          disabled={isLoggedIn}
        >Log in</button>
      </form>
      <p>{isLoggedIn ? "Successfully logged in. Redirecting to Profile." : ""}</p>
      <p>{error ? `${error}` : ""}</p>
    </div>
  )
}

export default Login