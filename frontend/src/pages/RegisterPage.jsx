import React, { useState } from 'react'
import axios from 'axios'
function RegisterPage() {
  const [register, setregister] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(register);


  function handleChange(e) {
    setregister({ ...register, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register`, register)
      console.log(response);

      alert("Registration Successfully")
    } catch (error) {
      alert("Registration unsuccessfull")
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={register.username} placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" value={register.email} placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" value={register.password} placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage