import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function LoginPage() {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, login)
      localStorage.setItem("token", response.data.token)
      navigate('/chatpage')
      console.log(response);
      alert("Login Successfully")
    } catch (error) {
      alert("Login Faild")
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={login.email} placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" value={login.password} placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage