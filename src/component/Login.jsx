import React, { useState } from 'react'
import {auth} from "../firebase"
import { useHistory } from 'react-router-dom'
export default function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const history=useHistory()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
          const result=await auth.signInWithEmailAndPassword(email,password)
          window.M.toast({html: `welcome ${result.user.email}`,classes:"green"})
          history.push("/")
        }
        catch(err){
            window.M.toast({html: err.message,classes:"green"})
            alert("please signup first then try to login")
        }
    }
    return (
        <div className="center container" style={{maxWidth:"500px"}}>
        <h3>Please login!!</h3>
        <form onSubmit={handleSubmit}>
        <div className="input-field col s6">
          <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button className="btn blue" type="submit">login</button>
        </form>
        </div>
    )
}
