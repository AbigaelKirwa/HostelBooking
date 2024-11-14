'use client'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const db = getFirestore();
            const uid = userCredential.user.uid
    
            //once logged in we have the user id so we use this to get the document id
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('uid', "==", uid))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot.empty){
                //we obtain the first record with matching uid
                const userDoc = querySnapshot.docs[0];
                // console.log("User document data:", userDoc.data()); // Log the user document data
                // console.log("User Document ID:", userDoc.id); // Get the document ID

                // we check if isAdmin field is set to true
                if (userDoc.data().isAdmin) {
                    toast({
                        title: 'Success',
                        description: 'Logged in successfully',
                        variant: "default",
                    });
                    window.location.replace('/admin');
                } 
                else {
                    // If not an admin, sign out
                    await signOut(auth);
                    toast({
                        variant: "destructive",
                        title: "You are not an admin.",
                        description: "There was a problem with authentication",
                        action: <ToastAction altText="try again">Dismiss</ToastAction>,
                    });
                }
                // Clear the input fields after successful login
                setEmail('');
                setPassword('');
            }
        } catch (error: unknown) {
            console.log("Login error:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: "There was a problem with authentication",
                action: <ToastAction altText="try again">Dismiss</ToastAction>,
            });
        }
    };    

    return (
        <div>
            <Navbar />
            <div id="overall" className="flex justify-center py-11">
                <div id="right" className="w-1/3 h-[70vh] px-10 py-5 pt-24 bg-[#EBEBEB] rounded-[40px] max-md:mx-10 max-md:py-20 max-md:pt-28 max-md:w-full">
                    <h1 className="font-bold text-2xl text-[#1E1846]">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5" />
                        </div>
                        <div className="my-5">
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="placeholder-[#767575] text-xs bg-[#D9D9D9] border-none rounded-[8px] w-full py-5 pl-5" />
                        </div>
                        <div>
                            <p className="text-xs text-end">Don't have an account? <Link href="/register"><b>Register</b></Link></p>
                        </div>
                        <div className="w-full flex justify-center mt-8">
                            <Button type="submit" className="bg-[#E24848] text-white font-semibold rounded-full px-12 py-5 hover:bg-teal-700">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
