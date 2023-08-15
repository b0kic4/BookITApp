import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import PlaceLocation from '../components/PlaceLocation';

export default function UniquePlacePage(){
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    if(!id){
      return
    }
    axios.get(`/places/${id}`).then(response => {
      setPlaceData(response.data);
    });
  }, [id]);


  if(!placeData) return ''

  // show more photos functionality

  
  
  return (
    <div className='mt-8 bg-gray-50 -mx-8 px-8 pt-8'>
      <h1 className='text-3xl'>{placeData.title}</h1>
        <PlaceLocation>{placeData.address}</PlaceLocation>
        <div>
          <PlaceGallery placeData={placeData}/>
        </div>
      <div className='mt-8 gap-4 grid gird-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4 text-base w-3/4'><h2 className='text-2xl font-semibold underline'>Description:</h2>{placeData.description}</div>
          <b>Check-in:</b>{" "}{placeData.checkIn}h<br/>
          <b>Check-out:</b>{" "}{placeData.checkOut}h<br/>
          <b>Max Guests</b>{" "}{placeData.maxGuests} people<br/>
        </div>
        <div>
          <BookingWidget placeData={placeData}/>
        </div>
      </div>
      <div className='bg-white -mx-8 px-8 py-8 border-t'>
        <div><h2 className='text-2xl font-semibold underline'>Extra Info:</h2></div>
        <div className='mt-2 text-sm text-gray-700 leading-5'>{placeData.extraInfo}</div>
      </div>
    </div>
  );
}


