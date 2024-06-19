import Person from "./Person";

interface Barber extends Person{
    password?:string;
    skills:string
    address:string
    phone:string
    experience:string
    workingHours:string

}

export default Barber;