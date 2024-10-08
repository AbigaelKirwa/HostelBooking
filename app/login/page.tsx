'use client';

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import LoginImage from "@/components/images/login.png";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth"; // Move login to client-side
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { auth } from "@/lib/firebase"; // Import Firebase auth

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: 'Success',
                description: 'Logged in successfully',
                variant: "default"
            });

            // Clear the input fields after successful login
            setEmail('');
            setPassword('');
        } catch (error: any) {
            console.log("Login error:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: "There was a problem with authentication",
                action: <ToastAction altText="try again">Dismiss</ToastAction>,
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div id="overall" className="flex justify-center py-11">
                <div id="main" className="flex flex-row-reverse w-[68%] max-sm:w-full max-sm:px-5">
                    <div id="left" className="w-1/2 max-md:hidden max-md:w-0">
                        <Image src={LoginImage} alt="main image" className="w-full h-full" />
                    </div>
                    <div id="right" className="px-10 py-5 pt-24 w-1/2 bg-[#EBEBEB] rounded-l-[40px] max-md:rounded-[40px] max-md:py-20 max-md:pt-28 max-md:w-full">
                        <h1 className="font-bold text-2xl text-[#1E1846]">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5" />
                            </div>
                            <div className="my-5">
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5" />
                            </div>
                            <div>
                                <p className="text-xs text-end">Don't have an account? <Link href="/register"><b>Register</b></Link></p>
                            </div>
                            <div className="w-full flex justify-center mt-8">
                                <Button type="submit" className="bg-[#E24848] text-white font-semibold rounded-full px-12 py-5 hover:bg-teal-700">Login</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
