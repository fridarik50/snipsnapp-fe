import Barber from "../../models/Barber";
import Header from "../general/Header";
import { useParams , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import "./BarberProfile.css";
import { getBarbersAppointments } from "../../api/barberApi";
import Appointment from "../../models/Appointment";
import { getBarberById } from "../../api/barberApi";
import ResponseList from "../../models/ResponseList";

//TODO ask lior about the function below and hot implement it

// const DisplayBarber = ({ barberId }: {barberId: number}) => {

//   const [barber, setBarber] = useState<ResponseList<Barber>>()
//   const [error, setError] = useState<string | undefined>(undefined)
//   const showBarber = async() =>{
//     const response = await getBarberById(barberId)
//     if(response) {
//       setBarber(response)
//       setError(error)
//     } else {
//       console.log("Error fetching barber details");
//       setError("Error loading data");
    
//     }
//   }

//   useEffect(() => {showBarber()}, [])
// }



const BarberProfile = () => {
  const params = useParams();
  const [barber, setBarber] = useState<Barber>();
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([])
  const nav = useNavigate();

  const getAppointment = async() => {
      const appointmentList = await getBarbersAppointments();
      if(appointmentList){
        setAppointmentList(appointmentList)
      }
  }

  const getBarber = async (barberId:number) => {
    const barber = await getBarberById(barberId);
    if(barber){
      setBarber(barber);
    }
  }

  useEffect(() => {
    console.log("params", params);
    if (params.barberId) {
      getBarber(+params.barberId);
    }
  }, []);

  if (!barber) {
    return <div className="section-container">Loading, please wait</div>;
  }

  const navHandler = () => {
    nav(`/schedule-appointment/${barber.id}`)
  }

  if(!barber){
    return (<div> Loading, please wait</div>)
  }

  return (
    <div className="barber-profile">
      <Header title={"Barber Profile"} />
      <div className="BarberDetails">
        <Header
          title={barber.name}
          fontSize="1rem"
          backgroundColor="#615251"
          color="#112233"
        />
        <div className="section">
          <p>Address:</p>
          <Field name={barber.address} />
        </div>
        <div className="section">
          <p>Email:</p>
          <Field name={barber.email} />
        </div>

        <div className="section">
          <p>Phone Number:</p>
          <Field name={barber.phone} />
        </div>
        <div className="section">
        <p>Skills:</p>
          <Field name={barber.skills} />
        </div>
        <div className="section">
        <p>Experience:</p>
          <Field name={barber.experience} />
        </div>
        <div className="section">
        <p>Working Hours:</p>
          <Field name={barber.workingHours} />
        </div>
        <div className="btnSection">
            <button className="go-to-schedule" onClick={navHandler}>Click to schedule an appointment</button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ name }: { name: string }) => {
  return (
    <div
      style={{
        display: "inline-block",
        padding: '0.5rem',
        margin: "1rem",
        backgroundColor: "#999",
        fontSize: "0.8rem",
        borderRadius: "5px",
        fontWeight: "bold"
      }}
    >
      {name}
    </div>
  );
};
export default BarberProfile;
