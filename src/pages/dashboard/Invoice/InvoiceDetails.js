import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import CustomerTransaction from '../../../components/@tables/CustomerTransaction'
import InvoiceTable from '../../../components/@tables/InvoiceTable'
import OrderItemsTable from '../../../components/@tables/OrderItemsTable'

function InvoiceDetails() {
    const navigate = useNavigate()
    const newInvoiceMutation = () => { }

    const onSubmit = () => {

    }
  return (
    <Invoice className='px-[20px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className='box w-full flex flex-col py-3 px-3'>
                <div className='w-full border-b-2 border-cyan-900 px-2 flex justify-between items-center py-2'>
                    <h2 className='text-base font-semibold lg:text-xl'>Invoices Details</h2>
                    <Link to='/' className='flex rounded-md items-center py-2 px-3 bg-green-700 hover:bg-green-600 text-white'><span class="material-symbols-outlined">visibility</span>Preview Invoice</Link>
                </div>
                <div className='flex flex-col gap-2 mb-3 px-2 py-2 shadow-md hover:shadow-lg'>
                    <div className='flex gap-3'>
                        <h2 className='min-w-[250px] text-base text-gray'>Invoice Shareable Link</h2>
                        <span className=''>https://merchant.sultan.invoice.com</span>
                    </div>
                    <div className='flex gap-3'>
                        <h2 className='min-w-[250px] text-gray text-base'>Invoice ID</h2>
                        <span className='font-medium text-base'>INV-19233804</span>
                    </div>
                    <div className='flex gap-3'>
                        <h2 className='min-w-[250px] text-gray text-base'>Status</h2>
                        <span className='font-medium text-base'>Unpaid</span>
                    </div>
                    <div className='flex gap-3'>
                        <h2 className='min-w-[250px] text-gray text-base'>Date Created</h2>
                        <span className='font-medium text-base'>20 May 2023</span>
                    </div>
                    <div className='flex gap-3'>
                        <h2 className='min-w-[250px] text-gray text-base'>Due date</h2>
                        <span className='font-medium text-base'>...</span>
                    </div>
                    
                </div>
                <div className='w-full shadow-md flex flex-col py-2 gap-3'>
                   <OrderItemsTable/>
                   <div className='justify-end flex'>
                        <div className='flex w-[200px] flex-col gap-3 border border-y-cyan-950'>
                            <div className='flex justify-between px-2'>
                                <h2 className='text-gray'>Subtotal:</h2><span>20,600 USD</span>
                            </div>
                            <div className='flex justify-between px-2'>
                                <h2 className='text-gray'>Tax(5%):</h2><span>600 USD</span>
                            </div>
                            <div className='flex justify-between bg-gray py-1 px-2'>
                                <h2 className='text-black'>Subtotal:</h2><span>20,600 USD</span>
                            </div>
                        </div>
                   </div>
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
`

export default InvoiceDetails