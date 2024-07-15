import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { useEffect, useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
interface prop {
    transaction: transaction[]
}
interface transaction {
    date: Date,
    amount: number
}
export default function Graph({ transaction }: prop) {
    const [amount, setAmount] = useState<number[]>()
    const [date, setDate] = useState<string[]>()

    function getAmount() {
        const num: number[] = []
        for (let i = 0; i < transaction.length; i++) {
            num.push(transaction[i].amount)
        }
        setAmount(num);
    }
    function getDate() {
        const Dat: string[] = []
        for (let i = 0; i < transaction.length; i++) {
            Dat.push(transaction[i].date.toString())
        }
        setDate(Dat);
    }


    useEffect(() => {
        if (transaction.length > 0) {
            
            getAmount()
            getDate()
        }

    }, [transaction])

    const data = {
        labels: date,
        datasets: [
            {
                label: "Customer Transactions",
                data: amount,
                borderColor: "rgb(255, 99, 132)",
            }
        ]
    }
    const options = {}
    return <div className="w-[70%] mx-auto">
        <Line options={options} data={data}></Line>
    </div>

}