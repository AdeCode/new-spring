import React, { useState } from 'react'
import styled from 'styled-components'
import gig from '../../images/dashboard/gig.png'
import InvoiceFooter from './InvoiceFooter'
import CheckBox from './CheckBox'

function InvoiceTemplate() {
    const [agree, setAgree] = useState(false)
  return (
    <>
    <div className='border border-gray rounded-lg'>
        <div className="flex justify-between border-b border-gray p-4">
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-2xl text-green-700'>INVOICE</h2>
                <div className='w-[100px] h-[100px]'>
                    <img src={gig} alt='company'/>
                </div>
                {/* <p className='text-base'>Business Logo here</p> */}
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-2xl text-neutral-700'>Giglogostics</h2>
                <p className='text-base'>No 6, Gbagada, Lagos.</p>
            </div>
        </div>
        <div className='p-4'>
            <div className='flex justify-between'>
                <div className='flex gap-1'>
                    <h3 className='text-neutral-700'>To: </h3><span className='text-black'>Gig Logistics</span>
                </div>
                <div className='w-[300px] border flex flex-col'>
                    <div className='flex border-b py-1 px-2'>
                        <h3 className=''>Due date</h3><span className=''></span>
                    </div>
                    <div className='flex border-b justify-between py-1 px-2'>
                        <h3 className=''>Invoice date</h3><span className='font-medium'>20 Apr, 2023</span>
                    </div>
                    <div className='flex border-b justify-between py-1 px-2'>
                        <h3 className=''>Invoice #</h3><span className='font-medium'>0122JH0</span>
                    </div>
                    <div className='flex border-b justify-between py-1 px-2'>
                        <h3 className=''>Invoice Total</h3><span className='font-medium'>2778 USD</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <h2 className='text-green-700 font-semibold'>Invoice details</h2>
                <div className='py-6'>
                    <table className='w-full border-b'>
                        <thead className='bg-green-700 text-white h-[50px] rounded-md'>
                            <tr className='py-4'>
                                <th>Items</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=''>
                                <td className='m-0 text-center py-3 text-sm font-medium'>Iron rod</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>500</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>478</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>21099</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex w-full justify-end'>
                    <div className='border flex flex-col w-[300px]'>
                        <div className='flex justify-between py-2 px-2'>
                            <h2 className=''>Subtotal:</h2><span className=''>28033 USD</span>
                        </div>
                        <div className='flex justify-between py-2 px-2'>
                            <h2 className=''>Tax:(5%)</h2><span className=''>833 USD</span>
                        </div>
                        <div className='flex justify-between py-4 px-2 bg-slate-400 text-black'>
                            <h2 className='font-semibold'>Invoice Total:</h2><span className='font-semibold'>29833 USD</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border-b pb-3'>
                    <CheckBox
                        onChange={()=>setAgree(!agree)}
                        checked={agree}
                    />
                    <div className='w-full flex justify-end'>
                        <button type="submit" disabled={!agree} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Pay Now</button>
                    </div>
                    {/* <button className=''>Pay Now</button> */}
                </div>
            </div>
        </div>
    </div>
        <InvoiceFooter/>
    </>
    
  )
}


export default InvoiceTemplate