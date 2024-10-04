'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions=[
    {
        id:"1",
        value:"item-1",
        query:"What types of rooms are available?",
        answer:"We offer a variety of room types across different hostels, including single, double, and shared rooms. Some hostels also have en-suite options."
    },
    {
        id:"2",
        value:"item-2",
        query:"What is included in the rent?",
        answer:"The rent typically covers the cost of accommodation, utility bills (water, electricity, and gas), internet access, and in some cases, laundry services. Please check with the specific hostel for details."
    },
    {
        id:"3",
        value:"item-3",
        query:"How can I book a room?",
        answer:"You can book a room by visiting the profile of your chosen hostel and filling out the booking form. Once your booking is confirmed, you will receive a notification via email."
    },
    {
        id:"4",
        value:"item-4",
        query:"Are meals included in the rent?",
        answer:"Most hostels do not include meals in the rent, but some may have meal plans available at an additional cost. Check the specific hostel for their meal options."
    },
    {
        id:"5",
        value:"item-5",
        query:"What is the cancellation policy?",
        answer:"Cancellation policies vary by hostel. Generally, you can cancel your booking with a full or partial refund, depending on the timing of your cancellation. Please refer to the terms and conditions of your chosen hostel."
    },
    {
        id:"6",
        value:"item-6",
        query:"Is there a curfew in the hostels?",
        answer:"Some hostels may have a curfew, while others offer 24-hour access. You can find curfew details in the hostel’s description."
    },
    {
        id:"7",
        value:"item-7",
        query:"What are the payment options?",
        answer:"Most hostels accept payment via credit card, mobile money, or direct bank transfer. Some hostels may also offer installment payment plans."
    },
    {
        id:"8",
        value:"item-8",
        query:"Are guests allowed to visit?",
        answer:"Guest policies vary by hostel. In most cases, guests are allowed to visit during specific hours, but overnight stays may not be permitted. Please check with your hostel for their visitor policy."
    },
    {
        id:"9",
        value:"item-9",
        query:"Is the hostel safe?",
        answer:"All listed hostels have safety measures in place, including 24/7 security personnel, CCTV surveillance, and secure access systems. Specific safety features may vary by hostel."
    },
    {
        id:"10",
        value:"item-10",
        query:"Can I move in before the official check-in date?",
        answer:"This depends on availability. Please contact the hostel directly to inquire about early check-in options."
    },
]

export default function () {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-20 py-14 items-center justify-center max-md:px-10">
      <h2 className="font-bold text-5xl text-[#1E1846] mb-5 max-lg:text-5xl max-md:text-4xl">Common Questions</h2>
        {questions.map((question:any)=>(
        <Accordion type="single" collapsible className="w-1/2 mt-8 max-md:w-full" key={question.id}>
            <AccordionItem value={question.value}>
            <AccordionTrigger className="text-base font-semibold text-[#1E1846]">{question.query}</AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-loose">
                {question.answer}
            </AccordionContent>
            </AccordionItem>
        </Accordion>
        ))}
      </div>
      <Footer />
    </div>
  );
}
