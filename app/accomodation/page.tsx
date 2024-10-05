import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Exterior from "@/components/images/exterior.png"
import Interior from "@/components/images/interior.png"
import ButtonPink from "@/components/Button";

export default function(){
    return(
        <div>
            <Navbar/>
            <div>
                <div className="px-20 py-10 flex justify-center items-center max-md:flex-col max-lg:px-5 max-md:gap-5">
                    <div id="image" className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
                        <Image src={Exterior} alt="confused" className="w-[90%]"/>
                    </div>
                    <div id="words" className="w-1/2 flex flex-col justify-center items-center px-10 text-justify gap-10 max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:gap-5 max-md:px-9 max-sm:px-5">
                    <p className="text-sm leading-loose text-[#302F2F]">
                        Qejani Hostels provide a comfortable, secure, and student-focused 
                        living experience. With spacious, fully furnished rooms, 24/7 security, 
                        and high-speed internet, students can enjoy a balanced environment for 
                        both study and relaxation.
                    </p>
                    <div className="flex justify-start w-full">
                        <Link href="#payment_plans"><ButtonPink paddingX="4em" paddingY="2em">View Payment Plans</ButtonPink></Link>
                    </div>
                    </div>
                </div>
                <div className="px-10  flex flex-row-reverse justify-center items-center max-md:flex-col max-lg:px-5 max-md:gap-5">
                    <div id="image" className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
                        <Image src={Interior} alt="confused" className="w-[90%]"/>
                    </div>
                    <div id="words" className="w-1/2 flex flex-col justify-center items-center px-14 text-justify gap-10 max-md:w-full max-md:flex max-md:gap-5 max-md:px-9 max-sm:px-5">
                    <p className="text-sm leading-loose text-[#302F2F]">
                        Qejani Hostels offer students spacious, well-ventilated rooms designed 
                        for comfort and practicality. Each room is fully furnished with a 
                        comfortable bed, study desk, and ample storage space, creating an 
                        environment where students can feel at home while focusing on their 
                        studies. The natural lighting and modern decor add to the welcoming 
                        ambiance, making it an ideal place for rest and productivity.
                    </p>
                    </div>
                </div>
            </div>
            <div id="payment_plans">
                <h2 className="font-bold text-center text-6xl my-10 text-[#1E1846] max-lg:text-5xl max-md:text-3xl max-md:px-10">Our Payment Plans</h2>
            </div>
            <Footer/>
        </div>
    )
}