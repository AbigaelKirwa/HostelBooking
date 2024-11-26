'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Questions } from "@/types";
import { useEffect, useState } from "react";
import { getQuestions } from "./action";
import { Skeleton } from "@/components/ui/skeleton"

export default function FAQPage() {
    const [questions, setQuestions] = useState<Questions[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const handleGetQuestions = async () =>{
            const data = await getQuestions() as unknown as Questions[]
            setQuestions(data)
            setLoading(false)
        }
        handleGetQuestions()
    },[])

    return (
    <div>
      <Navbar />
      <div className="flex flex-col px-20 py-14 items-center justify-center max-md:px-10">
      <h2 className="font-bold text-5xl text-[#1E1846] mb-5 max-lg:text-5xl max-md:text-4xl">Common Questions</h2>
        {loading === false ?
        //if questions array exists then display the questions
        questions.map((question:Questions)=>(
        <Accordion type="single" collapsible className="w-1/2 mt-8 max-md:w-full" key={question.id}>
            <AccordionItem value={question.id}>
            <AccordionTrigger className="text-base font-semibold text-[#1E1846]">{question.query}</AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-loose">
                {question.answer}
            </AccordionContent>
            </AccordionItem>
        </Accordion>
        )):
        // if the questions array does not exist then display loader
        (
            <div className="flex flex-col space-y-5">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-200" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-gray-200" />
                    <Skeleton className="h-4 w-[200px] bg-gray-200" />
                </div>
            </div>
        )
        }
      </div>
      <Footer />
    </div>
  );
}
