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
      <div className="flex flex-col px-20 py-14 items-center justify-center max-lg:px-10">
      <h2 className="font-bold text-center text-5xl text-[#1E1846] mb-5 max-lg:text-5xl max-md:text-4xl max-sm:leading-relaxed">Common Questions</h2>
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
            <div className="flex flex-col space-y-5 w-full items-center">
                <Skeleton className="h-20 w-1/2 rounded-xl bg-gray-200 max-sm:w-full" />
                <div className="flex flex-col space-y-2 w-full items-center">
                    <Skeleton className="h-4 w-1/2 bg-gray-200 max-sm:w-full" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200 max-sm:w-full" />
                </div>
                <Skeleton className="h-20 w-1/2 rounded-xl bg-gray-200 max-sm:w-full" />
                <div className="flex flex-col space-y-2 w-full items-center max-sm:w-full">
                    <Skeleton className="h-4 w-1/2 bg-gray-200 max-sm:w-full" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200 max-sm:w-full" />
                </div>
            </div>
        )
        }
      </div>
      <Footer />
    </div>
  );
}
