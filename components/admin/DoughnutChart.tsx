import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function(){
    const data = {
        labels: ["Qejani", "Qaribu", "Qwetu"],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    '#F63E3E',
                    '#04103B',
                    '#A9A9A9',
                ],
            },
        ],
      };
      const options = {
        plugins: {
            legend: {
                display: true, // Make sure the legend is displayed
                position: 'right' as const, // Set the position of the legend to 'right'
                labels: {
                    usePointStyle: true, // Enable use of point style for legend
                    pointStyle: 'circle', // Set legend point style to circular
                    padding: 20,          // Optional: adds padding between legend items
                }
            }
        },
        responsive: true, // Ensure the chart is responsive
        maintainAspectRatio: false, // Allow custom aspect ratio
    };    
    return(
        <div style={{ width: '200px', height: '200px' }}> 
            <Doughnut data={data} options={options} />
        </div>
    )
}