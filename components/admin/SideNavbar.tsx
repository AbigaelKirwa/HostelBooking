'use client'

import { useState } from "react"
import { userAuthState } from "../UserAuthState"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import ButtonPink from "../Button"


export default function SideNavbarPage(){
    const [highlight, setHighlight] = useState<string>("dashboard")
    const {user, getInitials, handleSignOut} = userAuthState()

    const handleNavigation = (item:string)=>{
        //directly set window location
        window.location.hash = item;
        setHighlight(item)
    }

    return(
        <div id="sidenav" className="w-1/6 h-[100vh] flex flex-col justify-center items-center bg-gradient-to-b from-[#264A5A] to-[#1E1846] text-white text-sm font-semibold">
            <div className="flex justify-center mb-16">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <div className="flex items-center gap-2">Welcome 
                        <div className="w-10 h-10 bg-[#E24848] text-white font-semibold flex items-center justify-center rounded-full">
                            {getInitials(user)}
                        </div>
                        </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuLabel onClick={handleSignOut} className="cursor-pointer">Logout</DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>        
                    ):(
                    <Link href="/login">
                    <ButtonPink paddingY="1px" paddingX="2em">
                        <span className="text-xs">Login</span>
                    </ButtonPink>
                    </Link>
                )}
            </div>
            <ul className="flex flex-col gap-8 w-full pl-10">
                {['dashboard', 'hostels', 'payments', 'users', 'questions'].map((item, index)=>(
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