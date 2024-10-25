'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AccomodationImage from "@/components/images/accomodation_main.png"
import { useState, useEffect } from "react"
import { fetchAccomodations } from "./action"
import { Accommodations } from "@/types"

export default function(){

    const [accomodations, setAccomodations] = useState<Accommodations[]>([]);
    useEffect (()=>{
        const getAccomodations = async () =>{
            const data:any = await fetchAccomodations();
            setAccomodations(data);
        };
        getAccomodations();
    },[])

    return(
        <div>
            <Navbar/>
            <div>
                <div id="AccomodationImage" className="w-full">
                    <Image src={AccomodationImage} alt="main accomodation" className="w-full h-[90vh] max-md:h-[60vh]"/>
                </div>
                {accomodations.length === 0 ?(
                    <p>No Accomodations available</p>
                ):
                <div>
                    <h2 className="font-bold text-5xl text-[#1E1846] my-5 text-center max-lg:text-5xl max-md:text-4xl">Browse Hostels</h2>
                    <div className="grid grid-cols-3 gap-x-14 gap-y-10 px-20 py-10 justify-center items-center max-lg:grid-cols-2 max-md:grid-cols-1">
                        {accomodations.map((accomodation)=>(
                            <div className="rounded-xl" style={{background:accomodation.background}} key={accomodation.id}>
                                <div>
                                    <img src={accomodation.exterior_picture} alt="hostel" className="rounded-t-xl w-full h-[40vh]"/>
                                </div>
                                <div className="py-3 px-10">
                                    <div className="flex flex-col gap-y-5 mt-5 text-sm" style={{color:accomodation.text_color}}>
                                        <p>Name: <b>{accomodation.name}</b></p>
                                        <p>City: <b>{accomodation.city}</b></p>
                                        <p>Location: <b>{accomodation.location}</b></p>
                                    </div>
                                    <div className="w-full my-8">
                                        <Link href={`/accomodation/${accomodation.id}`}><Button style={{background:accomodation.button_color}} className="text-white text-sm font-semibold rounded-full w-full py-[1.5em] hover:bg-teal-700">Learn More</Button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                }
            </div>
            <Footer/>
        </div>
    )
}