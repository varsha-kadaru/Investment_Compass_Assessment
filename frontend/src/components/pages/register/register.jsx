import { Link } from "react-router-dom"
import "./register.css"
import axios from "axios"
import { useState } from "react"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("User") // Initialize userType state with "User"

  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        userType, // Include userType in the request body
        password
      })
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true)
    }
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value); // Update userType state with the selected value
  }

  return (
    <div className="mainContainer">
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" 
          type="text" 
          placeholder="Enter your username..." 
          onChange={e => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input className="registerInput" 
          type="text" 
          placeholder="Enter your email..." 
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input className="registerInput" 
          type="password" 
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)} 
        />
        <div className="userTypeSelection"> {/* Container for radio button options */}
          <label>User Type:</label>
          <input 
            type="radio" 
            value="User" 
            checked={userType === "User"} 
            onChange={handleUserTypeChange} 
          />
          <span>User</span>
          <input 
            type="radio" 
            value="Admin" 
            checked={userType === "Admin"} 
            onChange={handleUserTypeChange} 
          />
          <span>Admin</span>
        </div>
        <button className="registerButton" type='submit'>Register</button>
      </form>
      
      {error && <span className="errorPage">Something went wrong</span>}
    </div>
    <div className='image'>
    <img src='https://img.freepik.com/premium-vector/event-management-wedding-planner-manager-planning-event-conference-party_501813-2157.jpg' alt='h'/>  
  </div> 
  </div>
  )
}
