"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Success() {
    return (
        <>
            <Navbar/>
            <div style={{ height:'40vh', display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
                <h1>Payment Successful!</h1>
                <p>Thank you for your paying. Your payment was processed successfully.</p>
                <Link href="/">
                    <p style={{ color: "#0070f3", textDecoration: "underline", marginTop: "1rem" }}>
                        Return to Home
                    </p>
                </Link>
            </div>
        </>
    );
}
