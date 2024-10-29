'use client'
import SideNavbar from "@/components/admin/SideNavbar"
import AdminSummary from "@/components/admin/AdminSummary"
import { useState } from "react"
import Dashboard from "@/components/admin/Dashboard"


export default function(){
    const [activeIndex, setActiveIndex] = useState<number>(0)
    return(
        <div className="h-screen overflow-y-auto">
            <div id="overall" className="flex">
                <SideNavbar activeIndex={activeIndex} setActiveIndex={setActiveIndex}></SideNavbar>
                <div id="main_info" className="px-20 pt-7">
                    <AdminSummary/>
                    {
                        activeIndex == 0 ? <Dashboard/>:null
                    }
                </div>
            </div>
        </div>
    )
}