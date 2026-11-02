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
      <button
        onClick={() =>
          (window.location.href = "mailto:filippogrochala@gmail.com")
        }
        className="relative w-16 h-16 cursor-pointer"
      >
        <Image fill={true} className="" alt="email" src={"mail.svg"}></Image>
      </button>
      <button
        onClick={() => (window.location.href = "https://github.com/FilippoDude")}
        className="relative w-16 h-16 cursor-pointer"
      >
        <Image fill={true} className="" alt="github" src={"github.svg"}></Image>
      </button>
    </div>
  );
};
export default ContactsButtons;
