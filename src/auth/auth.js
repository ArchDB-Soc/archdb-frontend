import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from '../App';

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