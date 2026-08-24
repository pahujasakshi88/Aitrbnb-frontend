import React,{createContext} from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export const listingDataContext=createContext()
function ListingContext({children}) {
    let navigate=useNavigate()



    let [title,setTitle]=useState("")
    let [description,setDescription]=useState("")
    let [frontEndImage1,setfrontEndImage1]=useState(null)
    let [frontEndImage2,setfrontEndImage2]=useState(null)
    let [frontEndImage3,setfrontEndImage3]=useState(null)
    let [backendImage1,setbackendImage1]=useState(null)
    let [backendImage2,setbackendImage2]=useState(null)
    let [backendImage3,setbackendImage3]=useState(null)
    let [rent,setRent]=useState("")
    let [city,setCity]=useState("")
    let [landmark,setLandmark]=useState("")
    let [adding,setAdding]=useState(false)
    let [updating,setUpdating]=useState(false)
    let [deleting,setDeleting]=useState(false)
    let [category,setCategory]=useState("")
    let [listingData,setListingData]=useState([])
    let [newListData,setnewListData]=useState([])
let [cardDetails,setCardDetails]=useState(null)
let {serverUrl}=useContext(authDataContext)
const handleAddListing=async()=>{
    setAdding(true)
    try {
        let formData=new FormData()

formData.append("title",title)
formData.append("image1",backendImage1)
formData.append("image2",backendImage2)
formData.append("image3",backendImage3)
formData.append("description",description)
formData.append("city",city)
formData.append("rent",rent)
formData.append("landmark",landmark)
formData.append("category",category)


let result=await axios.post(serverUrl+"/api/listing/add",formData,{withCredentials:true})

console.log(result);
navigate("/")
setTitle("")
setDescription("")
setRent("")
setCity("")
setLandmark("")
setfrontEndImage1(null)
setfrontEndImage2(null)
setfrontEndImage3(null)
setbackendImage1(null)
setbackendImage2(null)
setbackendImage3(null)


    } catch (error) {
        console.log(error);
        setAdding(false)
        
    }
}

const handleViewCard=async(id)=>{
    try {
        let result=await axios.get(serverUrl+`/api/listing/findlistingbyid/${id}`,{withCredentials:true})
        console.log('====================================');
        console.log(result);
        setCardDetails(result.data)
        console.log('====================================');
        navigate("/viewcard")
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

const getListing=async()=>{
    try {
        let result=await axios.get(serverUrl+"/api/listing/get",{withCredentials:true})
setListingData(result.data)
setnewListData(result.data)
console.log(result.data);

    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
getListing()
},[adding,updating,deleting])



    let value={
title,setTitle,description,setDescription,frontEndImage1,setfrontEndImage1,frontEndImage2,setfrontEndImage2,frontEndImage3,setfrontEndImage3,backendImage1,setbackendImage1,backendImage2,setbackendImage2,backendImage3,setbackendImage3,
rent,setRent,city,setCity,landmark,newListData,setnewListData,setLandmark,category,setCategory,handleAddListing,adding,setAdding,listingData,setListingData,getListing,

handleViewCard,cardDetails,setCardDetails,updating,setUpdating,deleting,setDeleting

    }
  return (
    <div>
        <listingDataContext.Provider value={value}>
            {children}
        </listingDataContext.Provider>
    </div>
  )
}

export default ListingContext