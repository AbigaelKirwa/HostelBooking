'use client'
import SideNavbar from "@/components/admin/SideNavbar"
import AdminSummary from "@/components/admin/AdminSummary"
import { useEffect, useState } from "react"
import Dashboard from "@/components/admin/Dashboard"
import Users from "@/components/admin/Users"

export default function(){
    const [displayContent, setDisplayContent] = useState<any>(<Dashboard />); // Set initial content to Dashboard

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            // Dynamically set content based on the current hash
            console.log("Current hash:", hash); // Check the current hash
            if(hash === "users"){
                setDisplayContent(<Users />)
            } else {
                setDisplayContent(<Dashboard />)
            } 
        };

        // Initialize on mount and on hash changes
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [window.location.hash]); // Only need to run this effect once

    return (
        <div className="h-screen overflow-y-auto">
            <div id="overall" className="flex">
                <SideNavbar />
                <div id="main_info" className="px-20 pt-7">
                    <AdminSummary />
                    {displayContent}
                </div>
            </div>
        </div>
    )
}
