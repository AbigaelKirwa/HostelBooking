'use client'
import LineChart from "@/components/admin/BarChart"

export default function DashboardPage(){
    return(
        <div id="dashboard">
            <div id="line_chart" className="border-[1.5px] rounded-xl mt-5 p-5 w-full flex-grow">
                <LineChart/>
            </div>
        </div>
    )
}