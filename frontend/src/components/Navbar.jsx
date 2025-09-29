import React from 'react'
import { IoMdSunny } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { TbSettingsFilled } from "react-icons/tb";

const Navbar = () => {
    return (
        <>
            <div className="nav flex items-center justify-between px-[100px] h-[70px] border-b-[1px] border-gray-800">
                <div className="logo text-3xl font-bold ml-[50px] sp-text">UI-X</div>
                <div className='icons flex items-center gap-[15px]'>
                    <div className='icon'> <FaUser /> </div>
                    <div className='icon'> <TbSettingsFilled /> </div>
                    <div className='icon'> <IoMdSunny /> </div>

                </div>
            </div>
        </>
    )
}

export default Navbar