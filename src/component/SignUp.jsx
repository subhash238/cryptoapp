import React, { useState } from 'react'
import {auth} from "../firebase"
import { useHistory } from 'react-router-dom'
export default function SignUp() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const history=useHistory()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(email,password)
        try{
          const result=await auth.createUserWithEmailAndPassword(email,password)
          window.M.toast({html: `welcome ${result.user.email}`,classes:"green"})
          history.push("/")
        }
        catch(err){
            window.M.toast({html: err.message,classes:"green"})
        }
    }
    return (
        <div className="center container" style={{maxWidth:"500px"}}>
        <h3>Please SignUp!!</h3>
        <form onSubmit={handleSubmit}>
        <div className="input-field col s6">
          <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button className="btn blue" type="submit">SignUp</button>
        </form>
        </div>
    )
}
