import Appointment from "../models/Appointment";
import AuthResponse from "../models/AuthResponse";
import Barber from "../models/Barber";
import BaseUser from "../models/BaseUser";
import ResponseList from "../models/ResponseList";

const barberUrl = "http://localhost:8080/api/v1/barbers";
const appointmentUrl = "http://localhost:8080/api/v1/appointments/barbers";

const getToken = () => {
  const rawAuth = localStorage.getItem("auth");
  if(rawAuth){
    const auth = JSON.parse(rawAuth) as AuthResponse;
    return auth.token;
  }
}

export const getBarbers = async () => {
  const token = getToken();
  try {
    const response = await fetch(barberUrl, {
      method: "GET",
      headers:{Authorization : `Bearer ${token}`}
    });
    if (response.status == 200) {
      const barberList: ResponseList<Barber> =
        (await response.json()) as ResponseList<Barber>;

      return barberList;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const getBarberById = async (barberId: number) => {
  const token = getToken();
  try {
    const response = await fetch(`${barberUrl}/${barberId}`, {
      method: "GET",
      headers:{Authorization : `Bearer ${token}`}
    });
    if (response.status == 200) {
      const barber: Barber =
        (await response.json()) as Barber;
      return barber;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const getBarbersAppointments = async (barberId: number = 1) => {
  const token = getToken();
  try {
    const response = await fetch(`${appointmentUrl}/${barberId}`, {
      method: "GET",
      headers:{Authorization : `Bearer ${token}`}
    });
    if (response.status == 200) {
      //const appointmentList:ResponseList<Appointment> = await response.json() as ResponseList<Appointment>;
      const appointmentList: Appointment[] =
        (await response.json()) as Appointment[];
      return appointmentList;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const updateBarber = async (barber: Barber) => {
  const token = getToken();
  try {
    const response = await fetch(`${barberUrl}/${barber.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json", Authorization : `Bearer ${token}` },
        body: JSON.stringify(barber),
      });
      if (response.status == 200) {
        const user: BaseUser = (await response.json()) as BaseUser;
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } else {
        return false;
      }    
  } catch (err) {
    return false;
  }

};

export const searchBarber = async(name:string) :Promise<Barber[] | undefined> => {
  const token = getToken();
  try{
    const response = await fetch(`${barberUrl}/search/${name}`, {
      method: "GET",
      headers:{Authorization : `Bearer ${token}`}
    });
    if (response.status == 200) {
      const barbers: Barber[] = (await response.json()) as Barber[];
      return barbers;
    }else{
      return undefined;
    }

  }catch(err){
    return undefined;
  }
}