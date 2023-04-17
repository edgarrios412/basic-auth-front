import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const verifyToken = async () => {
    const {data} = await axios.post("https://prueba-backend.azurewebsites.net/auth",{id:1},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
    console.log(data.auth)
    return data.auth
  }

  useEffect(() => {
    localStorage.getItem("token") ? (verifyToken() ? "" : navigate("/")) : navigate("/")
  }, [])

  return(
    <>
      <h1>HOME</h1>
      <button onClick={logout}>Logout</button>
      <p>Tiempo de expiracion de token: 2min</p>
    </>
  )
};

export default Home