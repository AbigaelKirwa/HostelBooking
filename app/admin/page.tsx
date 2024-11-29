'use client'
import SideNavbar from "@/components/admin/SideNavbar"
import AdminSummary from "@/components/admin/AdminSummary"
import React, { useEffect, useState } from "react"
import Dashboard from "@/components/admin/Dashboard"
import Users from "@/components/admin/Users"
import Payment from "@/components/admin/Payment"
import { confirmAdmin } from "@/hooks/confirmAdmin"
import AccomodationsRead from "@/components/admin/AccomodationsRead"
import QuestionsPage from "@/components/admin/QuestionsRead"
import { Skeleton } from "@/components/ui/skeleton"

const loadingElements = ()=>{
    return(
        <div className="flex">
            <div id="side-bar" className="w-1/4 bg-gray-300"></div>
            <div id="main" className="w-3/4 items-center p-10 gap-5">
                <div className="grid grid-cols-3 justify-center items-center gap-x-20 mb-20">
                    <div className="w-full">
                        <Skeleton className="h-32 rounded-xl bg-gray-200" />
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-32 rounded-xl bg-gray-200" />
                    </div>
                    <div className="w-full">
                        <Skeleton className="h-32 rounded-xl bg-gray-200" />
                    </div>
                </div>
                <div className="flex flex-col justify-center w-full gap-y-5">
                    <div className="flex w-full justify-center items-center">
                        <Skeleton className="h-20 w-full rounded-xl bg-gray-200 max-sm:w-full" />
                    </div>
                    <div className="flex flex-col space-y-2 w-full items-center">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                    </div>
                    <div className="flex w-full justify-center items-center">
                        <Skeleton className="h-20 w-full rounded-xl bg-gray-200 max-sm:w-full" />
                    </div>
                    <div className="flex flex-col space-y-2 w-full items-center">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage(){
    const [displayContent, setDisplayContent] = useState<React.ReactNode>(<Dashboard />); // Set initial content to Dashboard
    const {isAdmin, isLoading} = confirmAdmin();

    useEffect(() => {       
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            // Dynamically set content based on the current hash
            console.log("Current hash:", hash); // Check the current hash
            if(hash === "users"){
                setDisplayContent(<Users />)
            }
            else if(hash === "payments"){
                setDisplayContent(<Payment />)
            }
            else if(hash === "hostels"){
                setDisplayContent(<AccomodationsRead/>)
            }
            else if(hash === 'questions'){
                setDisplayContent(<QuestionsPage/>)
            }
            else {
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

    }, []); // Only need to run this effect once

    confirmAdmin()

    if (isLoading) {
        return loadingElements(); // Display loading message while checking admin status
    }   

    return isAdmin?(
        <div className="h-screen overflow-y-auto">
            <div id="overall" className="flex">
                <SideNavbar />
                <div id="main_info" className="px-20 pt-7">
                    <AdminSummary />
                    {displayContent}
                </div>
            </div>
        </div>
    ):(loadingElements())
}
