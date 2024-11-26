'use client'

import { User } from "firebase/auth";
import { onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "@/lib/firebase"
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export const userAuthState = () =>{
    const [user, setUser] = useState<User|null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          // console.log("Auth state changed. Current user:", currentUser);
          if (currentUser) {
            setUser(currentUser);
          } else {
            setUser(null);
            console.log("No user is authenticated.");
          }
        });
    
        // You can call onAuthStateChanged manually after login to ensure the UI updates
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // Update the user state immediately after login
            setUser(user);
          }
        });
      
        return () => unsubscribe();
      }, []);
    
      const getInitials = (user: User | null) => {
        if (!user) return "";
    
        const name = user.displayName || user.email || "";
        const nameArray = name.split(/[@ ]/); // Split by space or @ for email
    
        if (nameArray.length > 1) {
          return (nameArray[0][0] + nameArray[1][0]).toUpperCase();
        } else {
          return nameArray[0][0].toUpperCase(); // First letter of displayName or email
        }
      };
    
      const handleSignOut = async () => {
        try {
          await signOut(auth);
          // Sign out successful
          setUser(null);
          toast({
            title: 'Success',
            description: 'Logged out successfully',
            variant: "default"
          });
        } catch {
          // Error occurred
          toast({
            variant: "destructive",
            title: "Uh oh! something went wrong",
            description: "There was a problem logging you out",
          });
        }
    };
    return{
        user,
        getInitials,
        handleSignOut
    }
} 