import AuthResponse from "../models/AuthResponse";
import Barber from "../models/Barber";
import BaseUser from "../models/BaseUser";
import Customer from "../models/Customer";

export const login = async (email: string, password: string):( Promise<BaseUser|undefined>) => {
   const response = await fetch("http://127.0.0.1:8080/api/v1/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: email,
            password: password 
        })
    });
    if(response.status == 200){
        const auth:AuthResponse = await response.json() as AuthResponse;
        localStorage.setItem('auth', JSON.stringify(auth));
        return auth.entity
    } else {
        return undefined
    }
}

export const registerBarber = async (barber: Barber) => {
    const response = await fetch("http://127.0.0.1:8080/api/v1/barbers", {
         method: "POST",
         headers: {"content-type": "application/json"},
         body: JSON.stringify(
             barber
        )
     });
     if(response.status == 201){
         const auth:AuthResponse = await response.json() as AuthResponse;
         localStorage.setItem('auth', JSON.stringify(auth));
         return true
        } else {
            return false
        }
 }

 export const registerCustomer = async (customer: Customer) => {
    const response = await fetch("http://127.0.0.1:8080/api/v1/customers", {
         method: "POST",
         headers: {"content-type": "application/json"},
         body: JSON.stringify(
             customer
        )
     });
     if(response.status == 201){
         const auth:AuthResponse = await response.json() as AuthResponse;
         localStorage.setItem('auth', JSON.stringify(auth));
         return true
        } else {
            return false
        }
 }