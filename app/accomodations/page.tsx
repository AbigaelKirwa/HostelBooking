'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { fetchAccomodations } from "./action"
import { Accommodations } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccomodationsPage(){
    const [accomodations, setAccomodations] = useState<Accommodations[]>([]);
    
    useEffect (()=>{
        const getAccomodations = async () =>{
            const data = await fetchAccomodations() as Accommodations[];
            setAccomodations(data);
        };
        getAccomodations();
    },[])

    return(
        <div>
            <Navbar/>
            <div>
                <div>
                    <h2 className="font-bold text-5xl text-[#1E1846] my-5 text-center max-lg:text-5xl max-md:text-4xl">Browse Hostels</h2>
                    {accomodations.length === 0 ?(
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-3 gap-20 py-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
                            <div className="flex flex-col space-y-5">
                                <Skeleton className="h-[125px] w-[300px] rounded-xl bg-gray-200" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px] bg-gray-200" />
                                    <Skeleton className="h-4 w-[200px] bg-gray-200" />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <Skeleton className="h-[125px] w-[300px] rounded-xl bg-gray-200" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px] bg-gray-200" />
                                    <Skeleton className="h-4 w-[200px] bg-gray-200" />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <Skeleton className="h-[125px] w-[300px] rounded-xl bg-gray-200" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px] bg-gray-200" />
                                    <Skeleton className="h-4 w-[200px] bg-gray-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                ): (
                    <div className="grid grid-cols-3 gap-x-14 gap-y-10 px-20 py-10 justify-center items-center max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:px-10">
                        {accomodations.map((accomodation)=>(
                            <div className="rounded-xl" style={{background:accomodation.background}} key={accomodation.id}>
                                <div>
                                    <img src={accomodation.exterior_picture} alt="hostel" className="rounded-t-xl w-full h-[40vh] max-sm:h-[28vh]"/>
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
                )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}