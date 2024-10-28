'use client'
import Link from "next/link"
import { useState } from "react"

export default function(){
    const [activeIndex, setActiveIndex] = useState(0)

    const handleClick=(index:number)=>{
        setActiveIndex(index)
    }

    return(
        <div id="sidenav" className="w-1/6 h-[100vh] flex justify-center items-center bg-gradient-to-b from-[#264A5A] to-[#1E1846] text-white text-sm font-semibold">
            <ul className="flex flex-col gap-16 w-full pl-10">
                {['dashboard', 'hostels', 'payments', 'users'].map((item, index)=>(
                <div>
                    <Link href={`${index == 0 ? '/admin/': `/admin/${item}`} `}>
                        <li 
                        key={index} 
                        onClick={()=>handleClick(index)}
                        className={`w-full cursor-pointer p-3 pl-6 rounded-l-3xl transition-colors duration-200 ${
                            activeIndex === index 
                            ? 'bg-white text-gray-800'
                            : 'hover:bg-gray-600 hover:text-white'
                        }`}
                        >
                            {item}
                        </li>
                    </Link>
                </div>
                ))}
            </ul>
        </div>

    )
}