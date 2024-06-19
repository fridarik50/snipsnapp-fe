import { useContext } from "react";
import Context from "../../context/AppContext";
import { Link } from "react-router-dom";
import './Menu.css';
import React from "react";
import Header from "./Header";

interface MenuProps {
  isVisible: boolean;
}

const Menu: React.FC<MenuProps> = ({isVisible}) => {
  const context = useContext(Context)

   const handleClick = () => {
    context.toggleMenuVisibility()
   }

   const handleLogoutClick = () => {
    context.toggleMenuVisibility();
    context.logout();
   }

  return (
    <div className={`menu ${isVisible ? 'visible' : ''}`}>
      <Header logo="src/assets/SnipSnapp Logo.svg" backgroundColor="none" />
      <Link to='/login' onClick={handleClick}>Login</Link>
      
      {context.isCustomer() && (
        <>
        <Link to='/customer' onClick={handleClick}>Customer Page</Link>
        <Link to='/barber-list' onClick={handleClick}>Barber List</Link>
        <Link to='/update-customer' onClick={handleClick}>Update Customer Info</Link>
        </>
      )}
      {
        context.isBarber() && (
          <>
          <Link to='/barber' onClick={handleClick}>Barber Page</Link>
          <Link to='/update-barber' onClick={handleClick}>Update Barber Info</Link>
          <Link to='/customer-list' onClick={handleClick}>Customer List</Link>
          </>
        )
      }
      
      <Link to='/login' onClick={handleLogoutClick}>Logout</Link>
    </div>
  )
}

export default Menu
