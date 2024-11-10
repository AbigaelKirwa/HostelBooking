'use client'
import SideNavbar from "@/components/admin/SideNavbar"
import AdminSummary from "@/components/admin/AdminSummary"
import { useEffect, useState } from "react"
import Dashboard from "@/components/admin/Dashboard"
import Users from "@/components/admin/Users"
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from "@/lib/firebase"
import Navbar from "@/components/Navbar"
import Payment from "@/components/admin/Payment"


export default function(){
    const [displayContent, setDisplayContent] = useState<any>(<Dashboard />); // Set initial content to Dashboard
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //check if user is an admin
        const checkAdmin = async ()=>{
            const unsubscribe = onAuthStateChanged(auth, async(user)=>{
                if(user){
                    const db = getFirestore()
                    const usersCollection= collection(db, 'users')
                    const q = query(usersCollection, where ('uid', '==', user.uid))
                    const querySnapshot = await getDocs(q);


                    if(!querySnapshot.empty){
                        const userDoc = querySnapshot.docs[0];
                        if(userDoc.exists() && userDoc.data().isAdmin){
                            setIsAdmin(true)
                        }
                        else{
                            window.location.replace('/admin/login')
                        }
                    }
                    else{
                        window.location.replace('/admin/login')
                    }
                }
                else{
                    window.location.replace('/admin/login')
                }
                setIsLoading(false)
            })
            return unsubscribe;
        };

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
            else {
                setDisplayContent(<Dashboard />)
            } 
        };

        // Initialize on mount and on hash changes
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        checkAdmin();

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };

    }, []); // Only need to run this effect once

    if (isLoading) {
        return <p>Loading...</p>; // Display loading message while checking admin status
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
    ):<><p>nothing to be shown</p></>
}
