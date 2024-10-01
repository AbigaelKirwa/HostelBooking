'use client'

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"

export default function() {
    return (
        <nav className="w-full flex items-center py-3 bg-gradient-to-r from-[#180F24] via-[#264A5A] to-[#1E1846] px-5">
            <div className="flex justify-center flex-grow">
                <Link href="/" className="font-semibold text-white text-sm px-5">
                    Home
                </Link>
                <Link href="#" className="font-semibold text-white text-sm px-5">
                    Student Accommodations
                </Link>
                <Link href="#footer" className="font-semibold text-white text-sm px-5">
                    Contacts
                </Link>
                <Link href="#" className="font-semibold text-white text-sm px-5">
                    FAQs
                </Link>
            </div>
            <div className="ml-auto">
                <Link href="/login">
                    <Button className="bg-[#E24848] text-white font-semibold rounded-3xl px-7 h-8 hover:bg-teal-700">Login</Button>
                </Link>
            </div>
        </nav>
    )
}
