import { Link, useLocation, useParams } from "react-router-dom"
export default function Navbar(){
    function linkClasses (type = null){

        const {pathname} = useLocation()
        let subpage = pathname.split('/')?.[2]
        if(subpage === undefined){
            subpage='profile'
        }

        let classes = 'py-2 px-6 font-bold inline-flex gap-1 rounded-full'
        if(type === subpage){
          classes += ' bg-primary text-white '
        }else{
          classes += ' bg-gray-200 text-black'
        }
        return classes
      }

    return(
    <>
        <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
            <Link className={linkClasses('profile')}  to={'/account'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            My Profile
            </Link>
            <Link className={linkClasses('bookings')}  to={'/account/bookings'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            < path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
            </svg>
            My Bookings
            </Link>
            <Link className={linkClasses('places')} to ={'/account/places'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
            My Accomodations
            </Link>
        </nav>
    </>    
    )
}