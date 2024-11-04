'use client'

import { fetchUsers } from "./UserAction"
import { Users } from "@/types"
import { useEffect, useState } from "react"
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function(){
    const [users, setUsers] = useState<Users[]>([])
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const pageSize = 6; // Number of users per page

    useEffect(()=>{
        const getUsers = async () =>{
            const data:any = await fetchUsers();
            if (data) setUsers(data)
        }
        getUsers();
    })

    // Calculate the users to display for the current page
    const indexOfLastUser = currentPage * pageSize;
    const indexOfFirstUser = indexOfLastUser - pageSize;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length/pageSize)

    // Handler functions for pagination
    const nextPage = () => {
        if (currentPage < Math.ceil(users.length / pageSize)) {
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
            <h2 className="text-sm text-[#04103B] font-bold">Users</h2>
            <div id="display_data" className="mt-5">
                {currentUsers.map((user, index)=>(
                    <div id="row" key={index} className="border-[1.5px] border-[#EBE8FF] rounded-xl p-3 my-3 flex justify-center text-xs gap-32">
                    <p id="name" className="font-semibold text-[#797D8C]">{user.fullname}</p>
                    <p id="email" className="text-[#04103B] font-bold">{user.email}</p>
                    <p id="identification" className="font-semibold text-[#797D8C]">{user.id}</p>
                </div>
                ))}
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
                disabled={currentPage === Math.ceil(users.length / pageSize)}
                className="text-sm text-[#04103B] font-bold"
                >
                <FaArrowCircleRight />
                </button>
            </div>
        </div>
    )
}