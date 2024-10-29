import {Line} from "react-chartjs-2"
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function(){
    const data = {
        labels: ["Qejani", "Qaribu", "Qwetu"],
        datasets: [
          {
            label: "Users",
            data: [33, 18, 85],
            fill: false,
            backgroundColor: "#F63E3E",
            borderColor: "#F63E3E", 
            tension:0.5
          },
          {
            label: "Payments",
            data: [80, 30, 10],
            fill: false,
            borderColor: "#04103B",
            backgroundColor:"#04103B",
            tension:0.5
          }
        ]
      };
      const options = {
        scales: {
            x: {
                grid: {
                    display: false // Hides grid lines on the x-axis
                }
            },
            y: {
                grid: {
                    display: false // Hides grid lines on the y-axis
                }
            }
        },
        plugins:{
            legend: {
                labels: {
                    usePointStyle: true, // Enable use of point style for legend
                    pointStyle: 'circle', // Set legend point style to circular
                    padding: 20           // Optional: adds padding between legend items
                }
            }
        }
    };
    return(
        <div>
            <Line data={data} height={50} options={options}/>
        </div>
    )
}