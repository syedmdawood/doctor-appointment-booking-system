// import { useState } from "react";
import { createContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // const [atoken, setAToken] = useState(
  //   localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  // );
  // const [doctors, setDoctors] = useState([]);

  // const backendUri = import.meta.env.VITE_BACKEND_URI;

  // const getAllDoctors = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:4000/api/admin/all-doctors",
  //       {
  //         headers: { atoken }, // Make sure headers are passed correctly
  //       }
  //     );
  //     if (data.success) {
  //       setDoctors(data.doctors);
  //       console.log(data.doctors);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error);
  //   }
  // };

  // const changeAvailablity = async (docId) => {
  //   try {
  //     const { data } = await axios.post(
  //       backendUri + "/api/admin/change-availablity",
  //       { docId },
  //       { headers: { atoken } }
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //       getAllDoctors();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error);
  //   }
  // };

  const value = {
    // atoken,
    // setAToken,
    // backendUri,
    // doctors,
    // getAllDoctors,
    // changeAvailablity,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
