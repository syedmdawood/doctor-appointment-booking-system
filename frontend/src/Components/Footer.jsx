import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        {/* ---------- Left Section --------- */}
        <div className="">
          <img src={assets.logo} alt="" className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            alias atque dolores nisi vel. Fugit ab delectus, sed pariatur est
            expedita fugiat eius cum at?
          </p>
        </div>

        {/* ---------- Center Section --------- */}
        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contct Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ---------- Right Section --------- */}
        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-333-4443</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ---------- Copyright Text --------- */}
      <div className="">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Prescripto - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
