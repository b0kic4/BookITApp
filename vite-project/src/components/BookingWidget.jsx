import { useContext, useEffect, useState } from "react"
import React from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
export default function BookingWidget({placeData}){
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setFullName(user.name);
        }
    }, [user])


    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    function displayPrice() {
        if (numberOfNights === 0) {
          return (
            <div>
              Price: {placeData.price}$ / per night
            </div>
          );
        } else if (numberOfNights > 0) {
          return (
            <div>
              Price: {placeData.price * numberOfNights}$
            </div>
          );
        }
        // You might also want to handle other cases or return a default value here
      }
      

      async function bookThisPlace() {
        try {
          const response = await axios.post('/bookings', {
            placeData,
            user,
            checkIn,
            checkOut,
            numberOfGuests,
            name: fullName,
            phone: phoneNumber,
            place: placeData._id,
            price: numberOfNights * placeData.price,
          });
      
          // Extract the newly created booking's ID from the response data
          const bookingId = response.data._id;
      
          // Set the redirect URL to the booking details page
          setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
          // Handle any errors that occur during the POST request
          console.error("Error booking the place:", error);
          // You might want to set an error state or display an error message to the user
        }
      }
      
      if(redirect){
        return <Navigate to={redirect} />
      }

    return(
    <div className='bg-white shadow-md shadow-black p-4 rounded-2xl'>
        <div className='text-2xl mb-2 text-center'>{displayPrice()}</div>
            <div className="border rounded-2xl">
                <div className="flex relative justify-center text-center bg-gray-50">
                    <div className='py-3 px-4 text-center'>
                        <label>Check In:</label>
                        <input value={checkIn} onChange={(ev)=>setCheckIn(ev.target.value)} className="cursor-pointer" type="date" />
                    </div>
                    <div className='py-3 px-4 border-l'>
                        <label>Check Out:</label>
                        <input value={checkOut} onChange={(ev)=>setCheckOut(ev.target.value)} className="cursor-pointer" type="date" />
                    </div>
                </div>
                <div className='py-3 px-4 border-t text-center bg-gray-50'>
                    <label>Number of Guests:</label>
                    <input placeholder='1 2 3 4 ...' type="number" value={numberOfGuests} onChange={(ev)=>setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div>
                        <div className='py-3 px-4 border-t text-center bg-gray-50'>
                            <label>Your full name:</label>
                            <input placeholder="James Bond" type="text" value={fullName} onChange={(ev)=>setFullName(ev.target.value)} />
                        </div>
                        <div className='py-3 px-4 border-t text-center bg-gray-50'>
                            <label>Your Email:</label>
                            <input placeholder="example@email.com" type="email" value={email} onChange={(ev)=>setEmail(ev.target.value)} />
                        </div>
                        <div className='py-3 px-4 border-t text-center bg-gray-50'>
                            <label>Your phone number</label>
                            <input placeholder="+381 06x/xxy/yyxx" type="number" value={phoneNumber} onChange={(ev)=>setPhoneNumber(ev.target.value)} />
                        </div>
                    </div>
                )}
            </div>
        <button onClick={bookThisPlace} className='primary mt-4'>
            Reserve
            {checkIn && checkOut && (
                <span>
                    {numberOfNights>0 && (
                        <span> {numberOfNights} Days</span>
                    )}
                </span>
            )}
        </button>
  </div>
    )
}