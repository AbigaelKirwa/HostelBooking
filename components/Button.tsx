'use client'

import { Button } from "./ui/button"

type ButtonPinkProps = {
    children:React.ReactNode;
    paddingY: string;
    paddingX: string;
}

export default function ButtonPink({children, paddingY, paddingX}:ButtonPinkProps){
    return(
        <>
            <Button className="bg-[#E24848] text-white font-semibold rounded-full px-12 hover:bg-teal-700" style={{paddingTop:paddingY, paddingBottom:paddingY, paddingLeft:paddingX, paddingRight:paddingX}}>{children}</Button>
        </>
    )
}
