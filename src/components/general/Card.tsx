import Person from "../../models/Person"
import { Link } from "react-router-dom";
import "./Card.css"

type CardProps = {
    person: Person;
    routeTo?: string;
    routeTitle?: string;
}
const Card = ({person, routeTo, routeTitle}: CardProps) => {
    return(
        <div className="Card">
            <p>{person.name}</p>
            {routeTo && <Link to={routeTo}>{routeTitle}</Link>}
        </div>
    )
}
export default Card