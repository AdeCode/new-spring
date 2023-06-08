import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import {
    Typography,
    Box
} from '@mui/material';
import customerService from '../../../@services/customerService';
import CustomerInvoiceTable from '../../../components/@tables/CustomerInvoiceTable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import invoiceService from '../../../@services/invoiceService';

function CustomerInvoiceList() {
    const [currency, setCurrency] = useState('')
    const [status, setStatus] = useState('')

    const { customerId } = useParams()

    const navigate = useNavigate()

    const handleCurrencyChange = (e) => {
        setCurrency(e.currentTarget.value)
    }


    // const { data: invoices, isLoading, error } = useQuery(['customer_invoices', { customerId }], customerService.fetchCustomerInvoices, {enabled:returnAll(status,currency)})
    const { data: invoices, isLoading, error } = useQuery(['customerInvoices', { customerId, status, currency }], invoiceService.filterInvoice)

    invoices && console.log(invoices)

    const handleStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className='w-full border-b-2 border-cyan-900 px-2 flex justify-between items-center py-2'>
                <h2 className='text-base font-semibold lg:text-xl'>Customer Invoices Details</h2>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-semibold text-lg'>Status:</h2>
                        <select name='status' onChange={(e) => handleStatusChange(e)} className='py-3 px-3 rounded-md text-blue_text border border-[#FBFCFE]'>
                            <option value=''>All</option>
                            <option value='PAID'>PAID</option>
                            <option value='UNPAID'>UNPAID</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-semibold text-lg'>Currency:</h2>
                        <select name='status' onChange={(e) => handleCurrencyChange(e)} className='py-3 px-3 rounded-md text-blue_text border border-[#FBFCFE]'>
                            <option value=''>All</option>
                            <option value='USD'>USD</option>
                            <option value='NGN'>NAIRA</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                isLoading ? 'Data loading...'
                    :
                    <div className='flex flex-col'>
                        <div className="">
                            <div className='box w-full flex flex-col py-3 px-3'>
                                <div className='flex flex-col gap-2 mb-3 px-2 py-2 shadow-md hover:shadow-lg'>
                                    <div className='flex gap-3'>
                                        <h2 className='min-w-[250px] text-gray text-base'>Customer Name</h2>
                                        <span className='font-medium text-base'>{invoices?.customers?.name}</span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <h2 className='min-w-[250px] text-gray text-base'>Customer Phone number</h2>
                                        <span className='font-medium text-base'>{invoices?.customers?.phone}</span>
                                    </div>
                                    <div className='flex gap-3'>
                                        <h2 className='min-w-[250px] text-gray text-base'>Customer Email</h2>
                                        <span className='font-medium text-base'>{invoices?.customers?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CustomerInvoiceTable
                            data={invoices && invoices?.invoices}
                            //data={invoices?.invoices}
                            currency={currency}
                        />
                    </div>
            }
        </>


    )
}

export default CustomerInvoiceList

