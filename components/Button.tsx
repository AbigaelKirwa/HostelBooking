'use client'

import { Button } from "./ui/button"

export default function ButtonPink({children}:{children:React.ReactNode}){
    return(
        <>
            <Button className="bg-[#E24848] text-white font-semibold rounded-3xl px-12 py-5 hover:bg-teal-700">{children}</Button>
        </>
    )
}