
import Customer from '../../models/Customer';
import WeeklyCalendar from '../WeeklyCalendar';
import Card from '../general/Card';
import "./Barber.css"
import Header from '../general/Header';
import { useEffect, useState } from 'react';
import Appointment from '../../models/Appointment';
import { getBarbersAppointments } from '../../api/barberApi';

// const customers: Customer[] = [
//     {
//         id: 1,
//         name: "Arik",
//         email: "arik1@gmail.com"
//     },
//     {
//         id: 2,
//         name: "Arik bbb",
//         email: "arik1@gmail.com"
//     },
//     {
//         id: 3,
//         name: "Arik ccc",
//         email: "arik1@gmail.com"
//     },
//     {
//         id: 4,
//         name: "Arik ddd",
//         email: "arik1@gmail.com"
//     }
// ]
const BarberPage = () => {
    const [appointmentList, setAppointmentList] = useState<Appointment[]>([])

    const getAppointment = async() => {
        const appointmentList = await getBarbersAppointments();
        if(appointmentList){
          setAppointmentList(appointmentList)
        }
    }

    useEffect(() => {
        getAppointment();
    }, [])
    
    return(
        <div>
            <Header title = {"Barber Page"}  />
            <WeeklyCalendar appointments={appointmentList}/>
            <Header title = {"Today's Customers:"}  />
            {/* <div className='daily-customers'>{customers.map(c => <Card key={c.id} person={c} />)}</div> */}
        </div>
    )
}

export default BarberPage;