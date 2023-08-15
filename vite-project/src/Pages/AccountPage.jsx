import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import Navbar from '../components/NavBar'

const AccountPage = () => {
  const {ready, user, setUser} = useContext(UserContext)
  const [redirect, setRedirect] = useState(null)
  
  let{subpage}=useParams()
  if(subpage === undefined){
    subpage='profile'
  }

  async function logout(){
    await axios.post('/logout');
    setUser(null)
    setRedirect('/');
  }

  if(!ready){
    return 'Loading...'
  }
  if(ready && !user && !redirect){
    return <Navigate to={'/login'}/>
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      <Navbar/>
      {
        subpage === 'profile' &&(
        <div className='text-center'>
          Logged in as {user.name}<button onClick={logout} className='primary max-w-xs mx-auto text-center flex justify-center mt-3'>
            <div className='inline-flex text-center gap-1'>  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </div>
            </button>
        </div>
        )
      }
      
      {subpage === 'places' && (
        <PlacesPage/>
      )}
      

    </div>
  )
}

export default AccountPage