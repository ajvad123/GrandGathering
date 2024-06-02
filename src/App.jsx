import './App.css'
import './bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import Dashboard from './Components/Dashboard'
import Header from './Pages/Header'
import Footer from './Pages/Footer'
import EventCompanies from './Components/EventCompanies'
import EventList from './Components/EventList'
import Auth from './Pages/Auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Admin from './Pages/Admin'
import AddEcompanies from './Components/AddEcompanies'
import AddEvents from './Components/AddEvents'
import Update from './Components/Update'
import EventTicket from './Components/EventTicket'
import CompanyBooking from './Components/CompanyBooking'


function App() {

  return (
    <>

      <Header />

      <Routes>



        <Route path='/' element={<Landing />} />
        <Route path='/dash' element={<Dashboard />} />
        <Route path='/elist' element={<EventList />} />
        <Route path='/ecompany' element={<EventCompanies />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/dash/addeCmpny' element={<AddEcompanies />} />
        <Route path='/dash/addevnt' element={<AddEvents />} />
        <Route path='/dash/edit' element={<Update />} />
        <Route path='/edit' element={<Update />} />
        <Route path='/Ticket' element={<EventTicket />} />
        <Route path='/Cbooking' element={<CompanyBooking />} />




        

        



      </Routes>

      <Footer />
      <ToastContainer />

    </>
  )
}

export default App
