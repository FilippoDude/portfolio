"use client";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";
type NavigationButtonType = { name: string; link: string; customLink: boolean };
const navigationButtons: NavigationButtonType[] = [
  { name: "Home", link: "/", customLink: false },
  { name: "3d Laptop", link: "/cool", customLink: false },
  {
    name: "Widgets Crate",
    link: "https://widgetscrate.filippodude.com/download",
    customLink: true,
  },
  { name: "3D Game Demo", link: "/game", customLink: false },
];
const NavigationMenu = ({
  innerRef,
  hideMenu,
}: {
  innerRef: React.Ref<HTMLDivElement>;
  hideMenu: () => void;
}) => {
  return (
    <div
      ref={innerRef}
      className="w-screen md:w-70 h-full bg-[#42517340] backdrop-blur-2xl flex flex-col items-center pt-4 gap-1"
    >
      {navigationButtons.map((e, i) => {
        return (
          <div
            className="relative max-w-9/10 w-9/10 py-2"
            onClick={hideMenu}
            key={i}
          >
            <Link
              href={e.link}
              key={i}
              className="cursor-pointer relative text-white z-60 flex items-center w-full h-full group"
            >
              <div className="absolute w-full h-full"></div>
              <div className="relative w-6 h-6 group-hover:translate-x-1 duration-100">
                <svg
                  width="18"
                  height="24"
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-white group-hover:stroke-yellow-400 transition-colors duration-300"
                >
                  <path
                    d="M4.7168 6.24512C4.51743 6.11221 4.25 6.25551 4.25 6.49512V17.5049C4.25 17.7144 4.4541 17.8501 4.63867 17.792L4.7168 17.7549L13.3486 12L4.7168 6.24512Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="relative w-full flex flex-col gap-1 items-start pr-4">
                <p className="pl-2 font-bold">{e.name}</p>
                <div className="w-full min-h-0.5 h-0.5 bg-[#FFFFFFBB] rounded-2xl group-hover:bg-yellow-400 transition-colors duration-300"></div>
              </div>
            </Link>
          </div>
        );
      })}
      <div className=" absolute w-full bottom-0 left-0 flex md:hidden items-center flex-col gap-2 pb-2 backdrop-blur-xl">
        <div className="w-full min-h-0.5 h-1 bg-[#FFFFFFBB] rounded-4xl transition-colors duration-300"></div>
        <button className="w-full h-full cursor-pointer" onClick={hideMenu}>
          <p className="text-white text-2xl font-bold">Hide</p>
        </button>
      </div>
    </div>
  );
};

const NavigationButton = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const obscuratorRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    hideMenu(true);
    const onResize = () => {
      hideMenu();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const showMenu = () => {
    if (ref.current == null || obscuratorRef.current == null) return;
    document.body.style.overflow = "hidden";
    gsap.to(ref.current, {
      left: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(obscuratorRef.current, {
      opacity: 0.5,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const hideMenu = (instant: boolean = false) => {
    if (
      ref.current == null ||
      obscuratorRef.current == null ||
      menuRef.current == null
    )
      return;
    document.body.style.overflow = "";
    let fullscreen = false;
    if (containerRef.current != null && containerRef.current.clientWidth < 768)
      fullscreen = true;
    gsap.to(ref.current, {
      left: fullscreen ? -menuRef.current.clientWidth : -280,
    });
    gsap.to(obscuratorRef.current, {
      opacity: 0,
      duration: instant ? 0 : 0.3,
      ease: "power2.out",
    });
  };
  const toggleMenu = () => {
    if (ref.current == null || obscuratorRef.current == null) return;
    console.log(ref.current.style.left);
    if (ref.current.style.left == "0px") {
      hideMenu();
    } else {
      showMenu();
    }
  };
  const onMouseEnter = () => {
    if (containerRef.current != null && containerRef.current.clientWidth < 768)
      return;
    showMenu();
  };

  const onMouseLeave = () => {
    if (containerRef.current != null && containerRef.current.clientWidth < 768)
      return;
    hideMenu();
  };

  const onClick = () => {
    toggleMenu();
  };

  return (
    <div
      ref={containerRef}
      className="fixed w-full h-full z-60 left-0 top-0 pointer-events-none"
    >
      <div
        ref={obscuratorRef}
        className="bg-[#000000] opacity-0 w-full h-full pointer-events-none"
      />
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="absolute top-0 -left-999 flex flex-row h-full pointer-events-auto"
      >
        <NavigationMenu innerRef={menuRef} hideMenu={hideMenu}></NavigationMenu>
        <button
          onClick={onClick}
          className={`mt-2 w-10 h-20 bg-[#42517340] rounded-r-2xl backdrop-blur-2xl cursor-pointer md:cursor-default`}
        >
          <Image
            alt="Double right arrows"
            src={"/doubleArrowRight.svg"}
            fill={true}
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default NavigationButton;
