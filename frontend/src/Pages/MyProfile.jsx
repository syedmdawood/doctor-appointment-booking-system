import { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      // Validate user input before making the request
      if (
        !userData.name ||
        !userData.phone ||
        !userData.gender ||
        !userData.dob
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("image", image);

      const { data } = await axios.post(
        "http://localhost:4000/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        // Handle response errors
        toast.error(
          error.response.data.message ||
            "An error occurred while updating your profile."
        );
      } else if (error.request) {
        // Handle request errors
        toast.error(
          "No response received from the server. Please try again later."
        );
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 "
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div className="">
          <p className="text-neutral-500 mt-5 underline">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone: </p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                {" "}
                {/* Change <p> to <div> here */}
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div> // Close <div> here
            ) : (
              <p className="text-gray-500 ">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div className="">
          <p className="text-neutral-500 mt-5 underline">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender: </p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
