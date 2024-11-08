"use client";
import Link from "next/link";

export default function Cancel() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
            <h1>Payment Canceled</h1>
            <p>Your payment was not completed. You can try again if you wish.</p>
            <Link href="/">
                <a style={{ color: "#0070f3", textDecoration: "underline", marginTop: "1rem" }}>
                    Return to Home
                </a>
            </Link>
        </div>
    );
}
