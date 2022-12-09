import React from 'react'
import "./login.css";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { useState } from 'react';
const Login = () => {
    
    /**
     * @hookDeclarations
     */
    
    const dispatch = useDispatch();
    
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    /**
     * @customFunctions
     */

    const handleLogin = (e)=> {
        e.preventDefault();
        login(dispatch, {username, password}); //INFO: How to use apiCalls!
    }
    
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", flexDirection:"column"}}>
        <input style={{padding:"10px", marginBottom:"20px"}} type="text" placeholder='username' onChange={(e)=> setUsername(e.target.value)} />
        <input style={{padding:"10px", marginBottom:"20px"}} type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={(e)=> handleLogin(e)} style={{padding:"10px", width:"100px"}}>Login</button>
    </div>
  )
}

export default Login