//add link for this component in menu and add route at App.tsx
//create customerApi like barberApi
//create content for this component like BarberList.tsx


import Card from "../general/Card";
import Header from "../general/Header";
import { useEffect, useState } from "react";
import { getCustomers } from "../../api/customerApi";
import Customer from "../../models/Customer";


const CustomerList = () => {

  const [customerList, setCustomerList] = useState<Customer[]>([])  
  const [error, setError] = useState<string | undefined>(undefined)
  const loadCustomers = async() => {
    const response = await getCustomers()
    if(response) {
      setCustomerList(response.items)
      setError(undefined)
    } else{
      console.log("test");
      
      setError("error loading data")
    }
  }
  
  useEffect(() => {loadCustomers()}, [])

    return(
        <div>
            <Header title="click a customer to view his profile"/>
            <br />
            {error && <Header title = {error} />}
            <div>
                {
                    customerList.map( c => <Card key={c.id} person={c} routeTitle="show profile" routeTo={"/customer-profile/"+c.id}/>)
                }
            </div>
        </div>
    )
}

export default CustomerList;