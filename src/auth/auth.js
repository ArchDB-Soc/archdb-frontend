import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { UserContext } from '../App';
import { authenticationRequest } from "../api/userAPI";

export const useLogin = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("")

  const login = async (email, password) => {
    const res = await authenticationRequest(email, password, setErrorMessage)
    const userStored = {
      email: res.data.user.email,
      token: res.data.token,
    };
    localStorage.setItem('userStored', JSON.stringify(userStored));
    setIsLoggedIn(true);
    console.log("User logged in")
  }

  return {login, errorMessage}

}

const useLogout = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userStored');
    console.log("User logged out");
    setIsLoggedIn(false);
    navigate('/login');
  };

  return logout;
};

export default useLogout;