import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PaymentBarChart() {
    const [hostelNames, setHostelNames] = useState<string[]>([]);
    const [totalPayments, setTotalPayments] = useState<number[]>([]);

    useEffect(() => {
        const fetchPaymentsData = async () => {
            const paymentsSnapshot = await getDocs(collection(db, "payments"));

            const totalPaymentByHostel: { [hostel: string]: number } = {};

            paymentsSnapshot.forEach(doc => {
                const paymentData = doc.data();
                const hostelName = paymentData.accomodationName || "Unknown";
                const amount = parseFloat(paymentData.amount) || 0;

                // Accumulate total payment amount for each hostel
                totalPaymentByHostel[hostelName] = (totalPaymentByHostel[hostelName] || 0) + amount;
            });

            // Separate hostel names and total payments into arrays for the chart
            setHostelNames(Object.keys(totalPaymentByHostel));
            setTotalPayments(Object.values(totalPaymentByHostel));
        };

        fetchPaymentsData();
    }, []);

    const data = {
        labels: hostelNames,
        datasets: [
            {
                label: "Total Payments (Amount)",
                data: totalPayments,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false // Hides grid lines on the x-axis
                },
                beginAtZero: true // Ensures the scale starts from 0
            },
            y: {
                grid: {
                    display: false // Hides grid lines on the y-axis
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hides the legend if only one dataset
            },
            tooltip: {
                enabled: true // Show tooltip on hover
            }
        }
    };

    return (
        <div className="h-1/2"> 
            <Bar data={data} options={options} height={"120vh"} />
        </div>
    );
}
