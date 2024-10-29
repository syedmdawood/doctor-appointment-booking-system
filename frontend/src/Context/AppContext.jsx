import { createContext } from "react";

// import axios from "axios";
// import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const currencySymbol = "$";
  // const [doctors, setDoctors] = useState([]);
  // const [token, setToken] = useState(
  //   localStorage.getItem("token") ? localStorage.getItem("token") : false
  // );
  // const [userData, setUserData] = useState(false);

  // const backendUrl = import.meta.env.BACKEND_URL;

  // const getDoctorsData = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:4000/api/doctor/list");
  //     if (data.success) {
  //       setDoctors(data.doctors);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching doctors:", error);
  //     if (error.response) {
  //       // Server responded with a status other than 200
  //       toast.error(
  //         error.response.data.message ||
  //           "An error occurred while fetching doctors data."
  //       );
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       toast.error(
  //         "No response received from the server. Please try again later."
  //       );
  //     } else {
  //       // Something else happened while setting up the request
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  // const loadUserProfileData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:4000/api/user/get-profile",
  //       { headers: { token } }
  //     );

  //     if (data.success) {
  //       setUserData(data.userData);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error);
  //     if (error.response) {
  //       // Server responded with a status other than 200
  //       toast.error(
  //         error.response.data.message ||
  //           "An error occurred while fetching user profile."
  //       );
  //     } else if (error.request) {
  //       // Request was made but no response received
  //       toast.error(
  //         "No response received from the server. Please try again later."
  //       );
  //     } else {
  //       // Something else happened while setting up the request
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  const value = {
    // doctors,
    // // getDoctorsData,
    // currencySymbol,
    // token,
    // setToken,
    // backendUrl,
    // userData,
    // setUserData,
    // loadUserProfileData,
  };
  // useEffect(() => {
  //   getDoctorsData();
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     loadUserProfileData();
  //   } else {
  //     setUserData(false);
  //   }
  // }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
