import React from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import CustomerTransaction from '../../../components/@tables/CustomerTransaction'
import InvoiceTable from '../../../components/@tables/InvoiceTable'

function InvoiceIndex() {
    const navigate = useNavigate()
    const newInvoiceMutation = () => { }

    const onSubmit = () => {

    }
  return (
    <Invoice className='px-[20px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className=''></div>
            <div className='box w-full flex flex-col'>
                <div className='w-full border-b-2 border-cyan-900 pl-3 pt-2'>
                    <h2 className=''>Invoices</h2>
                </div>
                <div className='flex gap-2 mb-3 px-2 py-2'>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>2</h2>
                            <h3 className='text-base text-gray'>Total Invoices</h3>
                        </div>
                    </div>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>2</h2>
                            <h3 className='text-base text-gray'>Outstanding Invoices</h3>
                        </div>
                    </div>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>2</h2>
                            <h3 className='text-base text-gray'>Overdue Invoices</h3>
                        </div>
                    </div>
                    <div className='shadow-md hover:shadow-lg flex flex-col w-[250px] h-[150px] py-2 px-2'>
                        <span className='flex justify-end'>0%</span>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold text-3xl text-green-600'>USD</h2>
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
`

export default InvoiceIndex