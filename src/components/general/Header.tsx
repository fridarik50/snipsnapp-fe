
import { useEffect } from 'react';
import './Header.css';

type HeaderProps = {
  title?: string|undefined
  fontSize?: string
  color?: string
  backgroundColor?: string
  isError?: boolean
  clearError?:() => void
  logo?: string
}

const Header = ({title, fontSize = "1.5rem", color = "#E7EBBC", backgroundColor = "#1c2a39e6", isError = false, clearError, logo}: HeaderProps) => {

  
  color = isError?'red':color;

  useEffect( () => {

  }, [isError])

  const handleClick = () => {
    if(clearError){
      clearError();
    }
  }
  if (!title && !logo) return <></>;
  return (
    <div className={isError?'header-container-error':'header-container'} onClick={handleClick}>
      <header style={{fontSize: fontSize, color: color, backgroundColor: backgroundColor}} className="header-text">
      {logo ? <img src={logo} alt="logo" className="header-logo" /> : title}
      </header>
    </div>
  )
}

export default Header
