import React from "react";
import Nav from "../component/Nav";
import { useContext } from "react";
import { listingDataContext } from "../context/ListingContext";
import Card from "../component/Card";
import videobg from "../assets/videobg.mp4"; // ✅ Import video

function Home() {
  const { listingData, newListData } = useContext(listingDataContext);

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* 🎥 FULL SCREEN VIDEO BACKGROUND */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        src={videobg}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* 🖤 DARK OVERLAY FOR TEXT VISIBILITY */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/70 z-10"></div>

      {/* 📱 SCROLLABLE CONTENT */}
      <div className="relative z-20 min-h-screen pt-20 pb-12">
        {/* 🧭 NAVIGATION */}
        <Nav />

        {/* 🎯 HERO SECTION */}
<div className="text-center top-0 px-4 md:px-8 ">
  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-none lg:leading-tight tracking-tight">
    Discover Dream Stays
  </h1>
  <p className="text-xl md:text-2xl lg:text-3xl font-light bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-xl max-w-3xl mx-auto leading-relaxed lg:leading-[1.3]">
    Luxury villas, beach houses, and city escapes at your fingertips
  </p>
</div>







        {/* 🏠 LISTINGS GRID - SCROLLABLE */}
        <div className="w-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              Featured Properties
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-light drop-shadow-lg">
              {newListData.length} exclusive stays waiting for you
            </p>
          </div>

          {/* ✨ RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {newListData.map((list) => (
              <Card
                key={list._id}
                title={list.title}
                landmark={list.landmark}
                city={list.city}
                image1={list.image1}
                image2={list.image2}
                image3={list.image3}
                rent={list.rent}
                id={list._id}
                ratings={list.ratings}
                isBooked={list.isBooked}
                host={list.host}
              />
            ))}
          </div>

          {/* 📜 NO LISTINGS MESSAGE */}
          {newListData.length === 0 && (
            <div className="text-center py-32">
              <div className="w-32 h-32 bg-white/20 rounded-3xl mx-auto mb-8 flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-3xl font-bold text-white/90 mb-4 drop-shadow-xl">
                No properties yet
              </h3>
              <p className="text-xl text-white/70 drop-shadow-lg">
                Be the first to discover amazing stays
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
