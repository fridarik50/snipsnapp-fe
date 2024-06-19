import { useEffect, useState } from "react";
import Barber from "../../models/Barber";
import styles from './UpdateBarber.module.css'
import Header from "../general/Header";
import { updateBarber } from "../../api/barberApi";
import useError from '../general/useError'

const UpdateBarber = () => {
  const [barber, setBarber] = useState<Barber>({
    name: "",
    skills: "",
    experience: "",
    workingHours: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  
  const {setError, Message} = useError();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const key = e.target.id;
    setBarber({ ...barber, [key]: value });
  };
  useEffect(() => {
    const strUser = localStorage.getItem("user");
    if (strUser) {
      const b = JSON.parse(strUser);
      setBarber(b);
      // TODO set baseber in barber page and also customer in customer and update customer pages
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const isOk = await updateBarber(barber)
    if (isOk) {
        setError(undefined)            
    } else {
        setError("Unsuccessful Update")
    }
}

  return (
    <div className="">
      <form className={styles.updateBarberForm} onSubmit={handleSubmit}>
      <Header title="Update your Info" />
      <Message/>
      
        <div className={styles.inputContainer}>
          <input
            className={styles.barberInputDetails}
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={barber.name}
            onChange={handleChange}
          />

          <input
            className={styles.barberInputDetails}
            type="text"
            id="skills"
            placeholder="Add your skills"
            required
            value={barber.skills}
            onChange={handleChange}
          />

          <input
            className={styles.barberInputDetails}
            type="text"
            id="experience"
            placeholder="Add your experience"
            required
            value={barber.experience}
            onChange={handleChange}
          />

          <input
            className={styles.barberInputDetails}
            type="text"
            id="workingHours"
            placeholder="Establish your working hours"
            required
            value={barber.workingHours}
            onChange={handleChange}
          />

          <input
            className={styles.barberInputDetails}
            type="text"
            id="address"
            placeholder="Enter your address"
            required
            value={barber.address}
            onChange={handleChange}
          />

          <input
            className={styles.barberInputDetails}
            type="text"
            id="phone"
            placeholder="Enter your phone"
            required
            value={barber.phone}
            onChange={handleChange}
          />

          <input
            className={styles.barberInputDetails}
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={barber.password}
            onChange={handleChange}
          />
        </div>

        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default UpdateBarber;
