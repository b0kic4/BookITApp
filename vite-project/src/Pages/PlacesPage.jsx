import { Link, useParams } from "react-router-dom"
import PlacesFormPage from "./PlacesFormPage"
import Navbar from "../components/NavBar"
import { useEffect, useState } from "react"
import axios from 'axios'
import PlaceImg from "../components/PlaceImg"
export default function PlacesPage(){
    const [places,setPlaces] = useState([])
    // displaying created pages
    useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
            // data will be list of our places
            setPlaces(data)
        })  
    }, [])
    return ( 
        <div>
            <Navbar/>
            <div className="text-center">
                list of all added places
                <br/>
                <Link className='bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                     Add New Place
                </Link>
            </div>
            <div className="mt-4">
                {
                    places.length > 0 && places.map(place=>(
                        <Link to={'/place/' + place._id} className="bg-gray-200 p-4 rounded-2xl flex gap-4 cursor-pointer">
                            <div key={place} className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                <PlaceImg place={place}/>
                            </div>
                            <div className="grow-0 shrink">
                            <h2 className="text-xl font-xl">{place.title}</h2>
                            <p className="text-sm mt-2 border-collapse truncate">{place.description}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}