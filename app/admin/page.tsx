'use client'
import SideNavbar from "@/components/SideNavbar"
import AdminSummary from "@/components/AdminSummary"

export default function(){

    return(
        <div>
            <div id="overall" className="flex">
                <SideNavbar></SideNavbar>
                <div id="main_info" className="px-20 py-7">
                    <AdminSummary/>
                </div>
            </div>
        </div>
    )
}