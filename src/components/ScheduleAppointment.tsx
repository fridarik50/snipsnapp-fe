import { useEffect, useState } from "react";
import Appointment from "../models/Appointment";
import WeeklyCalendar from "./WeeklyCalendar";
import { getBarbersAppointments } from "../api/barberApi";
import Header from "./general/Header";
import { useParams } from "react-router-dom";
import Customer from "../models/Customer";
import { scheduleAppointment } from "../api/appointmentApi";

const ScheduleAppointment = () => {
  const params = useParams();
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const getAppointment = async () => {
    const appointmentList = await getBarbersAppointments();
    if (appointmentList) {
      setAppointmentList(appointmentList);
    }
  };

  const schedule = async (date: string, hour: number) => {
    const startHour = formatHour(hour);
    const customer:Customer = JSON.parse(localStorage.getItem("user")! );

    const apt:Appointment = {date:date, startHour:startHour, endingHour:startHour, comments:'scheduled by customer', barber:{id:+params.barberId!}, customer:{id:customer.id!}}
    const result = await scheduleAppointment(apt)
    if(!result){
        setError("error scheduling appointment")
    }else{
        setError(undefined)
    }
  };

  const formatHour = (hour: number) => {
    
    if ( !(hour+'').includes(".") ) {
      return hour + ":00";
    } else {
      return Math.floor(hour) + ":30";
    }
  };


  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <div>
      <p>Select a date and an hour to schedule an appointment</p>
      {error && <Header title={error} />}
      <WeeklyCalendar appointments={appointmentList} schedule={schedule} />
    </div>
  );
};

export default ScheduleAppointment;
