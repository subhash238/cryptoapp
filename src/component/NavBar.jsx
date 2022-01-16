import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
export default function NavBar({user}) {
  const history=useHistory()
    return (
        <nav>
        <div className="nav-wrapper blue">
          <Link to="/" className="brand-logo center">CryptoApp</Link>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            {
              user? 
              <li>
                  <button className="btn red" onClick={()=>{
                    auth.signOut()
                    history.push("/login")
                  }}>logout</button>
                  <button className="btn red" style={{marginLeft:"20px"}}>
                    <Link to="/fav">FAVTAB</Link>
                  </button>
              </li>:
              <>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/signup">signup</Link></li>
              </>
            }
          </ul>
        </div>
      </nav>
    )
}
