import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useQuery } from 'react-query'
import invoiceService from '../../../@services/invoiceService'

function CustomerInvoiceDetails() {
    const navigate = useNavigate()

    const {invoiceCode} = useParams()

    const {data:invoice, isLoading, error, isError} = useQuery(['invoice',{invoiceCode}], invoiceService.getInvoicesByCode)

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
                    </div>
                    <div className='flex flex-col gap-2 mb-3 px-2 py-2 shadow-md hover:shadow-lg'>
                        <div className='flex gap-3'>
                            <h2 className='min-w-[250px] text-gray text-base'>Invoice ID</h2>
                            <span className='font-medium text-base'>{invoice?.invoice?.invoice_code}</span>
                        </div>
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
                        <div className='flex gap-3'>
                            <h2 className='min-w-[250px] text-gray text-base'>Status</h2>
                            <span className='font-medium text-base'>{invoice?.invoice?.status}</span>
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
                    <div className='w-full shadow-md flex flex-col py-2 gap-3'>
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

export default CustomerInvoiceDetails
