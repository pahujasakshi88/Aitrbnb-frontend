import React, { useContext } from 'react'
import { FaArrowLeft, FaCalendar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import videobg from "../assets/videobg.mp4"; // ✅ Import video

function Mybooking() {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const myBookings = userData?.user?.booking || []

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* 🎥 FULL SCREEN VIDEO BACKGROUND */}
            <video
                className="fixed inset-0 w-full h-full object-cover z-0"
                src={videobg}
                autoPlay
                loop
                muted
                playsInline
            />
            
            {/* 🖤 DARK GRADIENT OVERLAY */}
            <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 z-10"></div>

            {/* ✨ MAIN CONTENT */}
            <div className="relative z-20 min-h-screen pt-24 pb-16 px-4 lg:px-12 xl:px-24">
                
                {/* 🔙 BACK BUTTON */}
                <div className="w-14 h-14 backdrop-blur-xl bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 absolute top-8 left-6 lg:left-12 z-30 group"
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeft className="w-6 h-6 text-white/95 group-hover:text-white transition-colors" />
                </div>

                {/* 🏨 HEADER */}
                <div className="max-w-4xl mx-auto text-center mb-20 pt-12">
                    <div className="   rounded-3xl p-8  transition-all duration-500 mx-auto max-w-2xl">
                        <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-4xl mb-6 leading-tight">
                            My Bookings
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/90 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-2xl border border-white/20 inline-block font-light drop-shadow-xl">
                            Your reservations ({myBookings.length})
                        </p>
                    </div>
                </div>

                {/* 📋 BOOKINGS GRID */}
                <div className="max-w-6xl mx-auto">
                    {myBookings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {myBookings.map((booking) => (
                                <div key={booking._id} 
                                    className="group backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-400 hover:scale-[1.02] overflow-hidden cursor-pointer hover:-translate-y-1"
                                    onClick={() => navigate(`/listing/${booking.listingId?._id}`)}
                                >
                                    {/* 🖼️ IMAGE */}
                                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                                        <img 
                                            src={booking.listingId?.image1} 
                                            alt={booking.listingId?.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4 backdrop-blur-md bg-emerald-500/95 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl border border-white/30 group-hover:scale-105 transition-all duration-300">
                                            Confirmed
                                        </div>
                                    </div>

                                    {/* 📝 CONTENT */}
                                    <div className="p-6 space-y-4">
                                        {/* 🏠 PROPERTY INFO */}
                                        <div>
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-200/70 bg-clip-text text-transparent drop-shadow-xl truncate">
                                                {booking.listingId?.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-white/85 text-sm backdrop-blur-sm bg-white/10 px-3 py-1 rounded-xl mt-1 border border-white/20">
                                                <span>📍</span>
                                                <span className="truncate">{booking.listingId?.landmark}, {booking.listingId?.city}</span>
                                            </div>
                                        </div>

                                        {/* 📅 DATES */}
                                        <div className="backdrop-blur-lg bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                                            <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                                                <FaCalendar className="w-4 h-4" />
                                                <span>Stay Dates</span>
                                            </div>
                                            <div className="flex items-center justify-between text-lg font-bold text-white drop-shadow-lg">
                                                <span>{formatDate(booking.checkIn)}</span>
                                                <span className="text-emerald-400 mx-2">→</span>
                                                <span>{formatDate(booking.checkOut)}</span>
                                            </div>
                                        </div>

                                        {/* 💰 PRICE */}
                                        <div className="flex items-center justify-between pt-2 backdrop-blur-sm">
                                            <div>
                                                <span className="text-2xl font-black text-emerald-400 drop-shadow-2xl bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 px-3 py-1 rounded-xl">
                                                    ₹{booking.totalRent?.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-white/70 block font-medium">Total</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-white/80 backdrop-blur-sm bg-white/10 px-2 py-1 rounded-lg border border-white/20">
                                                    ₹{booking.listingId?.rent?.toLocaleString()}/night
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ✨ HOVER GLOW */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-blue-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-32 text-center backdrop-blur-2xl bg-white/8 border-4 border-dashed border-white/20 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                            <div className="w-28 h-28 backdrop-blur-xl bg-white/15 rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/30">
                                <span className="text-5xl">📅</span>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-black text-white/95 mb-4 drop-shadow-3xl">
                                No Bookings Yet
                            </h3>
                            <p className="text-xl text-white/75 mb-8 drop-shadow-xl max-w-md">
                                Your adventure awaits! Find amazing stays and create unforgettable memories.
                            </p>
                            <button 
                                className="px-12 py-5 backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-400 border border-white/30"
                                onClick={() => navigate('/')}
                            >
                                Explore Stays
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Mybooking
