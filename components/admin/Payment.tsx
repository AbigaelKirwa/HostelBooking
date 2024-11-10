'use client'

import { fetchPayments } from "./PaymentAction"
import { Payments } from "@/types"
import { useEffect, useState } from "react"
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function(){
    const [payments, setPayments] = useState<Payments[]>([])
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const pageSize = 6; // Number of users per page

    useEffect(()=>{
        const getPayments = async () =>{
            const data:any = await fetchPayments();
            if (data) setPayments(data)
        }
        getPayments();
    }, [])

    // Calculate the users to display for the current page
    const indexOfLastPayment= currentPage * pageSize;
    const indexOfFirstPayment = indexOfLastPayment - pageSize;
    const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);
    const totalPages = Math.ceil(payments.length/pageSize)

    // Handler functions for pagination
    const nextPage = () => {
        if (currentPage < Math.ceil(payments.length / pageSize)) {
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
            <h2 className="text-sm text-[#04103B] font-bold">Payments</h2>
            <div id="display_data" className="mt-5">
                <table className="w-full border-[1.5px] border-[#EBE8FF] rounded-xl text-xs">
                    <thead className="bg-[#F3F4F6]">
                        <tr className="text-[#797D8C] font-semibold">
                            <th className="p-3">Payment ID</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">User ID</th>
                            <th className="p-3">User Name</th>
                            <th className="p-3">Accommodation ID</th>
                            <th className="p-3">Accommodation Name</th>
                            <th className="p-3">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPayments.map((payment, index) => (
                            <tr key={index} className="border-b-[1.5px] border-[#EBE8FF] text-center">
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {payment.paymentId.length > 12 ? `${payment.paymentId.substring(0, 12)}...` : payment.paymentId}
                                </td>
                                <td className="p-3 text-[#04103B] font-bold">
                                    {payment.amount}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {payment.userId.length > 10 ? `${payment.userId.substring(0, 10)}...` : payment.userId}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {payment.userName}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                {payment.accomodationId.length > 12 ? `${payment.accomodationId.substring(0, 12)}...` : payment.accomodationId}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {payment.accomodationName}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {payment.createdAt}
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
                disabled={currentPage === Math.ceil(payments.length / pageSize)}
                className="text-sm text-[#04103B] font-bold"
                >
                <FaArrowCircleRight />
                </button>
            </div>
        </div>
    )
}