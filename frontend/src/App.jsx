import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Pages/MyProfile";
import MyAppointments from "./Pages/MyAppointments";
import Appointment from "./Pages/Appointment";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/myAppointment" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
