import PhotosUploader from "../components/PhotosUploader"
import Perks from "../components/Perks"
import { useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import { Navigate, useParams } from "react-router-dom"
import axios from 'axios'
export default function PlacesFormPage(){
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests,setMaxGuests] = useState(1)
    const [price,setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)


    // Edditing the place
    useEffect(() => {
      if(!id){
        return;
      }
      axios.get('/places/'+id).then(response =>{
        const {data} = response;
        setTitle(data.title)
        setAddress(data.address)
        setAddedPhotos(data.photos)
        setDescription(data.description)
        setPerks(data.perks)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxGuests(data.maxGuests)
        setPrice(data.price)
      })
      }, [id])
    


    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header, description){
        return(
            <>
                {inputHeader(description)}
            </>
        )
    }
    async function savePlace(ev){
        ev.preventDefault()
        const placeData = {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price
        }
        if(id){
            // update
            await axios.put('/places/', {
                id, ...placeData

            })
            setRedirect(true)
        }else{
            // new place
            await axios.post('/places', placeData)
            setRedirect(true)
        }
        }
         
    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return(
        <>
        <div>
            <Navbar/>
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place should be short and catchy')}
                <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="Title, for example: My Apartment for rent" />

                {preInput('Address', 'Address for your place')}
                <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="Address, for example: Trg Karadjordjev venac"/>
                {preInput('Photos', 'More = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                <div>
                    <h2 className="text-xl font-semibold mt-4">Description</h2>
                    <textarea value={description} onChange={ev=>setDescription(ev.target.value)} placeholder="Description for your place"/>
                </div>
                {preInput('Perks', 'Select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks}/>
                {preInput('Extra Info', 'House rules, etc')}
                <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
                {preInput('Check In&Out times, max guests', 'Add check in and out times, remeber to have some time window for cleaning the room between guests')}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-1/2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In time</h3>
                            <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder="16:00h"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out time</h3>
                            <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Number Of Guests</h3>
                            <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
                    </div>

                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                            <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)} />
                    </div>
                </div>
                <div className="mt-12">
                    <button onSubmit={savePlace} type="submit" className="primary">Save</button>
                </div>
            </form>
        </div>
        </>
    )
}