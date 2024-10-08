'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Exterior from "@/components/images/exterior.png";
import Interior from "@/components/images/interior.png";
import ButtonPink from "@/components/Button";
import { Button } from "@/components/ui/button";

const payments = [
  {
    id: 1,
    bedroom_number: "1-Bedroom",
    month: "Monthly Plan: KES 25,000",
    semester: "Semester Plan (4 months): KES 96,000 (save KES 4,000)",
    anual: "Annual Plan (12 months): KES 285,000 (save KES 15,000)",
    textColor: "black",
    background: "#D9D9D9",
    buttonColor: "#264A5A",
  },
  {
    id: 2,
    bedroom_number: "2-Bedroom",
    month: "Monthly Plan: KES 20,000",
    semester: "Semester Plan (4 months): KES 76,000 (save KES 4,000)",
    anual: "Annual Plan (12 months): KES 225,000 (save KES 15,000)",
    textColor: "black",
    background: "#D9D9D9",
    buttonColor: "#E24848",
  },
  {
    id: 3,
    bedroom_number: "3-Bedroom",
    month: "Monthly Plan: KES 18,000",
    semester: "Semester Plan (4 months): KES 68,000 (save KES 4,000)",
    anual: "Annual Plan (12 months): KES 200,000 (save KES 16,000)",
    textColor: "white",
    background: "#264A5A",
    buttonColor: "#E24848",
  },
  {
    id: 4,
    bedroom_number: "1-Bedroom",
    month: "Monthly Plan: KES 15,000",
    semester: "Semester Plan (4 months): KES 56,000 (save KES 4,000)",
    anual: "Annual Plan (12 months): KES 165,000 (save KES 15,000)",
    textColor: "black",
    background: "#D9D9D9",
    buttonColor: "#264A5A",
  },
];

export default function () {
  return (
    <div>
      <Navbar />
      <div>
        <div className="px-20 py-10 flex justify-center items-center max-md:flex-col max-lg:px-5 max-md:gap-5">
          <div
            id="image"
            className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center"
          >
            <Image src={Exterior} alt="confused" className="w-[90%]" />
          </div>
          <div
            id="words"
            className="w-1/2 flex flex-col justify-center items-center px-10 text-justify gap-10 max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:gap-5 max-md:px-9 max-sm:px-5"
          >
            <p className="text-sm leading-loose text-[#302F2F]">
              The Hostels provide a comfortable, secure, and student-focused
              living experience. With spacious, fully furnished rooms, 24/7
              security, and high-speed internet, students can enjoy a balanced
              environment for both study and relaxation.
            </p>
            <div className="flex justify-start w-full">
              <Link href="#payment_plans">
                <ButtonPink paddingX="4em" paddingY="2em">
                  View Payment Plans
                </ButtonPink>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-10  flex flex-row-reverse justify-center items-center max-md:flex-col max-lg:px-5 max-md:gap-5">
          <div
            id="image"
            className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center"
          >
            <Image src={Interior} alt="confused" className="w-[90%]" />
          </div>
          <div
            id="words"
            className="w-1/2 flex flex-col justify-center items-center px-14 text-justify gap-10 max-md:w-full max-md:flex max-md:gap-5 max-md:px-9 max-sm:px-5"
          >
            <p className="text-sm leading-loose text-[#302F2F]">
              The Hostels offer students spacious, well-ventilated rooms
              designed for comfort and practicality. Each room is fully
              furnished with a comfortable bed, study desk, and ample storage
              space, creating an environment where students can feel at home
              while focusing on their studies. The natural lighting and modern
              decor add to the welcoming ambiance, making it an ideal place for
              rest and productivity.
            </p>
          </div>
        </div>
      </div>
      <div id="payment_plans" className="py-10">
        <h2 className="font-bold text-center text-6xl my-10 text-[#1E1846] max-lg:text-5xl max-md:text-4xl max-md:px-10">
          Our Payment Plans
        </h2>
        <div className="grid grid-cols-2 gap-x-20 gap-y-20 px-20 py-10 justify-center items-center max-lg:grid-cols-1 max-lg:px-40 max-md:px-10">
          {payments.map((payment) => (
            <div key={payment.id} className="flex flex-col gap-y-3 px-10 py-10 rounded-3xl text-sm" style={{background: payment.background, boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.2)", color:payment.textColor}}>
              <h2 className="font-bold text-3xl mb-5">{payment.bedroom_number}</h2>
              <p>{payment.month}</p>
              <p>{payment.semester}</p>
              <p>{payment.anual}</p>
              <div>
                <Link href="/payment"><Button style={{background:payment.buttonColor}} className="text-white text-sm font-semibold rounded-full mt-5 px-[7em] py-[2em] hover:bg-teal-700">Learn More</Button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
