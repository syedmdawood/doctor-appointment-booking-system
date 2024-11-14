import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendUrl, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlot = async () => {
    setDocSlot([]);

    // Ensure docInfo is available before proceeding
    if (!docInfo || !docInfo.slot_booked) {
      return;
    }

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlot = [];
      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formatedTime;
        const isSlotAvailable =
          docInfo.slot_booked[slotDate] &&
          docInfo.slot_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlot.push({
            datetime: new Date(currentDate),
            time: formatedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlot]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      return navigate("/login");
    }
    try {
      const date = docSlot[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/myAppointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);

  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* ---------- Doctor Detail -------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="">
            <img
              src={docInfo.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ---------- Doctor name, degree, ...... -------- */}
            <p className=" flex items-center gap-2 text-gray-900 font-medium text-2xl">
              {docInfo.name}{" "}
              <img src={assets.verified_icon} alt="" className="w-4" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* ---------- Doctor About -------- */}
            <div className="">
              <p className="flex items-center text-sm gap-1 font-medium text-gray-900  mt-3 ">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[720px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Apointment Fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ---------- Booking Slots */}

        <div className="sm:ml-72 sm:pl-4  mt-1 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlot.length &&
                docSlot.map((item, index) => {
                  return (
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                        slotIndex === index
                          ? "bg-primary text-black"
                          : "border border-gray-200"
                      }`}
                      key={index}
                    >
                      <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                      <p>{item[0] && item[0].datetime.getDate()} </p>
                    </div>
                  );
                })}
            </div>

            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlot.length &&
                docSlot[slotIndex].map((item, index) => {
                  return (
                    <p
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                        item.time === slotTime
                          ? "bg-primary text-white "
                          : "text-gray-400 border border-gray-300"
                      }`}
                      key={index}
                    >
                      {item.time.toLowerCase()}
                    </p>
                  );
                })}
            </div>
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an Appointment
          </button>
        </div>

        {/* ---------- Related Doctors page -------- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
