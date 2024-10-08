"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from "next/link";
import ButtonPink from "./Button";
import Image from "next/image";
import MenuImage from "@/components/images/icons/menu.png"
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "@/lib/firebase"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast";


export default function Navbar() {

  const [user, setUser]= useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser);
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
        console.log("user details updated", user)
      }
    });
  
    return () => unsubscribe();
  }, []);

  const getInitials = (user: any) => {
    if (!user) return "";

    const name = user.displayName || user.email;
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
    } catch (error) {
      // Error occurred
      toast({
        variant: "destructive",
        title: "Uh oh! something went wrong",
        description: "There was a problem logging you out",
      });
    }
  };
  
  return (
    <nav className="w-full flex items-center py-3 bg-gradient-to-r from-[#180F24] via-[#264A5A] to-[#1E1846] px-5">
      {/* this is the navbar on large screens */}
      <div className="flex justify-center flex-grow max-md:hidden">
        <Link href="/" className="font-semibold text-white text-xs px-5">
          Home
        </Link>
        <Link
          href="/accomodations"
          className="font-semibold text-white text-xs px-5"
        >
          Accommodations
        </Link>
        <Link href="#footer" className="font-semibold text-white text-xs px-5">
          Contacts
        </Link>
        <Link href="/faqs" className="font-semibold text-white text-xs px-5">
          FAQs
        </Link>
      </div>

      {/* this is the navbar on small screens */}
      <div className="md:hidden block">
        <Sheet>
          <SheetTrigger asChild>
            <Image src={MenuImage} alt="opener" className="w-6"/>
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-white text-[#2e2e2e]">
            <SheetHeader>
              <SheetTitle className="text-2xl">Menu</SheetTitle>
            </SheetHeader>
            <div className="grid py-10 -mx-5">
                <div className="flex flex-col gap-y-10 ">
                    <Link href="/" className="font-semibold text-sm px-5">Home</Link>
                    <Link href="/accomodations" className="font-semibold text-sm px-5">Accommodations</Link>
                    <Link href="#footer" className="font-semibold text-sm px-5">Contacts</Link>
                    <Link href="/faqs" className="font-semibold text-sm px-5">FAQs</Link>
                </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="ml-auto ">
      {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-500 text-white font-semibold flex items-center justify-center rounded-full">
                {getInitials(user)}
              </div>
            </div>
            </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel onClick={handleSignOut} className="cursor-pointer">Logout</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>        
        ):(
        <Link href="/login">
          <ButtonPink paddingY="1px" paddingX="2em">
            <span className="text-xs">Login</span>
          </ButtonPink>
        </Link>
        )}
      </div>
    </nav>
  );
}
