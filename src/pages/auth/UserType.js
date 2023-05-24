import React from 'react'
import individual from '../../images/dashboard/individual.png'
import business from '../../images/dashboard/business.png'
import { useNavigate } from 'react-router-dom'

function UserType() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center bg-[#E5E5E5] h-screen py-[30px]'>
        <h2 className='font-bold text-[28px] mb-4'>Registration Type</h2>
        <p className='mb-[30px]'>Select the type of account you would like to create</p>
        <div className='flex justify-center gap-8'>
            <div className='flex flex-col justify-between py-5 rounded-[20px] flex-col px-[50px] bg-white lg:w-[500px]'>
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-[1.2rem] mb-3'>Register as Individual</h3>
                    <p className='mb-7'>Making &amp; Receiving Payments</p>
                    <img src={individual} alt='individual' height='200px' width='260px' />
                    <ul className='my-3'>
                        <li className=''>Make payments to 1000+ Businesses</li>
                        <li className=''>Flexible payment options</li>
                        <li className=''>Instant payments confirmation</li>
                    </ul>
                </div>
                <button className='bg-gradient-to-r from-[#4BCA69] to-[#684EEB] rounded-[10px] w-full py-3 text-white font-medium'>COMING SOON</button>
            </div>
            <div className='flex flex-col justify-between py-5 rounded-[20px] flex-col px-[50px] bg-white lg:w-[500px]'>
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-[1.2rem] mb-3'>Register as Business</h3>
                    <p className='mb-7'>Generate Invoices, Receive Payments &amp; Communicate</p>
                    <img src={business} alt='business' />
                    <ul className='my-3'>
                        <li className=''>Generate Invoices</li>
                        <li className=''>Receive payments from 1900+ customers</li>
                        <li className=''>Multi-currency payments</li>
                        <li className=''>Instant deposits into your global virtual accounts</li>
                        <li className=''>Communicate with all your customers in one place</li>
                    </ul>
                </div>
                
                <button onClick={()=>navigate('/business-signup')} className='bg-gradient-to-r from-[#4BCA69] to-[#684EEB] rounded-[10px] w-full py-3 text-white font-medium'>SIGN UP</button>
            </div>
            
        </div>
    </div>
  )
}

export default UserType