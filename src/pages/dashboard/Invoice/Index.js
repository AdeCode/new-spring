import React, { useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import CustomerTransaction from '../../../components/@tables/CustomerTransaction'
import InvoiceTable from '../../../components/@tables/InvoiceTable'

function InvoiceIndex() {
    const [currency, setCurrency] = useState('USD')

    const navigate = useNavigate()

    const newInvoiceMutation = () => { }

    const onSubmit = () => {

    }

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        console.log(currency)
    }
  return (
    <Invoice className='px-[20px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className=''></div>
            <div className='box w-full flex flex-col pb-2'>
                <div className='w-full border-b-2 border-green-700 px-2 flex justify-between items-center py-2'>
                    <h2 className='text-base font-semibold lg:text-xl'>Invoices</h2>
                    <div className='flex gap-4'>
                        <select name='currency' onChange={handleCurrencyChange} className='py-3 px-3 rounded-md text-blue_text border border-[#FBFCFE]'>
                            <option value='USD' defaultValue>USD</option>
                            <option value='Naira' >Naira</option>
                        </select>
                        <Link to='/invoice/generate' className='flex rounded-md items-center py-2 px-3 bg-green-700 hover:bg-green-600 text-white'><span class="material-symbols-outlined">add</span>Create Invoice</Link>
                    </div>
                </div>
                <div className='flex gap-2 mb-3 px-2 py-2'>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end font-semibold'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>2</h2>
                            <h3 className='text-base text-gray'>Total Invoices</h3>
                        </div>
                    </div>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end font-semibold'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>2</h2>
                            <h3 className='text-base text-gray'>Outstanding Invoices</h3>
                        </div>
                    </div>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end font-semibold'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>2</h2>
                            <h3 className='text-base text-gray'>Overdue Invoices</h3>
                        </div>
                    </div>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>10 ({currency})</h2>
                            <h3 className='text-base text-gray'>Paid Invoices</h3>
                        </div>
                    </div>
                </div>
                <div className='px-2 w-full shadow-md'>
                   <InvoiceTable/>
                </div>
            </div>

        </Invoice>
  )
}


const Invoice = styled.div`
    .box{
        box-shadow: 10px 50px 50px 50px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
    }

    /* .react-datetime-picker{
        height:40px;
        padding: 8px;
    } */

    .react-datetime-picker__wrapper{
        height:40px;
        padding: 8px;
        border-radius:8px;
        border: 1px solid rgba(14, 31, 48, 0.25);
        color: #6A707E;
    }

    .card{
        box-shadow: 10px 50px 50px 10px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
    }
    select:focus{
        outline: none !important;
        border: 1px solid #1BB6EF;
    }
`

export default InvoiceIndex