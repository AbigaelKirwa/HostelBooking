"use client";
import ButtonPink from "@/components/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Cancel() {
    return (
        <>
        <Navbar/>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
            <h1 className="text-2xl font-semibold">Payment Canceled</h1>
            <p className="text-sm mt-5 text-slate-800">Your payment was not completed. You can try again if you wish.</p>
            <Link href="/accomodations" className="mt-5">
                <ButtonPink paddingX="3em" paddingY="1.8em" >Return to Accomodations</ButtonPink>
            </Link>
            <img src="/images/cancel.svg" alt="win" className="w-1/3" />
        </div>
        <Footer/>
        </>
    );
}
