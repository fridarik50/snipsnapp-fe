import { Route, Routes, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from './context/AppContext';
import './App.css';
import Header from './components/general/Header';
import Login from './components/auth/Login';
import Menu from './components/general/Menu';
import Register from './components/auth/Register';
import BarberPage from './components/barber/BarberPage';
import Customer from './components/CustomerPage';
import BarberList from './components/barber/BarberList';
import BarberProfile from './components/barber/BarberProfile';
import ScheduleAppointment from './components/ScheduleAppointment';
import UpdateBarber from './components/barber/UpdateBarber';
import UpdateCustomer from './components/customer/UpdateCustomer';
import CustomerList from './components/customer/CustomerList';
import SearchBar from './components/general/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import FloatingActionButton from './components/general/FloatingActionButton';
import { useState } from 'react';
import Chat from './components/general/Chat';
import Person from './models/Person';
import Footer from './components/general/Footer';

import SearchResult from './components/general/SearchResult';


function App() {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const nav = useNavigate();
  const context = useContext(Context)
  

  const toggleChatVisibility = () => {
    setIsChatVisible(prevState => !prevState);
  };


  const person: Person = {
    name: 'John Doe',
    email: ''
  };

  return (
    <>
      <div className='header-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header logo="src/assets/SnipSnapp Logo.svg" />
        <SearchBar />
        <div className="menu-icon" onClick={context.toggleMenuVisibility}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </div>
      </div>
      <Menu isVisible={context.isMenuVisible} />
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/barber" element={<BarberPage />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/barber-list" element={<BarberList />} />
        <Route path="/barber-profile/:barberId" element={<BarberProfile />} />
        <Route path="/schedule-appointment/:barberId" element={<ScheduleAppointment />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/update-barber" element={<UpdateBarber />} />
        <Route path="/update-customer" element={<UpdateCustomer />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
      <FloatingActionButton onClick={toggleChatVisibility} />
      {isChatVisible && <Chat person={person} />}
      <Footer />
    </>
  );
}

export default App;
