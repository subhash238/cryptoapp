import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Cripto from "./component/Cripto"
import Fav from "./component/Fav"
import Login from "./component/Login"
import Navbar from "./component/NavBar"
import SignUp from "./component/SignUp"
import { auth } from "./firebase"
const App=()=>{
const[user,setuser]=useState(null)
useEffect(()=>{
    auth.onAuthStateChanged(user=>{
        if(user) setuser(user)
        else setuser(null)
    })
},[])
return (
     <BrowserRouter>
        <Navbar user={user} />
        <Switch>
            <Route exact path="/">
                <Cripto user={user} />
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/signup">
                <SignUp/>
            </Route>
            <Route>
                <Fav/>
            </Route>
        </Switch>
     </BrowserRouter>
    
  )
}

export default App

