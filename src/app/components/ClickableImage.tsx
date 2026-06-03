"use client";

import { createContext, useState, useContext, useRef } from "react";

export default function ClickableImage({
  src,
  alt = "image",
  customCss = "",
}: {
  src: string;
  alt: string;
  customCss: string;
}) {
  const imagePopUpContext = useImagePopUp();

  const onButtonClick = () => {
    imagePopUpContext.setPopUpImageInfoTo({ src, alt });
    imagePopUpContext.openPopUp();
  };

  return (
    <>
      <button onClick={onButtonClick} className="cursor-pointer">
        <img className={` ${customCss}`} src={src} alt={alt} />
      </button>
    </>
  );
}

interface ImagePopUpImageInfoType {
  src: string;
  alt: string;
}

interface ImagePopUpValue {
  openPopUp: () => void;
  closePopUp: () => void;
  setPopUpImageInfoTo: (imageInfo: ImagePopUpImageInfoType) => void;
}

const ImagePopUpContext = createContext<ImagePopUpValue | undefined>(undefined);

export function ImagePopUpProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<boolean>(false);
  const imageInfoRef = useRef<ImagePopUpImageInfoType>({ src: "", alt: "" });

  const openPopUp = () => {
    setOpen(true);
  };

  const closePopUp = () => {
    setOpen(false);
  };

  const setPopUpImageInfoTo = (imageInfo: ImagePopUpImageInfoType) => {
    imageInfoRef.current = imageInfo;
  };

  return (
    <ImagePopUpContext.Provider
      value={{ openPopUp, closePopUp, setPopUpImageInfoTo }}
    >
      {open ? (
        <>
          <div className="flex items-center justify-center fixed w-full h-full bg-[#0000007c] z-50 backdrop-blur-3xl">
            <div className="flex justify-end flex-col items-end gap-2">
              <button
                onClick={closePopUp}
                className="font-raleway-sans text-6xl font-black bg-[#0000007c] p-4 px-8 rounded-full text-white cursor-pointer"
              >
                X
              </button>
              <img
                className=" max-w-[80vw] max-h-[80vh]"
                src={imageInfoRef.current.src}
                alt={imageInfoRef.current.alt}
              />
            </div>
          </div>
        </>
      ) : null}
      {children}
    </ImagePopUpContext.Provider>
  );
}

export function useImagePopUp() {
  const context = useContext(ImagePopUpContext);
  if (!context) {
    throw new Error("Invalid use of context!");
  }
  return context;
}
