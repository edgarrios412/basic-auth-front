import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Validate = () => {
    const [msg, setMsg] = useState()
    const token = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.post("http://localhost:3000/validate", token)
        .then(res => setMsg("Cuenta verificada exitosamente"), res => setMsg("La cuenta no pudo ser verificada"))
    })
  return(
    <>
      {msg ? <>
      <h1>{msg}</h1>
      <button onClick={() => navigate("/")}>Ir al login</button>
      </>:<h1>Verificando...</h1>}
    </>
  )
};

export default Validate