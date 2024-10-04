'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import AccomodationImage from "@/components/images/accomodation_main.png"

export default function(){
    return(
        <div>
            <Navbar/>
            <div>
                <div id="AccomodationImage" className="w-full">
                    <Image src={AccomodationImage} alt="main accomodation" className="w-full"/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}