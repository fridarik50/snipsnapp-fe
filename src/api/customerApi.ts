import Appointment from "../models/Appointment";
import AuthResponse from "../models/AuthResponse";
import BaseUser from "../models/BaseUser";
import Customer from "../models/Customer";
import ResponseList from "../models/ResponseList";

const customerUrl = 'http://localhost:8080/api/v1/customers'
const appointmentUrl = 'http://localhost:8080/api/v1/appointments/barbers';

const getToken = () => {
    const rawAuth = localStorage.getItem("auth");
    if(rawAuth){
      const auth = JSON.parse(rawAuth) as AuthResponse;
      return auth.token;
    }
  }

export const getCustomers = async () => {
    const token = getToken();
    try {
        const response = await fetch(customerUrl, {
        method: "GET",
        headers:{Authorization : `Bearer ${token}`}
    });
    if(response.status == 200){
        const customerList:ResponseList<Customer> = await response.json() as ResponseList<Customer>;
        
        return customerList;
    } else {
        return undefined
    }
    } catch(error) {
        return undefined
    }
   
}


export const getCustomersAppointments = async (customerId:number = 1) => {
    const token = getToken();
    try {
        const response = await fetch(`${appointmentUrl}/${customerId}`, {
        method: "GET",
        headers:{Authorization : `Bearer ${token}`}
    });
    if(response.status == 200){
        //const appointmentList:ResponseList<Appointment> = await response.json() as ResponseList<Appointment>;
        const appointmentList:Appointment[] = await response.json() as Appointment[];
        return appointmentList;
    } else {
        return undefined
    }
    } catch(error) {
        return undefined
    }
   
}


export const updateCustomer = async (customer: Customer) => {
    const token = getToken();
    try{
        const response = await fetch(`${customerUrl}/${customer.id}`, {
            method: "PUT",
            headers: {"content-type": "application/json", Authorization : `Bearer ${token}`},
            body: JSON.stringify(
                customer
           )
        });
        if(response.status == 200){
            const user:BaseUser = await response.json() as BaseUser;
            localStorage.setItem('user', JSON.stringify(user));
            return true
           } else {
               return false
           }
    } catch (err) {
        return false
    }
 }

 export const searchCustomers = async(name:string) :Promise<Customer[] | undefined> => {
    const token = getToken();
    try{
      const response = await fetch(`${customerUrl}/search/${name}`,{
        method:"GET",
        headers:{Authorization : `Bearer ${token}`}
      });
      if (response.status == 200) {
        const customers: Customer[] = (await response.json()) as Customer[];
        return customers;
      }else{
        return undefined;
      }
  
    }catch(err){
      return undefined;
    }
  }