import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Graph from "../Graph/Graph";
interface props {
    MyCustomer: MyCustomer,
    MyTransaction: MyTransaction[]
}
interface MyCustomer {
    id: number;
    name: string;

}
interface MyTransaction {
    amount: number;
    date: Date;
    customer_id: number;
}
export default function Table({ MyCustomer, MyTransaction }: props) {
    const [filteredMyTransactions, setFilteredMyTransactions] = useState<MyTransaction[]>([]);
    const [rmfilter, setRmfilter] = useState<number>()
    useEffect(() => {
        const filtered = MyTransaction.filter((tran) => tran.customer_id === MyCustomer.id);
        setRmfilter(filtered.length);

        setFilteredMyTransactions(filtered);
    }, [MyCustomer, MyTransaction]);

    return (<>
        {rmfilter === 0 ? null : <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {MyCustomer.id}
                </th>
                <td className="px-6 py-4">
                    {MyCustomer?.name}
                </td>
                <td className="px-6 py-4">
                    {filteredMyTransactions.map((MyTransaction) => (
                        <div key={uuidv4()}>
                            {MyTransaction?.amount} EGP
                            <br />
                        </div>
                    ))}
                </td>
                <td className="px-6 py-4">
                    {filteredMyTransactions.map((MyTransaction) => (
                        <div key={uuidv4()}>
                            {MyTransaction?.date.toString()}
                            <br />
                        </div>
                    ))}
                </td>
                <td className="px-6 py-4">
                    <Graph transaction={filteredMyTransactions}></Graph>
                </td>
            </tr>
        </>}
    </>
    );
}

