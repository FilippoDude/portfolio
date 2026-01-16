"use client";
import Image from "next/image";
const ContactsButtons = () => {
  return (
    <div className=" mt-4 flex flex-row gap-2">
      <button
        onClick={() => (window.location.href = "https://t.me/FIlippodude")}
        className="relative w-16 h-16 cursor-pointer"
      >
        <Image
          fill={true}
          className=""
          alt="telegram"
          src={"telegram.svg"}
        ></Image>
      </button>
      <button className=" relative w-16 h-16 cursor-pointer">
        <Image
          onClick={() =>
            (window.location.href = "https://www.fiverr.com/s/99oGmGa")
          }
          fill={true}
          className=""
          alt="fiverr"
          src={"fiverr.svg"}
        ></Image>
      </button>
      <button className=" relative w-16 h-16 cursor-pointer">
        <Image
          onClick={() =>
            (window.location.href = "https://github.com/FilippoDude")
          }
          fill={true}
          className=""
          alt="fiverr"
          src={"github.svg"}
        ></Image>
      </button>
    </div>
  );
};
export default ContactsButtons;
