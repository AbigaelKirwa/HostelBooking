'use client'

import { useState } from "react"

export default function SideNavbarPage(){
    const [highlight, setHighlight] = useState<string>("dashboard")

    const handleNavigation = (item:string)=>{
        //directly set window location
        window.location.hash = item;
        setHighlight(item)
    }

    return(
        <div id="sidenav" className="w-1/6 h-[100vh] flex justify-center items-center bg-gradient-to-b from-[#264A5A] to-[#1E1846] text-white text-sm font-semibold">
            <ul className="flex flex-col gap-16 w-full pl-10">
                {['dashboard', 'hostels', 'payments', 'users'].map((item, index)=>(
                <div key={index}>
                    <li 
                    key={index} 
                    onClick={()=>handleNavigation(item)}
                    className={`w-full cursor-pointer p-3 pl-6 rounded-l-3xl transition-colors duration-200 ${
                        highlight === item 
                        ? 'bg-white text-gray-800'
                        : 'hover:bg-gray-600 hover:text-white'
                    }`}
                    >
                        {item}
                    </li>
                </div>
                ))}
            </ul>
        </div>

    )
}