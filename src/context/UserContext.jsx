import React, {  createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
export const userDataContext=createContext()
function UserContext({children}) {

let {serverUrl}=useContext(authDataContext)
let [userData,setUserData]=useState(null)
const getcurrentUser=async()=>{
    try {

        let result=await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
        setUserData(result.data)
        
    } catch (error) {
        setUserData(null)
        console.log(error);
        
        
    }
}
useEffect(()=>{
    getcurrentUser()
},[])

let value={
userData, 
setUserData,
getcurrentUser
}

  return (
    <div>
<userDataContext.Provider value={value}>
    {children}
</userDataContext.Provider>

    </div>
  )
}

export default UserContext