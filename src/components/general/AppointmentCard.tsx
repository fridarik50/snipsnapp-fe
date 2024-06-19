import Person from "../../models/Person"
import { Link } from "react-router-dom";
import "./AppointmentCard.css"
import Appointment from "../../models/Appointment";
import Barber from "../../models/Barber";

type AppointmentCardProps = {
    apt: Appointment;
    routeTo?: string;
    routeTitle?: string;
}
const AppointmentCard = ({apt, routeTo, routeTitle}: AppointmentCardProps) => {
    const barber = apt.barber as Barber;
    return(
        <div className="AppointmentCard">
            <p>{barber.name}</p>
            <p>{apt.date}</p>
            <p>{apt.startHour.substring(0, 5)}</p>
            <p>{apt.endingHour.substring(0, 5)}</p>
            {routeTo && <Link to={routeTo}>{routeTitle}</Link>}
        </div>
    )
}
export default AppointmentCard