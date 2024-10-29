'use client'
import LineChart from "@/components/admin/LineChart"
import DoughnutChart from "@/components/admin/DoughnutChart"

export default function(){
    return(
        <div id="dashboard">
            <div id="line_chart" className="border-[1.5px] rounded-xl mt-5 p-5 w-full flex-grow">
                <LineChart/>
            </div>
            <div id="doughnut_chart" className="border-[1.5px] rounded-xl mt-5 w-1/3 flex-grow flex justify-center items-center">
                <DoughnutChart/>
            </div>
        </div>
    )
}