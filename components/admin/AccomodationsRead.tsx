'use client'

import { fetchAccomodations } from "./AccomodationsActions"
import { Accommodations } from "@/types"
import { useEffect, useState } from "react"
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function(){
    const [accomodations, setAccomodations] = useState<Accommodations[]>([])
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const pageSize = 6; // Number of users per page

    useEffect(()=>{
        const getAccomodations= async () =>{
            const data:any = await fetchAccomodations();
            if (data) setAccomodations(data)
        }
        getAccomodations();
    }, [])

    // Calculate the users to display for the current page
    const indexOfLastAccomodation= currentPage * pageSize;
    const indexOfFirstAccomodation = indexOfLastAccomodation - pageSize;
    const currentAccomodations = accomodations.slice(indexOfFirstAccomodation, indexOfLastAccomodation);
    const totalPages = Math.ceil(currentAccomodations.length/pageSize)

    // Handler functions for pagination
    const nextPage = () => {
        if (currentPage < Math.ceil(accomodations.length / pageSize)) {
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
            <h2 className="text-sm text-[#04103B] font-bold">Accomodations</h2>
            <div id="display_data" className="mt-5">
                <table className="w-full border-[1.5px] border-[#EBE8FF] rounded-xl text-xs">
                    <thead className="bg-[#F3F4F6]">
                        <tr className="text-[#797D8C] font-semibold">
                            <th className="p-3">Accomodations ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Exterior Pic</th>
                            <th className="p-3">Accommodation ID</th>
                            <th className="p-3">Interior Pic</th>
                            <th className="p-3">1-Bed</th>
                            <th className="p-3">2-Bed</th>
                            <th className="p-3">3-Bed</th>
                            <th className="p-3">4-Bed</th>
                            <th className="p-3">Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAccomodations.map((hostel, index) => (
                            <tr key={index} className="border-b-[1.5px] border-[#EBE8FF] text-center">
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.id.length > 12 ? `${hostel.id.substring(0, 12)}...` : hostel.id}
                                </td>
                                <td className="p-3 text-[#04103B] font-bold">
                                    {hostel.name}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.location}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.exterior_picture}
                                </td>
                                {hostel.accomodationData.map((specific_detail)=>(
                                    <>
                                        <td className="p-3 font-semibold text-[#797D8C]">
                                            {specific_detail.id}
                                        </td>
                                        <td className="p-3 font-semibold text-[#797D8C]">
                                            {specific_detail.interior_picture}
                                        </td>
                                        <td className="p-3 font-semibold text-[#797D8C]">
                                            {specific_detail.one_bedroom}
                                        </td>
                                        <td className="p-3 font-semibold text-[#797D8C]">
                                            {specific_detail.two_bedroom}
                                        </td>
                                        <td className="p-3 font-semibold text-[#797D8C]">
                                            {specific_detail.three_bedroom}
                                        </td>
                                        <td className="p-3 font-semibold text-[#797D8C]">
                                            {specific_detail.four_bedroom}
                                        </td>
                                    </>
                                ))}
                                <td className="gap-3">
                                    <button>Update</button>
                                    <button>Delete</button>
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
                disabled={currentPage === Math.ceil(accomodations.length / pageSize)}
                className="text-sm text-[#04103B] font-bold"
                >
                <FaArrowCircleRight />
                </button>
            </div>
        </div>
    )
}