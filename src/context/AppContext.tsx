import React, { ReactNode, useState } from 'react'
import Barber from '../models/Barber';
import Customer from '../models/Customer';
import { searchBarber } from '../api/barberApi';
import { searchCustomers } from '../api/customerApi';

type ContextT = {
    searchText:string,
    isMenuVisible:boolean,
    barbers: Barber[],
    customers: Customer[],
    toggleMenuVisibility: () =>void,
    setSearchText: (text:string) => void,
    logout:() => void ,
    handleSearch:(text:string) => void,
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
        <Context.Provider value={{setSearchText, searchText, logout,isMenuVisible, toggleMenuVisibility, handleSearch, barbers, customers}}>
            {children}
        </Context.Provider>
    )
}

export default Context;