'use client'

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import ButtonPink from "./Button"

export default function() {
    return (
        <nav className="w-full flex items-center py-3 bg-gradient-to-r from-[#180F24] via-[#264A5A] to-[#1E1846] px-5">
            <div className="flex justify-center flex-grow">
                <Link href="/" className="font-semibold text-white text-xs px-5">
                    Home
                </Link>
                <Link href="#" className="font-semibold text-white text-xs px-5">
                    Student Accommodations
                </Link>
                <Link href="#footer" className="font-semibold text-white text-xs px-5">
                    Contacts
                </Link>
                <Link href="#" className="font-semibold text-white text-xs px-5">
                    FAQs
                </Link>
            </div>
            <div className="ml-auto ">
                <Link href="/login">
                    <ButtonPink paddingY="1px" paddingX="2em"><span className="text-xs">Login</span></ButtonPink>
                </Link>
            </div>
        </nav>
    )
}
