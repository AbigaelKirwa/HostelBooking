'use client'

import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import LoginImage from "@/components/images/login.png"
import { Input } from "@/components/ui/input"
import ButtonPink from "@/components/Button"

export default function Register(){

    return(
        <div>
            <Navbar/>
            <div id="overall" className="flex justify-center py-11">
                <div id="main" className="flex flex-row-reverse w-[68%]">
                    <div id="left" className="w-1/2  max-md:hidden max-md:w-0">
                        <Image src={LoginImage} alt="main image" className="w-full h-full" />
                    </div>
                    <div id="right" className="px-10 py-5 pt-24 w-1/2 bg-[#EBEBEB] rounded-l-[40px] max-md:rounded-[40px] max-md:py-20 max-md:pt-28 max-md:w-full">
                        <h1 className="font-bold text-2xl text-[#1E1846]">Login</h1>
                        <form action="">
                            <div className="my-5">
                                <Input type="email" required placeholder="Email" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="password" required placeholder="Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-end">Don't have an account? <Link href="/register"><b>Register</b></Link></p>
                            </div>
                            <div className="w-full flex justify-center mt-8">
                                <ButtonPink paddingY="1.5em" paddingX="3.5em">Login</ButtonPink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}