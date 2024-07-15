import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Components/Tabel/Table';
import { v4 as uuidv4 } from 'uuid';

interface Customer {
  name: string;
  id: number;
}

interface Transaction {
  amount: number;
  date: Date;
  customer_id: number;
}

function App() {
  const [Cdata, setCdata] = useState<Customer[]>([]);
  const [Tdata, setTdata] = useState<Transaction[]>([]);

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    axios.get('https://raw.githubusercontent.com/MohamedOsamaM/JsonData/main/db.json')
      .then((res) => {
        setCdata(res.data.customers);
        setTdata(res.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const Cname = (e.target as HTMLFormElement)?.search?.value;

    if (Cname === '') {
      getdata();
    } else {
      const filteredData: Customer[] = Cdata.filter((customer) =>
        customer.name.toLowerCase().includes(Cname.toLowerCase())
      );
      setCdata(filteredData);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const Cname = e.target.value;
    let searchdata: Customer[] = [];

    if (Cname === '') {
      getdata();
    } else {
      searchdata = Cdata.filter((customer) =>
        customer.name.toLowerCase().includes(Cname.toLowerCase())
      );
    }

    setCdata(searchdata);
  }

  function handleSubmit2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const Cname = (e.target as HTMLFormElement)?.amount?.value;
    let searchdata: Customer[] = [];

    if (Cname === '') {
      getdata();
    } else {
      searchdata = Cdata.filter((customer) =>
        customer.name.toLowerCase().includes(Cname.toLowerCase())
      );
    }

    setCdata(searchdata);
  }

  function handleChange2(e: React.ChangeEvent<HTMLInputElement>) {
    const Tnum = e.target.value;
    let searchdata: Transaction[] = [];

    if (Tnum === '') {
      getdata();
    } else {
      searchdata = Tdata.filter((transaction) =>
        transaction.amount.toString().includes(Tnum.toString())
      );
    }

    setTdata(searchdata);
  }

  return (
    <div className='md:container w-[90vw] mx-auto mb-10'>
      <div className='mb-10 mt-5 flex md:flex-row flex-col gap-5'>
        <form className=" md:w-1/2 w-full " onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input name='search' onChange={handleChange} type="search" id="default-search" className="border-none outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Customer name" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <form className="md:w-1/2 w-full " onSubmit={handleSubmit2}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input name='amount' onChange={handleChange2} type="number" id="default-search" className="border-none outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Transaction amount" required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Date
              </th>
              <th scope="col" className="px-6 py-3">
                Graph
              </th>
            </tr>
          </thead>
          <tbody>
            {Cdata.map((customer) => (
              <Table key={uuidv4()} MyCustomer={customer} MyTransaction={Tdata} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
