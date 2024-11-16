'use client'

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminSummaryPage(){
    const [counts, setCounts] = useState({
        hostels: 0,
        payments: 0,
        users: 0
    });

    // Fetch data from Firebase
    useEffect(() => {
        const fetchCounts = async () => {
            const hostelsSnapshot = await getDocs(collection(db, "accomodations"));
            const paymentsSnapshot = await getDocs(collection(db, "payments"));
            const usersSnapshot = await getDocs(collection(db, "users"));

            setCounts({
                hostels: hostelsSnapshot.size,
                payments: paymentsSnapshot.size,
                users: usersSnapshot.size
            });
        };
        fetchCounts();
    }, []);
    const summaries=[
        {
            id:1,
            genre:"Hostels",
            number:counts.hostels,
            icon: MdOutlineShoppingCart,
            arrow: FaArrowTrendUp,
            circleColor:"#B5FFCE",
            textColor:"#43BE83",
            percentage:+15
        },
        {
            id:2,
            genre:"Payments",
            number:counts.payments,
            icon: BsGraphUpArrow,
            arrow: FaArrowTrendDown,
            circleColor:"#FFD9D7",
            textColor:"#EA8F95",
            percentage:-3.5
        },
        {
            id:3,
            genre:"Users",
            number:counts.users,
            icon: FaRegUser,
            arrow: FaArrowTrendUp,
            circleColor:"#B5FFCE",
            textColor:"#43BE83",
            percentage:+15
        },
    ]
    return(
        <>
            <div id="summary_data" className="flex gap-10">
                {summaries.map((summary)=>(
                    <div className="flex flex-col gap-3 border-[1.5px] rounded-xl px-5 py-3" key={summary.id}>
                        <div className="flex items-center gap-40">
                            <div>
                                <span className="text-[#797D8C] text-sm font-semibold">{summary.genre}</span><br/>
                                <span className="text-[#04103B] text-3xl font-semibold">{summary.number}</span>
                            </div>
                            <div className="font-semibold text-xl">
                                <summary.icon />
                            </div>
                        </div>
                        <div className="flex items-center gap-2" style={{color:summary.textColor}}>
                            <div className="rounded-full p-1 text-sm" style={{backgroundColor:summary.circleColor}}>
                                <summary.arrow />
                            </div>
                            <div className="flex justify-center align-middle">
                                <p className="text-sm font-semibold">{summary.percentage}%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}