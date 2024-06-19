import { useEffect, useState, useContext } from "react";
import Context from "../context/AppContext";
import Barber from "../models/Barber";
import Card from "./general/Card";
import Header from "./general/Header";
import "./CustomerPage.css";
import Customer from "../models/Customer";
import { getCustomersAppointments } from "../api/customerApi";
import Appointment from "../models/Appointment";
import AppointmentCard from "./general/AppointmentCard";


const CustomerPage = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const ctx = useContext(Context);

  const getAssociatedBarbers = async () => {
    const strUser = localStorage.getItem("user");
    if (strUser) {
      const user: Customer = JSON.parse(strUser);
      const aptList = await getCustomersAppointments(user.id);
      if (!aptList) return;
      setAppointments(aptList);

      const ids: number[] = [];
      const barbers: Barber[] = [];
      for (const apt of aptList) {
        if (ids.includes(apt.barber.id!) === false) {
          barbers.push(apt.barber as Barber);
          ids.push(apt.barber.id!);
        }
      }
      setBarbers(barbers);
    }
  };

  useEffect(() => {
    if(!ctx.isCustomer()){
      
    }
    getAssociatedBarbers();
  }, []);

  return (
    <div className="customer-page">
      <Header title={"Customer Page"} />
      <div className="sections">
        <div className="section-container">
          <Header title={"My Barbers:"} />
          <div className="my-barber-list mt-3 h-80">
            {barbers.map((c) => (
              <Card key={c.id} person={c} />
            ))}
          </div>
        </div>
        <div className="section-container">
          <Header title={"My Appointments:"} />
          <div className="my-barber-list mt-3 h-80">
            {appointments.map((c) => (
              <AppointmentCard key={c.id} apt={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
