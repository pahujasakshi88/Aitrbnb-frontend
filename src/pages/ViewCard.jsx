import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FaArrowLeft, FaStar } from 'react-icons/fa'
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { bookingDataContext } from '../context/BookingContext'
import videobg from "../assets/videobg.mp4";

function ViewCard() {
    let navigate = useNavigate()
    let { cardDetails } = useContext(listingDataContext)
    let { userData } = useContext(userDataContext)
    let { serverUrl } = useContext(authDataContext)
    let { updating, setUpdating, deleting, setDeleting } = useContext(listingDataContext)
    let { checkIn, setCheckIn, checkout, setCheckout, total, setTotal, night, setNight, handleBooking } = useContext(bookingDataContext)

    let [updatePopUp, setupdatePopUp] = useState(false)
    let [bookingPopUp, setBookingPopUp] = useState(false)

    // Update form states - NO CHANGES
    let [title, setTitle] = useState(cardDetails.title || '')
    let [description, setDescription] = useState(cardDetails.description || '')
    let [backendImage1, setbackendImage1] = useState(null)
    let [backendImage2, setbackendImage2] = useState(null)
    let [backendImage3, setbackendImage3] = useState(null)
    let [rent, setRent] = useState(cardDetails.rent || '')
    let [city, setCity] = useState(cardDetails.city || '')
    let [landmark, setLandmark] = useState(cardDetails.landmark || '')
    let [minDate, setMinDate] = useState("")

    useEffect(() => {
        let today = new Date().toISOString().split('T')[0]
        setMinDate(today)
    }, [])

    useEffect(() => {
        if (checkIn && checkout) {
            let inDate = new Date(checkIn)
            let outDate = new Date(checkout)
            let n = (outDate - inDate) / (24 * 60 * 60 * 1000)
            setNight(n)
            let airbnbCharge = (cardDetails.rent * (7 / 100))
            let tax = (cardDetails.rent * (7 / 100))
            if (n > 0) {
                setTotal((cardDetails.rent * n) + airbnbCharge + tax)
            } else {
                setTotal(0)
            }
        }
    }, [checkIn, checkout, cardDetails.rent])

    const handleImage1 = (e) => setbackendImage1(e.target.files[0])
    const handleImage2 = (e) => setbackendImage2(e.target.files[0])
    const handleImage3 = (e) => setbackendImage3(e.target.files[0])

    const handleUpdateListing = async () => {
        setUpdating(true)
        try {
            let formData = new FormData()
            formData.append("title", title)
            if (backendImage1) formData.append("image1", backendImage1)
            if (backendImage2) formData.append("image2", backendImage2)
            if (backendImage3) formData.append("image3", backendImage3)
            formData.append("description", description)
            formData.append("city", city)
            formData.append("rent", rent)
            formData.append("landmark", landmark)

            await axios.put(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true })
            setUpdating(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setUpdating(false)
        }
    }

    const handleDeleteListing = async () => {
        setDeleting(true)
        try {
            await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
            setDeleting(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setDeleting(false)
        }
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* 🎥 VIDEO BG */}
            <video
                className="fixed inset-0 w-full h-full object-cover z-0"
                src={videobg}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-black/80 to-emerald-900/70 z-10"></div>

            {/* 🔙 BACK */}
            <div 
                className="fixed top-6 left-6 z-50 w-12 h-12 backdrop-blur-xl bg-red-600/95 border border-white/30 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => navigate("/")}
            >
                <FaArrowLeft className="w-5 h-5 text-white" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-20 min-h-screen pt-24 pb-16 px-4 lg:px-8 max-w-6xl mx-auto">
                
                {/* HEADER - SMALLER */}
                <div className="text-center mb-6">
                    <h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent drop-shadow-xl">
                        {`In ${cardDetails.landmark?.toUpperCase()}, ${cardDetails.city?.toUpperCase()}`}
                    </h1>
                </div>

                {/* IMAGE GALLERY - SMALLER & RESPONSIVE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* MAIN IMAGE - FIXED HEIGHT */}
                    <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl h-64 lg:h-80 group cursor-pointer hover:scale-[1.02] transition-all duration-500">
                        <img 
                            src={cardDetails.image1} 
                            alt="Main" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => e.target.src = "https://via.placeholder.com/500x400?text=Image"}
                        />
                    </div>

                    {/* THUMBNAILS - SMALLER */}
                    <div className="space-y-4">
                        {[cardDetails.image2, cardDetails.image3].map((img, i) => (
                            <div key={i} className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl h-32 lg:h-40 group cursor-pointer hover:scale-[1.02] transition-all duration-500">
                                <img 
                                    src={img} 
                                    alt={`Img ${i+1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image"}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* DETAILS - COMPACT */}
                <div className="backdrop-blur-xl bg-white/15 border border-white/25 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8 space-y-4">
                    <h2 className="text-lg lg:text-2xl font-bold text-white drop-shadow-lg">
                        {cardDetails.title?.toUpperCase()}
                    </h2>
                    <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                        {cardDetails.category?.toUpperCase()}, {cardDetails.landmark?.toUpperCase()}
                    </p>
                    <p className="text-sm lg:text-base text-white/85">{cardDetails.description}</p>
                    <div className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-xl">
                        ₹{cardDetails.rent?.toLocaleString()}/night
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400">
                        <FaStar className="w-5 h-5 fill-current" />
                        <span className="text-lg font-semibold">{cardDetails.ratings}</span>
                    </div>
                </div>

                {/* ACTION BUTTON - PERFECT SIZE */}
                <div className="max-w-md mx-auto">
                    {cardDetails.host === userData?.user?._id ? (
                        <button 
                            className="w-full py-3 px-8 backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/30 text-lg"
                            onClick={() => setupdatePopUp(true)}
                        >
                            ✏️ Edit Listing
                        </button>
                    ) : (
                        <button 
                            className="w-full py-3 px-8 backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/30 text-lg"
                            onClick={() => setBookingPopUp(true)}
                        >
                            🏠 Book Now
                        </button>
                    )}
                </div>
            </div>

            {/* 🛠️ UPDATE POPUP - CLEAN & COMPACT */}
            {updatePopUp && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
                    <div className="bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                            <h2 className="text-xl lg:text-2xl font-bold text-white">Update Listing</h2>
                            <RxCross2 
                                className="w-7 h-7 text-white/70 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110"
                                onClick={() => setupdatePopUp(false)}
                            />
                        </div>
                        
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateListing(); }} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/90 font-semibold mb-2 text-sm">Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-emerald-400 focus:outline-none text-white placeholder-white/60 text-sm lg:text-base transition-all duration-300" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/90 font-semibold mb-2 text-sm">Rent/Night</label>
                                    <input 
                                        type="number" 
                                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-emerald-400 focus:outline-none text-white placeholder-white/60 text-sm lg:text-base transition-all duration-300" 
                                        value={rent} 
                                        onChange={(e) => setRent(e.target.value)} 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white/90 font-semibold mb-2 text-sm">Description</label>
                                <textarea 
                                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-emerald-400 focus:outline-none text-white placeholder-white/60 h-24 text-sm lg:text-base transition-all duration-300 resize-vertical" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[['Image 1', handleImage1, backendImage1], ['Image 2', handleImage2, backendImage2], ['Image 3', handleImage3, backendImage3]].map(([label, handler, file], i) => (
                                    <div key={i}>
                                        <label className="block text-white/90 font-semibold mb-2 text-sm">{label}</label>
                                        <input 
                                            type="file" 
                                            className="w-full p-2 rounded-xl bg-white/10 border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-emerald-500 file:to-emerald-600 file:text-white hover:file:from-emerald-600 hover:file:to-emerald-700 transition-all duration-300 text-sm" 
                                            onChange={handler} 
                                            accept="image/*" 
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/90 font-semibold mb-2 text-sm">City</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-emerald-400 focus:outline-none text-white placeholder-white/60 text-sm lg:text-base transition-all duration-300" 
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/90 font-semibold mb-2 text-sm">Landmark</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:border-emerald-400 focus:outline-none text-white placeholder-white/60 text-sm lg:text-base transition-all duration-300" 
                                        value={landmark} 
                                        onChange={(e) => setLandmark(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <button 
                                    type="submit"
                                    className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base" 
                                    disabled={updating}
                                >
                                    {updating ? 'Updating...' : '✅ Update Listing'}
                                </button>
                                <button 
                                    type="button"
                                    className="flex-1 py-3 px-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base" 
                                    onClick={handleDeleteListing} 
                                    disabled={deleting}
                                >
                                    {deleting ? 'Deleting...' : '🗑️ Delete'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 🏠 BOOKING POPUP - PERFECT SIZE */}
            {bookingPopUp && (
                <>
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999]" onClick={() => setBookingPopUp(false)} />
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-3xl lg:max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-gray-200">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Confirm & Book</h2>
                                    <h3 className="text-lg text-gray-700 mt-1">Your Trip</h3>
                                </div>
                                <RxCross2 
                                    className="w-8 h-8 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200 hover:scale-110" 
                                    onClick={() => setBookingPopUp(false)} 
                                />
                            </div>

                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 p-6 lg:p-8 gap-6 overflow-hidden">
                                {/* LEFT: DATES */}
                                <div className="space-y-4 lg:max-h-[400px] overflow-y-auto pr-2">
                                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
                                        <div className="flex items-center gap-4 mb-4">
                                            <label className="text-lg font-semibold text-gray-700 w-20 flex-shrink-0">Check-in</label>
                                            <input 
                                                type="date" 
                                                min={minDate}
                                                className="flex-1 p-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-400 focus:outline-none text-lg bg-white shadow-sm" 
                                                value={checkIn} 
                                                onChange={(e) => setCheckIn(e.target.value)} 
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="text-lg font-semibold text-gray-700 w-20 flex-shrink-0">Check-out</label>
                                            <input 
                                                type="date" 
                                                min={minDate}
                                                className="flex-1 p-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-400 focus:outline-none text-lg bg-white shadow-sm" 
                                                value={checkout} 
                                                onChange={(e) => setCheckout(e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    {checkIn && checkout && night > 0 && (
                                        <div className="p-4 bg-white border-2 border-emerald-200 rounded-2xl shadow-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-lg">{night} nights</span>
                                                <span className="text-xl font-bold text-emerald-600">₹{Math.round(total).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* House rules - scrollable content */}
                                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <h4 className="font-bold text-lg text-gray-800">House Rules</h4>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            <li>• No smoking</li>
                                            <li>• No pets</li>
                                            <li>• Check-in after 3 PM</li>
                                            <li>• Check-out before 11 AM</li>
                                            <li>• Quiet hours 10 PM - 7 AM</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* RIGHT: SUMMARY */}
                                <div className="space-y-6 lg:pl-4">
                                    {/* LISTING PREVIEW */}
                                    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-0">
                                        <div className="flex items-start gap-4">
                                            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                                <img src={cardDetails.image1} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg lg:text-xl text-gray-800 truncate">{cardDetails.title}</h3>
                                                <p className="text-sm lg:text-base text-gray-600 mt-1 truncate">{cardDetails.landmark}, {cardDetails.city}</p>
                                                <div className="flex items-center gap-1 text-yellow-400 mt-2">
                                                    <FaStar className="w-4 h-4 fill-current" />
                                                    <span className="font-semibold text-sm">{cardDetails.ratings}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOOK BUTTON - STICKY */}
                                    <div className="sticky bottom-0 bg-white p-1 rounded-2xl border border-emerald-200 shadow-lg">
                                        <button 
                                            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => {
                                                if (!checkIn || !checkout) {
                                                    alert("Please select check-in and checkout dates first!");
                                                    return;
                                                }
                                                handleBooking(cardDetails._id, navigate);
                                            }}
                                            disabled={!checkIn || !checkout}
                                        >
                                            {checkIn && checkout 
                                                ? `Book Now - ₹${Math.round(total || 0).toLocaleString()}` 
                                                : "Select Dates First"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ViewCard
