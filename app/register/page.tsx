'use client'

import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import RegisterImage from "@/components/images/register.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ButtonPink from "@/components/Button"

export default function Register(){

    return(
        <div>
            <Navbar/>
            <div id="overall" className="flex justify-center py-11">
                <div id="main" className="flex w-[68%]">
                    <div id="left" className="w-1/2">
                        <Image src={RegisterImage} alt="main image" className="w-full h-full" />
                    </div>
                    <div id="right" className="px-10 py-5 pt-7 w-1/2 bg-[#EBEBEB] rounded-e-[40px] rounded-r-[40px]">
                        <h1 className="font-bold text-2xl text-[#1E1846]">Register</h1>
                        <form action="">
                            <div className="my-5">
                                <Input type="text" placeholder="Full Name" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="email" placeholder="Email" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="password" placeholder="Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="password" placeholder="Confirm Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-end">Already have an account? <Link href="/login"><b>Login</b></Link></p>
                            </div>
                            <div className="w-full flex justify-center mt-8">
                                <ButtonPink>Register</ButtonPink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
    
}