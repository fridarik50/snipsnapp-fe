import Person from "./Person";

interface Customer extends Person{

    password?:string;
    email: string;
    phone: string;
}

export default Customer;