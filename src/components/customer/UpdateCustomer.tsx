import { useState } from "react";
import Customer from "../../models/Customer";
import styles from "./UpdateCustomer.module.css";
import Header from "../general/Header";
import { updateCustomer } from "../../api/customerApi";
import useError from '../general/useError'

const UpdateCustomer = () => {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    email: "",
  });

  const {setError, Message} = useError();
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const key = e.target.id;
    setCustomer({ ...customer, [key]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const isOk = await updateCustomer(customer)
    if (isOk) {
        setError(undefined)            
    } else {
        setError("Unsuccessful Update")
    }
}

  return (
    <div className="">
      <form className={styles.updateCustomerForm} onSubmit={handleSubmit}>
        <Header title="Update your Info" />
        <Message/>
        <div className={styles.inputContainer}>
          <input
            className={styles.customerInputDetails}
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={customer.name}
            onChange={handleChange}
          />

          <input
            className={styles.customerInputDetails}
            type="text"
            id="phone"
            placeholder="Enter your phone"
            required
            value={customer.phone}
            onChange={handleChange}
          />
        </div>

        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
