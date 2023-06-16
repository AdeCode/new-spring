import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate, useParams} from 'react-router-dom'
import CustomerTransaction from '../../../components/@tables/CustomerTransaction'
import InvoiceTable from '../../../components/@tables/InvoiceTable'
import OrderItemsTable from '../../../components/@tables/OrderItemsTable'
import { useQuery } from 'react-query'
import invoiceService from '../../../@services/invoiceService'
import helperFunctions from '../../../@helpers/helperFunctions'

function InvoiceDetails() {
    const navigate = useNavigate()

    const {invoiceCode} = useParams()

    const {data:invoice, isLoading, error, isError} = useQuery(['invoice',{invoiceCode}], invoiceService.getInvoicesByCode)
    invoice && console.log(invoice)

    const gotoPreview = () => {
        navigate('/invoice/template', {
            state:{
                invoice
            }
        })
    }

  return (
    <Invoice className='px-[20px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            {
                isLoading ? 'Loading...' 
                :
                <div className='box w-full flex flex-col py-3 px-3'>
                    <div className='w-full border-b-2 border-cyan-900 px-2 flex justify-between items-center py-2'>
                        <h2 className='text-base font-semibold lg:text-xl'>Invoices Details</h2>
                        <div onClick={gotoPreview}
                            className='flex cursor-pointer rounded-md items-center py-2 px-3 bg-green-700 hover:bg-green-600 text-white'>
                            <span className="material-symbols-outlined">visibility</span>Preview Invoice
                        </div>
                    </div>
                    <div className='flex justify-between mb-3 px-4 py-2 shadow-md hover:shadow-lg'>
                        <div className='flex flex-col'>
                            {/* <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-base text-gray'>Invoice Shareable Link</h2>
                                <span className=''>https://merchant.sultan.invoice.com</span>
                            </div> */}
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Invoice ID</h2>
                                <span className='font-medium text-base'>{invoice?.invoice?.invoice_code}</span>
                            </div>
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Status</h2>
                                <span className={`font-medium text-base ${invoice?.invoice?.status === 'PAID' ? 'text-green-700' : 'text-red-700'}`}>{invoice?.invoice?.status}</span>
                            </div>
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Date Created</h2>
                                <span className='font-medium text-base'>{invoice?.invoice?.creation_date}</span>
                            </div>
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Due date</h2>
                                <span className='font-medium text-base'>{invoice?.invoice?.due_date}</span>
                            </div>
                            
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Customer Name</h2>
                                <span className='font-medium text-base'>{invoice?.invoice?.name}</span>
                            </div>
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Customer Phone number</h2>
                                <span className='font-medium text-base'>{invoice?.invoice?.phone}</span>
                            </div>
                            <div className='flex gap-3'>
                                <h2 className='min-w-[250px] text-gray text-base'>Customer Email</h2>
                                <span className='font-medium text-base'>{invoice?.invoice?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full shadow-md flex flex-col py-2 gap-3'>
                    <OrderItemsTable
                        data={invoice?.invoice?.items}
                        currency={invoice?.invoice?.currency}
                    />
                    <div className='justify-between flex'>
                            <div className='flex items-end gap-1'>
                                <h2 className='min-w-[150px] text-base text-gray'>Invoice Shareable Link: </h2>
                                <span className=''>Coming soon!</span>
                            </div>
                            <div className='flex w-[200px] flex-col gap-3 border border-y-cyan-950'>
                                <div className='flex justify-between px-2'>
                                    <h2 className='text-gray'>Subtotal:</h2><span>{helperFunctions.formatCurrency(invoice?.invoice?.currency,invoice?.invoice?.sub_total)}</span>
                                </div>
                                <div className='flex justify-between px-2'>
                                    <h2 className='text-gray'>Tax(7.5%):</h2><span>{helperFunctions.formatCurrency(invoice?.invoice?.currency,invoice?.invoice?.sub_total*invoice?.invoice?.tax)}</span>
                                </div>
                                <div className='flex justify-between py-1 px-2 font-bold'>
                                    <h2 className='text-black'>Grand total:</h2><span>{helperFunctions.formatCurrency(invoice?.invoice?.currency,invoice?.invoice?.total_cost)}</span>
                                </div>
                            </div>
                    </div>
                    </div>
                    
                </div>
            } 
           

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
`

export default InvoiceDetails