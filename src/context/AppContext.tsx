import React, { ReactNode, useState } from 'react'
import Barber from '../models/Barber';
import Customer from '../models/Customer';
import { searchBarber } from '../api/barberApi';
import { searchCustomers } from '../api/customerApi';
import AuthResponse from '../models/AuthResponse';

type ContextT = {
    searchText:string,
    isMenuVisible:boolean,
    barbers: Barber[],
    customers: Customer[],
    toggleMenuVisibility: () =>void,
    setSearchText: (text:string) => void,
    logout:() => void ,
    handleSearch:(text:string) => void,
    isCustomer: () => boolean,
    isBarber: () => boolean
}
const Context = React.createContext<ContextT>({
    searchText:'',
    isMenuVisible:false,
    barbers:[],
    customers: [],
    toggleMenuVisibility: ():void => undefined,
    setSearchText: (text:string):void =>undefined,
    logout:() :void => undefined,
    handleSearch:(text:string) :void => undefined,
    isCustomer: () => false,
    isBarber: () => false
})

export const ContextProvider = ({children}:{children: ReactNode}) => {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const logout = () => {
        localStorage.removeItem("auth");
    }
    const toggleMenuVisibility = () => {
        setIsMenuVisible(prevState => !prevState)
      
    };

    const getRole = () => {
        const raw = localStorage.getItem("auth");
        if(raw){
            const auth = JSON.parse(raw)  as AuthResponse;
            return auth.entity.role!
        }
        return ''
    }
    const isCustomer = () => getRole() === "CUSTOMER";
    const isBarber = () => getRole() === "BARBER";

    const handleSearch = async (text:string) => {
        const barbers = await searchBarber(text);
        if (barbers) {
          setBarbers(barbers);
        }
    
        const customers = await searchCustomers(text);
        if (customers) {
          setCustomers(customers);
        }
      };

    return (
        <Context.Provider value={{setSearchText, searchText, logout,isMenuVisible, toggleMenuVisibility, handleSearch, barbers, customers, isCustomer, isBarber}}>
            {children}
        </Context.Provider>
    )
}

export default Context;