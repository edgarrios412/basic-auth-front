import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css"

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [form, setForm] = useState({
        user:"",
        pass:""
    })

    const auth = async (e) => {
      e.preventDefault()
        const {data} = await axios.post("https://prueba-backend.azurewebsites.net/login", form)
        if(!data.error){
            localStorage.setItem("token", data)
            navigate("/home")
        }else{
            setError(data.error)
        }
    }
// https://prueba-backend.azurewebsites.net
    const verifyToken = async () => {
        const {data} = await axios.post("https://prueba-backend.azurewebsites.net/auth",{id:1},{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})
        return data.auth
      }
    
      useEffect(() => {
        localStorage.getItem("token") ? (verifyToken() ? navigate("/home") : "") : ""
      }, [])

      const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
      }

  return(
    <>
    <h1>Iniciar sesion</h1>
    <br></br>
        <form className={style.form}>
            <input className={style.input} placeholder="Usuario" name= "user" onChange={handleInput} value={form.user}/>
            <input className={style.input} placeholder="Contraseña" name = "pass" onChange={handleInput} value={form.pass}/>
      <button className={style.button} onClick={auth}>Ingresar</button>
      <button onClick={() => navigate("/register")}>Registrarme</button>
      {error && <h4 className={style.error}>{error}</h4>}
      </form>
    </>
  )
};

export default Login