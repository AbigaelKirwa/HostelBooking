'use client'

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import RegisterImage from "@/components/images/register.png"
import { Input } from "@/components/ui/input"
import { registerUser } from "./action"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/Footer"


export default function Register(){

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {toast} = useToast();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword){
            toast({
                variant:"destructive",
                title:"Uh oh! something went wrong",
                description:"Passwords do not match",
                action:<ToastAction altText="try again">Dismiss</ToastAction>,
            })
            return;
        }
        //call the server action
        const result = await registerUser({fullname, email, password});
        if (result.success){
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            toast({
                title:"Yipee! You're in!",
                description:"Registration was successfull",
            })
        }
        else{
            toast({
                variant:"destructive",
                title:"Uh oh! something went wrong",
                description:"There was a problem with authentication",
                action:<ToastAction altText="try again">Dismiss</ToastAction>,
            })
        }
    }

    return(
        <div>
            <Navbar/>
            <div id="overall" className="flex justify-center py-11">
                <div id="main" className="flex w-[68%] max-sm:w-full max-sm:px-5">
                    <div id="left" className="w-1/2 max-md:hidden max-md:w-0">
                        <Image src={RegisterImage} alt="main image" className="w-full h-full" />
                    </div>
                    <div id="right" className="px-10 py-5 pt-7 w-1/2 bg-[#EBEBEB] rounded-r-[40px] max-md:rounded-[40px] max-md:py-20 max-md:pt-28 max-md:w-full">
                        <h1 className="font-bold text-2xl text-[#1E1846]">Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <Input type="text" value={fullname} onChange={(e)=>setFullName(e.target.value)} required placeholder="Full Name" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Email" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div className="my-5">
                                <Input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required placeholder="Confirm Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-end">Already have an account? <Link href="/login"><b>Login</b></Link></p>
                            </div>
                            <div className="w-full flex justify-center mt-8">
                                <Button type="submit" className="bg-[#E24848] text-white font-semibold rounded-full px-12 py-5 hover:bg-teal-700">Register</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )   
}