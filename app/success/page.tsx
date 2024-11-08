"use client";
import ButtonPink from "@/components/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Success() {
    return (
        <>
            <Navbar/>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
                <h1 className="text-2xl font-semibold">Payment Successful!</h1>
                <p className="text-sm mt-5 text-slate-800">Thank you for your paying. Your payment was processed successfully.</p>
                <Link href="/" className="mt-5">
                    <ButtonPink paddingX="3em" paddingY="1.8em" >Return to Home</ButtonPink>
                </Link>
                <img src="/images/success.svg" alt="win" className="w-1/3" />
            </div>
            <Footer/>
        </>
    );
}
