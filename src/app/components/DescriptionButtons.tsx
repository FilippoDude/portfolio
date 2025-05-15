const DescriptionButtons = () => {
    return (
            <div>
                <p className="text-xl w-72 sm:w-fit text-center sm:text-left sm:text-xl mt-2 opacity-60 font-sans text-white">On this page you will find everything you need to know about</p>
                <p className="text-xl w-72 sm:w-fit text-center sm:text-left sm:text-xl font-sans text-white">
                    <button className="group cursor-pointer text-[#E49D53]">me<div className="group-hover:w-full h-0.5 w-0 bg-[#E49D53] duration-100"></div></button>
                    <span className="opacity-80">, my </span>
                    <button className="group cursor-pointer text-[#D87B26]">skills<div className="group-hover:w-full h-0.5 w-0 bg-[#D87B26] duration-100"></div></button>
                    <span className="opacity-80">, and my </span>
                    <button className="group cursor-pointer text-[#425173]">projects<div className="group-hover:w-full h-0.5 w-0 bg-[#425173] duration-100"></div></button>
                </p>
            </div>
    );
}

export default DescriptionButtons