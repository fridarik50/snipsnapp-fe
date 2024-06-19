import { Route, Routes, Link } from 'react-router-dom'
import { useState } from "react";
import Header from "../general/Header";
import { login } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import Register from './Register';

const Login = () => {
    const [authLogin, setAuthLogin] = useState<{email: string, password: string}>({email: '', password:''})
    const [error, setError] = useState<string | undefined>(undefined)
    const nav = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
        const value = e.target.value;
        const key = e.target.id;
        setAuthLogin({...authLogin, [key]:value})
    }

  
    const submitLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const user = await login(authLogin.email, authLogin.password)
        if (user) {
            if(user.role === "CUSTOMER"){
                nav("/customer")
            }else if(user.role === "BARBER"){
                nav("/barber")
            }            
        } else {
            setError("Unsuccessful Login")
        }
    }
    
    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm}  onSubmit={submitLogin}>
            <div className={styles.headerContainer}>
            <Header title="Login" backgroundColor="white" color="#1A1A2E"/>
            {error && <Header title = {error} />}
            </div>
            
            <div className={styles.inputContainer}>
                <input className={styles.emailInput} type='email' id='email' placeholder='Enter your email' required value={authLogin.email} onChange={handleChange}/>
                <input className={styles.passwordInput} type='password' id='password' placeholder='Enter your password' required value={authLogin.password} onChange={handleChange}/>
            </div>
            
            <div className={styles.buttonContainer}>
                <button className={styles.loginBtn}>Login</button>
                {/* <a className={styles.forgotPasswordBtn}>Forgot Password?</a> */}
            </div>
            <div className={styles.registerContainer}>
                <p>Not a member yet?</p>
                <Link className={styles.linkToRegister} to='/register'>Register</Link>
                <Routes>
                <Route path='/register' element={<Register/>}/>
                </Routes>
            </div>
        </form>
        </div>
        
    );
}

export default Login