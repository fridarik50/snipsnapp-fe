import { Link } from 'react-router-dom';
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLinks}>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className={styles.footerInfo}>
          <p>&copy; {new Date().getFullYear()} SnipSnapp</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
