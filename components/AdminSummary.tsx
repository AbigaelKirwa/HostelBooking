'use client'

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

export default function(){
    const summaries=[
        {
            id:1,
            genre:"Hostels",
            number:100,
            icon: MdOutlineShoppingCart,
            arrow: FaArrowTrendUp,
            circleColor:"#B5FFCE",
            textColor:"#43BE83",
            percentage:+15
        },
        {
            id:2,
            genre:"Payments",
            number:200,
            icon: BsGraphUpArrow,
            arrow: FaArrowTrendDown,
            circleColor:"#FFD9D7",
            textColor:"#EA8F95",
            percentage:-3.5
        },
        {
            id:3,
            genre:"Users",
            number:120,
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
                            <div className="font-semibold text-2xl">
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