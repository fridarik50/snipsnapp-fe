import Card from "../general/Card";
import Header from "../general/Header";
import Barber from "../../models/Barber";
import { useEffect, useState } from "react";
import { getBarbers } from "../../api/barberApi";


const BarberList = () => {

  const [barberList, setBarberList] = useState<Barber[]>([])  
  const [error, setError] = useState<string | undefined>(undefined)
  const loadBarbers = async() => {
    const response = await getBarbers()
    if(response) {
      setBarberList(response.items)
      setError(undefined)
    } else{
      console.log("test");
      
      setError("error loading data")
    }
  }
  
  useEffect(() => {loadBarbers()}, [])

    return(
        <div>
            <Header title="click a barber to view his profile"/>
            <br />
            {error && <Header title = {error} />}
            <div>
                {
                    barberList.map( b => <Card key={b.id} person={b} routeTitle="show profile" routeTo={"/barber-profile/"+b.id}/>)
                }
            </div>
        </div>
    )
}

export default BarberList;