import React, { useState, useEffect }  from 'react'
import {db} from "../firebase"
// import  {doc,deleteDoc} from "firebase/firestore"
export default function Fav() {
const ref=db.collection("Fav")
const[data,setdata]=useState([])
const[loading,setloading]=useState(true)
function getData(){
    ref.onSnapshot((querySnapshot)=>{
        const item=[]
        querySnapshot.forEach((doc)=>{
            item.push(doc.data())
        })
        setdata(item)
        setloading(false)
    })
}
useEffect(() => {
    getData();
  },[])
  const deleteFav= (id) =>{
       console.log(id)
  }
  console.log("fromfavsectiob",data)
    return (
        <div>
            {
                loading?
                <>
                <h4 style={{textAlign:"center"}}>WELCOME TO FAVSECTION</h4>
                <h5 style={{textAlign:"center"}}>Loading....</h5>
                </>:
                <div style={{width:"50%",height:"50vh",margin:"auto",marginTop:"100px",display:"grid",display:"grid",gridTemplateColumns:"35% 35% 35%",gridGap:"1%"}}>
                     {data.map((crypto)=>(
                    <div style={{ maxHeight:"150px",backgroundImage: "url(" + "https://i.pinimg.com/originals/92/dc/3f/92dc3f43cb6703fb505a96312b42978f.jpg" + ")",marginTop:"2%"}}>
                         <div style={{width:"50%",height:"60px",margin:"auto"}}>
                             <img style={{width:"100%",height:"100%"}} src={crypto.pic}></img>
                         </div>
                         <div style={{width:"100%",height:"30px",marginTop:"10px",background:"yellow"}}>
                             <p style={{lineHeight:"1px",float:"left"}}>Name: {crypto.title}</p>
                             <p style={{lineHeight:"1px",float:"right"}}>Current: {crypto.cost}</p>
                         </div>
                         <button onClick={()=>{
                             deleteFav(crypto.id)
                         }} style={{marginTop:"3%",marginLeft:"30%",background:"red",color:"white",cursor:"pointer"}}>DELETE</button>
                    </div>                   
                  ))}
                </div>
            }
        </div>
    )
}
