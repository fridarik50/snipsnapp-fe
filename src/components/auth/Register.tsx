import { FormEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Barber from "../../models/Barber";
import Customer from "../../models/Customer";
import { registerBarber, registerCustomer } from "../../api/authAPI";
import Header from "../general/Header";
import styles from './Register.module.css';

const Register = () => {
  const nav = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    role: "None",
  });
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
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const key = e.target.id;
    setRegister({ ...register, [key]: value });
  };

  const handleChangeBarber = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const key = e.target.id;
    setBarber({ ...barber, [key]: value });
  };

  const handleChangeCustomer = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const key = e.target.id;
    setCustomer({ ...customer, [key]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (register.role === "None") {
      setError("please selecte a valid role");
      return;
    }
    if (register.role === "Barber") {
      const newBarber = { ...barber };
      newBarber.email = register.email;
      newBarber.password = register.password;
      const success = await registerBarber(newBarber);
      if (success) {
        nav("/barber");
      } else {
        setError("Unsuccessful Register");
      }
    } else if (register.role === "Customer") {
      const newCustomer = { ...customer };
      newCustomer.email = register.email;
      newCustomer.password = register.password;
      const success = await registerCustomer(newCustomer);
      if (success) {
        nav("/customer");
      } else {
        setError("Unsuccessful Register");
      }
    }
  };

  

  return (
    <div className="">
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <Header title="Register" />
        {error && <Header title={error} />}
        <div className={styles.inputContainer}>
          <div className={styles.roleInputDetails}>
            <input
              className={styles.userInputDetails}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={register.email}
              onChange={handleChange}
            />

            <input
              className={styles.userInputDetails}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={register.password}
              onChange={handleChange}
            />

            <div className={styles.roleInputSelect}>
              <span>I am a </span>
              <select
                name="role"
                id="role"
                value={register.role}
                onChange={handleChange}
              >
                <option value="None">Select your role</option>
                <option value="Barber">Barber</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
          </div>

          {(register.role === "Barber" && (
            <div className={styles.roleInputDetails}>
              <input
                className={styles.registerInputDetails}
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={barber.name}
                onChange={handleChangeBarber}
              />

              <input
                className={styles.registerInputDetails}
                type="text"
                id="skills"
                placeholder="Add your skills"
                required
                value={barber.skills}
                onChange={handleChangeBarber}
              />

              <input
                className={styles.registerInputDetails}
                type="text"
                id="experience"
                placeholder="Add your experience"
                required
                value={barber.experience}
                onChange={handleChangeBarber}
              />

              <input
                className={styles.registerInputDetails}
                type="text"
                id="workingHours"
                placeholder="Establish your working hours"
                required
                value={barber.workingHours}
                onChange={handleChangeBarber}
              />

              <input
                className={styles.registerInputDetails}
                type="text"
                id="address"
                placeholder="Enter your address"
                required
                value={barber.address}
                onChange={handleChangeBarber}
              />

              <input
                className={styles.registerInputDetails}
                type="text"
                id="phone"
                placeholder="Enter your phone"
                required
                value={barber.phone}
                onChange={handleChangeBarber}
              />

            </div>
          )) ||
            (register.role === "Customer" && (
              <div className={styles.roleInputDetails}>
                <input
                  className={styles.registerInputDetails}
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                  value={customer.name}
                  onChange={handleChangeCustomer}
                />

                <input
                  className={styles.registerInputDetails}
                  type="text"
                  id="phone"
                  placeholder="Enter your phone"
                  required
                  value={customer.phone}
                  onChange={handleChangeCustomer}
                />
              </div>
            ))}
        </div>
        <button id="submitBtn" className={register.role === "None"?styles.submitBtnHidden:styles.submitBtn} type="submit">Submit</button>
      </form>
      </div>
  );
};

export default Register;
