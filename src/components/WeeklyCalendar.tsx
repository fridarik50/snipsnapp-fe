
import { useEffect, useState } from "react";
import Appointment from "../models/Appointment";
import "./WeeklyCalendar.css";
import Header from "./general/Header";

type DayT = {
  id: number;
  shortName: string;
  name: string;
  currentDate:string
};
const days = [
  { id: 1, shortName: "Sun", name: "Sunday", currentDate:''},
  { id: 2, shortName: "Mon", name: "Monday", currentDate:''},
  { id: 3, shortName: "Tue", name: "Tuesday", currentDate:''},
  { id: 4, shortName: "Wed", name: "WednesDay", currentDate:''},
  { id: 5, shortName: "Thu", name: "Thursday", currentDate:''},
  { id: 6, shortName: "Fri", name: "Friday", currentDate:''},
];
const hours = [10, 11, 12, 13, 14, 15, 16];

type WeeklyCalendarProps = {
  appointments:Appointment[];
  schedule?: (date:string, hour: number) => void;
}

const WeeklyCalendar = ({appointments, schedule}:WeeklyCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  
  useEffect(()=>{
    const day = 1000*60*60*24;
    let tempDate = getSundayDate()
    
    for(const d of days){
      d.currentDate = tempDate.toISOString().split("T")[0];
      tempDate = new Date(tempDate.getTime()+day)
    }
    console.log(days);
    
  }, [date])

  const getSundayDate = () => {
      const day = 1000*60*60*24;
      const dayNum = date.getDay()+1;
      let diff = dayNum-1;
      if(dayNum == 8){
        diff == 0;
      }
      return new Date(date.getTime() - day * diff);
      
  }
  const getByDayAndHour = (date: string, hours: number) => {
    return appointments.find(app =>  app.date === date && +app.startHour.split(":")[0] === hours)
  }
  const weekBack = () => {
    const week = 1000*60*60*24*7;
     const d = new Date(date.getTime()- week);
     setDate(d)
  }
  const weekForward = () => {
    const week = 1000*60*60*24*7;
     const d = new Date(date.getTime() + week);
     setDate(d)
  }
  return (
    <div className="weekly-calendar">
      <Header title = {"Weekly Appointments starting " + date.toLocaleDateString()} />
      <div>
        <button className="backBtn" type="button" onClick={weekBack}> {'<-'}</button>
        <button className="forwardBtn" type="button" onClick={weekForward}> {'->'}</button>
      </div>

      <div className="calendar">
        {days.map((d) => (
          <Day key={d.id} day={d} getByDayAndHour={getByDayAndHour} schedule={schedule}/>
        ))}
      </div>
      <div>

      </div>
    </div>
  );
};


type DayProps = {
  day: DayT, 
  getByDayAndHour:(date: string, h: number)=>Appointment|undefined
  schedule?: (date:string, hour: number) => void
}

const Day = ({ day,getByDayAndHour,schedule  }: DayProps) => {
  const workingHours = [...hours, ...hours.map((h) => h + 0.5)].sort();
  const title = schedule? 'click to schedule appointment' : '';
  const handleClick = (hour:number) => {
    if(schedule){
      schedule(day.currentDate, hour)
    }
  }
  const formatHour = (hour: number) => {
    
    if ( !(hour+'').includes(".") ) {
      return hour + ":00";
    } else {
      return Math.floor(hour) + ":30";
    }
  };

  const getStatus = (hour: number) => {
    return undefined !== getByDayAndHour(day.currentDate, hour);
  }

  const getSlotText = (isBooked:boolean) =>{
    if(isBooked){
      return <span style={{backgroundColor:'#8F8BBF', color:'black'}}>Booked</span>
    }
    return <span style={{backgroundColor:'#89D5BC', color:'black'}}>Free</span>
  }

  return (
    <div>
      <div className="day" key={day.id}>
        {day.shortName +" " + day.currentDate}
      </div>
      {workingHours.map((h) => {
        const isBooked = getStatus(h);

        return <div className="time" key={h} style={{cursor: isBooked?'initial':'pointer'}}  onClick={() => !isBooked && handleClick(h)} title={title}>{formatHour(h)} {getSlotText(isBooked)}</div>
      })}
    </div>
  );
};
export default WeeklyCalendar;
