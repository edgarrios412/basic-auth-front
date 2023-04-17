import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css"

const Register = () => {

  const [email, setEmail] = useState() 
  const [errorEmail, setErrorEmail] = useState() 
  const [ form , setForm] = useState({
    user:"",
    pass:""
})

  const navigate = useNavigate()
  const [ msg, setMsg] = useState()

  const create = (e) => {
    e.preventDefault()
    axios.post("https://prueba-backend.azurewebsites.net/register", form)
    .then(res => {setMsg("Email de verificacion enviado"); setEmail(`/validate/${res.data}`); setErrorEmail(`/validate/y2372y7ehh27e36rghwd7e36gr3dh7sha8hsh72eg2sha8`)}, err => setMsg(err.response.data.error))
  }

  const handleInput = (e) => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  return(
    <>
    <form className={style.form}>
      <h1>Registro</h1>
      <input className={style.input} onChange={handleInput} value={form.user} name="user" placeholder="User"/>
      <input className={style.input} onChange={handleInput} value={form.pass} name="pass" placeholder="Password"/>
      <button className={style.button} onClick={create}>Create</button>
      {msg && <h4>{msg}</h4>}
      {email && <button onClick={() => navigate(email)}>URL VALIDA</button>}
      {errorEmail && <button onClick={() => navigate(errorEmail)}>URL INVALIDA</button>}
      </form>
    </>
  )
};

export default Register