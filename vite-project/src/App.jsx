import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './Pages/AccountPage'
import PlacesPage from './Pages/PlacesPage'
import MyBookingsPage from './Pages/MyBookingsPage'
import PlacesFormPage from './Pages/PlacesFormPage'
import UniquePlacePage from './Pages/UniquePlacePage'
import BookingPage from './Pages/BookingPage'

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesFormPage/>}/>
        <Route path='/account/bookings' element={<MyBookingsPage/>}/>
        <Route path='/account/bookings/:id' element={<BookingPage/>}/>
        <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
        <Route path='/place/:id' element={<UniquePlacePage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
