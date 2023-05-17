import React from 'react'
import gig from '../../images/dashboard/gig.png'

function InvoiceTemplate() {
  return (
    <div className='border border-gray rounded-lg'>
        <div className="flex justify-between border-b border-gray p-4">
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-2xl'>INVOICE</h2>
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
            <div className=''>
                <h2 className='text-green-700 font-semibold'>Invoice details</h2>
                <div className='py-6'>
                    <table className='w-full'>
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
            </div>
        </div>
        
    </div>
  )
}

export default InvoiceTemplate