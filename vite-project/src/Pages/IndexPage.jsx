import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const IndexPage = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(response => {
      // data will be a list of our places
      setPlaces([...response.data,])
    })  
  }, [])

  return (
    <div className='mt-8 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
     {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id}>
          <div className='bg-gray-500 rounded-2xl flex' key={place.id}>
              {place.photos?.[0] && (
                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="IDK" />
              )}
        </div>
        <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
      </Link>
     ))}
   </div>
  )
}

export default IndexPage
