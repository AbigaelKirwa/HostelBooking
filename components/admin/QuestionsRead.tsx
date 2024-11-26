'use client'

import { fetchQuestions } from "./QuestionsActions"
import { Questions } from "@/types"
import { useEffect, useState } from "react"
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function QuestionsPage(){
    const [questions, setQuestions] = useState<Questions[]>([])
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const pageSize = 5; // Number of users per page

    useEffect(()=>{
        const getQuestions = async () =>{
            const data = await fetchQuestions() as unknown as Questions[];
            if (data) setQuestions(data)
        }
        getQuestions();
    }, [])

    // Calculate the users to display for the current page
    const indexOfLastQuestion= currentPage * pageSize;
    const indexOfFirstQuestion = indexOfLastQuestion - pageSize;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const totalPages = Math.ceil(questions.length/pageSize)

    // Handler functions for pagination
    const nextPage = () => {
        if (currentPage < Math.ceil(questions.length / pageSize)) {
        setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return(
        <div id="users" className="mt-5">
            <div className="flex gap-5">
                <h2 className="text-sm text-[#04103B] font-bold">Accomodations</h2>
                {/* <AccomodationsCreate onRefresh ={fetchAndSetAccomodations}/> */}
            </div>
            <div id="display_data" className="mt-5">
                <table className="w-full border-[1.5px] border-[#EBE8FF] rounded-xl text-xs">
                    <thead className="bg-[#F3F4F6]">
                        <tr className="text-[#797D8C] font-semibold">
                            <th className="p-3">Question ID</th>
                            <th className="p-3">Value</th>
                            <th className="p-3">Query</th>
                            <th className="p-3">Answer</th>
                            <th className="p-3">Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.map((question, index) => (
                            <tr key={index} className="border-b-[1.5px] border-[#EBE8FF] text-center">
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {question.id.length > 12 ? `${question.id.substring(0, 12)}...` : question.id}
                                </td>
                                <td className="p-3 text-[#04103B] font-bold">
                                    {question.value}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {question.query.length > 10 ? `${question.query.substring(0, 30)}...` : question.query}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                {question.answer.length > 12 ? `${question.answer.substring(0, 30)}...` : question.answer}
                                </td>
                                <td>
                                    <button className="bg-blue-500 text-white py-2 px-3 mr-3 rounded hover:bg-blue-800 transition-colors my-2">Update</button>
                                    <button className="bg-red-500 text-white py-2 px-3.5 rounded hover:bg-red-800 transition-colors mb-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls mt-4 flex justify-center gap-4">
                <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="text-sm text-[#04103B] font-bold"
                >
                <FaArrowCircleLeft />
                </button>
                <span className="text-sm text-[#04103B]">Page <b>{currentPage}</b> of <b>{totalPages}</b> </span>
                <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(questions.length / pageSize)}
                className="text-sm text-[#04103B] font-bold"
                >
                <FaArrowCircleRight />
                </button>
            </div>
        </div>
    )
}