import Barber from "./Barber";
import Customer from "./Customer";

interface Appointment {
    id?:number;
    date:string
    startHour:string
    endingHour:string
    comments:string
    barber:Barber|{id:number}
    customer:Customer|{id:number}

}

export default Appointment;

/*
   private Long id;
    private LocalDate date;
    private LocalTime startHour;
    private LocalTime endingHour;
    private String comments;
    private Barber barber;
    private Customer customer;

*/