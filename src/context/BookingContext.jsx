import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'
import axios from 'axios'

export const bookingDataContext = createContext()

function BookingContext({ children }) {
    let [checkIn, setCheckIn] = useState("")
    let [checkout, setCheckout] = useState("")
    let [total, setTotal] = useState(0)
    let [night, setNight] = useState(0)
    let [bookingData, setBookingData] = useState([])
    let [bookingPopUp, setBookingPopUp] = useState(false)  // ✅ ADD THIS STATE

    let { serverUrl } = useContext(authDataContext)
    let { getcurrentUser } = useContext(userDataContext)
    let { getListing } = useContext(listingDataContext)


    const handleBooking = async (id) => {
    if (!checkIn || !checkout) {
        alert("Please select check-in and checkout dates first!");
        return;
    }

    try {
        let result = await axios.post(
            `${serverUrl}/api/booking/create/${id}`,
            { checkIn, checkout, totalRent: total },
            { withCredentials: true }
        );
        
        // ✅ SUCCESS FEEDBACK
        alert("🎉 Booking confirmed successfully!");
        
        // ✅ RESET ALL STATES
        setCheckIn("");
        setCheckout("");
        setTotal(0);
        setNight(0);
        setBookingData(result.data);
        setBookingPopUp(false);  // CLOSE POPUP
      
      
        await getcurrentUser();
        await getListing();
      window.location.pathname = "/mybooking"; 
        
    } catch (error) {
        console.error("Booking failed:", error.response?.data);
        alert(error.response?.data?.message || "Booking failed!");
    }
};

    let value = {
        checkIn, setCheckIn,
        checkout, setCheckout,
        total, setTotal,
        night, setNight,
        bookingData, setBookingData,
        bookingPopUp, setBookingPopUp,  // ✅ EXPORT THIS
        handleBooking
    }

    return (
        <bookingDataContext.Provider value={value}>
            {children}
        </bookingDataContext.Provider>
    )
}

export default BookingContext
