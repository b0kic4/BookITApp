import React, { useState } from "react";

export default function PlaceGallery({placeData}){

    const [showAllPhotos, setShowAllPhotos] = useState(false)

    if (showAllPhotos) {
        return (
          <div className='absolute inset-0 text-white bg-black min-h-screen'>
            <div className='p-8 grid gap-4 bg-black justify-center'>
              <div>
                <h2 className='text-3xl font-bold text-center'>Photos of {placeData.title}</h2>
                <button onClick={()=>(setShowAllPhotos(false))} className='fixed rounded-xl bg-opacity-50 bg-white text-black border border-black shadow-md shadow-gray-800 font-bold py-1 px-2 inline-flex gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 self-center">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                  Close Photos
                </button>
              </div>
            {placeData?.photos?.length > 0 &&
              placeData.photos.map((photo, index) => (
                <div key={index}>
                  <img className='rounded-2xl' src={`http://localhost:4000/uploads/${photo}`} alt={`Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        );
      }

    return(
        <div className='relative overflow-hidden rounded-2xl'>
            <div className='grid gap-2 grid-cols-[2fr_1fr] overflow-hidden rounded-2xl'>
                <div>
                    {placeData.photos?.[0] && (
                        <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={`http://localhost:4000/uploads/${placeData.photos[0]}`} alt="" />
                    )}         
                </div>
                <div className='grid max-w-[600px]'>
                    <div>
                        {placeData.photos?.[1] && (
                            <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={`http://localhost:4000/uploads/${placeData.photos[1]}`} alt="" />
                        )}
                    </div>
                    <div className='overflow-hidden'>
                        {placeData.photos?.[2]&&(
                        <img onClick={()=>setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer relative top-4' src={`http://localhost:4000/uploads/${placeData.photos[2]}`} alt="" />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={()=>setShowAllPhotos(true)} className='absolute right-2 bottom-2 rounded-xl bg-opacity-50 border border-black shadow-md shadow-gray-800 font-bold py-2 px-4 inline-flex gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 self-center">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                Show More Photos
            </button>
    </div>
    )

}