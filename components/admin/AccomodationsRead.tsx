'use client'

import { deleteAccomodation, fetchAccomodations} from "./AccomodationsActions"
import { Accommodations } from "@/types"
import { useEffect, useState } from "react"
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import AccomodationsCreate from "./AccomodationsCreate";
import UpdateAccommodation from "./AccomodationsUpdate";

export default function AccomodationsRead(){
    const [accomodations, setAccomodations] = useState<Accommodations[]>([])
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodations | null>(null);

    const pageSize = 3; // Number of users per page
    
    useEffect(()=>{
        const getAccomodations= async () =>{
            const data = await fetchAccomodations() as unknown as Accommodations[];
            if (data) setAccomodations(data)
        }
        getAccomodations()
    }, [])

    // Calculate the users to display for the current page
    const indexOfLastAccomodation= currentPage * pageSize;
    const indexOfFirstAccomodation = indexOfLastAccomodation - pageSize;
    const currentAccomodations = accomodations.slice(indexOfFirstAccomodation, indexOfLastAccomodation);
    const totalPages = Math.ceil(accomodations.length/pageSize)

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

    //update accomodation
    const handleOpenUpdateModal = (accommodation: Accommodations) => {
        setSelectedAccommodation(accommodation);
    };

    const handleCloseUpdateModal = () => {
        setSelectedAccommodation(null);
    };

    // Delete accommodation and refresh data
    const handleDelete = async (id: string) => {
        await deleteAccomodation(id);
        setAccomodations((prevAccommodations) =>
            prevAccommodations.filter(accommodation => accommodation.id !== id)
        );
    };

    return(
        <div id="users" className="mt-5">
            <div className="flex gap-5">
                <h2 className="text-sm text-[#04103B] font-bold">Accomodations</h2>
                <AccomodationsCreate/>
            </div>
            <div id="display_data" className="mt-5">
                <table className="w-full border-[1.5px] border-[#EBE8FF] rounded-xl text-xs">
                    <thead className="bg-[#F3F4F6]">
                        <tr className="text-[#797D8C] font-semibold">
                            <th className="p-3">Accomodation ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">City</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Exterior Pic</th>
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
                                    {hostel.id.length > 8 ? `${hostel.id.substring(0, 8)}...` : hostel.id}
                                </td>
                                <td className="p-3 text-[#04103B] font-bold">
                                    {hostel.name}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.city}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.location}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    <img className="w-32" src={hostel.exterior_picture} alt="" />
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    <img className="w-32" src={hostel.interior_picture} alt="" />
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.one_bedroom}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.two_bedroom}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.three_bedroom}
                                </td>
                                <td className="p-3 font-semibold text-[#797D8C]">
                                    {hostel.four_bedroom}
                                </td>
                                <td>
                                    <button onClick={()=>handleOpenUpdateModal(hostel)} className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-800 transition-colors my-2">Update</button>
                                    <button onClick={()=>{handleDelete(hostel.id)}} className="bg-red-500 text-white py-2 px-3.5 rounded hover:bg-red-800 transition-colors mb-2">Delete</button>
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
            {selectedAccommodation && (
                <UpdateAccommodation
                    accommodationId={selectedAccommodation.id}
                    currentData={selectedAccommodation}
                    onClose={handleCloseUpdateModal}
                />
            )}
        </div>
    )
}