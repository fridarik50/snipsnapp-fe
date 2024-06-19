import Appointment from "../models/Appointment";
import Barber from "../models/Barber";
import ResponseList from "../models/ResponseList";


const appointmentUrl = 'http://localhost:8080/api/v1/appointments';




export const scheduleAppointment = async (appointment: Appointment) => {
    try {
        const response = await fetch(`${appointmentUrl}`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(appointment)
    });
    if(response.status == 200){
        
        const apt :Appointment = await response.json() as Appointment;
        return apt;
    } else {
        return undefined
    }
    } catch(error) {
        return undefined
    }
   
}


