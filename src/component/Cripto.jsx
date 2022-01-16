import React, { useState, useEffect } from 'react'
import {db} from "../firebase"
import { useHistory } from 'react-router-dom'
export default function Cripto({user}) {
const ref=db.collection("criptocurrency")
// console.log(ref)
const history=useHistory()
const[data,setdata]=useState([])
const[loading,setloading]=useState(true)
const[filter,setFilter]=useState([])
const[text,setText]=useState("")
// const[fav,setfav]=useState([])
function getData(){
    if(user){
    ref.onSnapshot((querySnapshot)=>{
        const item=[]
        querySnapshot.forEach((doc)=>{
            item.push(doc.data())
        })
        setdata(item)
        setFilter(item)
        setloading(false)
    })
    }
    else{
        history.push("/login")
    }
}
useEffect(() => {
  getData();
  console.log(data)
},[])
const handleFilter=(text)=>{
   const update=data.filter((el)=>{
       return el.name.toLowerCase().includes(text.toLowerCase())
   })
   setFilter(update)
}
const addToFav=(add)=>{
   db.collection("Fav").doc().set({
       title: add.name,
       pic:add.image,
       cost: add.price,
       id: add.id
   })
}
    return (
        <div style={{width:"90%",height:"80vh",margin:"auto",marginTop:"20px"}}>
            <div style={{width:"25%",height:"50px",margin:"auto"}}>
                <input onChange={(e)=>{setText(e.target.value)}} type="text" placeholder="Search" style={{width:"200px",height:"30px"}}></input>
                <button onClick={()=>{handleFilter(text)}}  style={{background:"blue",color:"white",marginLeft:"10px",borderRadius:"5px",cursor:"pointer"}}>Search</button>
            </div>
            {
            loading?
               <h1>Loading......</h1>:
               <div style={{width:"100%",height:"70vh",marginTop:"20px",display:"grid",gridTemplateColumns:"24% 24% 24% 24%",gridGap:"1%",backgroundImage: "url(" + "https://images-cdn.welcomesoftware.com/Zz0zZTliMjQ4MzhlNGExMWViYmJiMjFiZTI2ZWNmN2MzZA==" + ")",}}>
                  {filter.map((crypto)=>(
                    <div style={{backgroundImage: "url(" + "https://i.pinimg.com/originals/92/dc/3f/92dc3f43cb6703fb505a96312b42978f.jpg" + ")",marginTop:"2%"}}>
                         <div style={{width:"50%",height:"60px",margin:"auto"}}>
                             <img style={{width:"100%",height:"100%"}} src={crypto.image}></img>
                         </div>
                         <div style={{width:"100%",height:"30px",marginTop:"10px",background:"yellow"}}>
                             <p style={{lineHeight:"1px",float:"left"}}>Name: {crypto.name}</p>
                             <p style={{lineHeight:"1px",float:"right"}}>Current: {crypto.price}</p>
                         </div>
                         <button onClick={()=>{addToFav(crypto)}} style={{marginTop:"3%",marginLeft:"30%",background:"red",color:"white",cursor:"pointer"}}>ADD TO FAV</button>
                    </div>                   
                  ))}
               </div>
            }
        </div>
    )
}
