import React from 'react'
import styled from 'styled-components'
import bus from '../images/business/bus.png'
import vendor from '../images/business/vendor.png'
import pay from '../images/business/pay.png'
import search from '../images/business/search.png'
import invoice from '../images/business/invoice.png'
import manage from '../images/business/manage.png'
import WaitListForm from '../components/WaitListForm'


function Business() {
    return (
        <Section className=''>
            <div className='lg:pb-8'>
                <div className='flex flex-col items-center mb-10 px-5 lg:pt-6'>
                    <h1 className='head hidden lg:flex lg:font-bold lg:text-[40px] font-normal text-2xl mb-6'>SpringPay</h1>
                    <p className='lg:w-[1039px] lg:mb-10 text-left lg:text-center text-[26px] lg:text-[40px] font-semibold lg:font-normal leading-9 lg:leading-[53px]'>
                        Trusted Freight & Logistics Cross-border Payment Platform
                    </p>
                </div>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-8 lg:mb-[50px] px-5'>
                    <h2 className='lg:w-[500px] lg:font-normal font-bold lg:text-3xl text-sm text-blue lg:text-black'>With SpringPay, you can start making payments to your cargo vendor instantly in USD, GBP, EURO, GHC, NGN etc. from anywhere in other to process your goods on time.</h2>
                    <img src={bus} alt='business' width='600px' height='400px' />
                </div>
                <WaitListForm/>
            </div>
           
            <div className='flex flex-col items-center py-20 bg-lightGreen gap-10 px-5'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='lg:w-[600px] lg:h-[400px] flex flex-col gap-7 items-center'>
                        <img src={vendor} alt='vendor'/>
                        <button className='btn hidden lg:flex justify-center py-[15px] text-white lg:w-[300px] text-center'>Join our Vendor Network</button>
                    </div>
                    <div className='lg:w-[500px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight'>Register your cargo business to start receiving payments in your preferred multi-currency</h2>
                        <p className='font-normal lg:text-base text-sm text-left'>Becoming a SpringPay Vendor provides multiple benefits to help grow your business, save time, manage your resources more efficiently at no cost.
                            Start receive payments from your global clients in NGN, USD, GBP, EUR etc. with very minimum transaction fee and instant payment into your foreign or local bank account.
                            Open local &amp; global business accounts in the United States or other foreign accounts across the globe without visiting a bank branch.
                            Take your business even further by scaling globally from day one, without any cost and have access to more transfers with our multi-currency account.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-5 lg:flex-row-reverse'>
                    <div className='lg:w-[600px] lg:h-[400px] flex flex-col gap-7 items-center'>
                        <img src={pay} alt='pay'/>
                    </div>
                    <div className='lg:w-[500px] flex flex-col justify-center'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight'>Customers can Pay, Monitor and Collect all their goods on time in one place</h2>
                        <p className='font-normal lg:text-base text-sm text-left'>Normally, it can take up to 48hrs to confirm payments before your cargo is released.
                            With SpringPay, your payment will be confirmed in real-time with your logistics provider, while they release your cargo the same day,
                        </p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='lg:w-[600px] lg:h-[400px] flex flex-col gap-7 items-center'>
                        <img src={search} alt='search'/>
                    </div>
                    <div className='lg:w-[500px] flex flex-col justify-center'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight'>Customers can search for cargo businesses &amp; make payments in their preferred currency instantly</h2>
                        <p className='font-normal lg:text-base text-sm text-left'>Let our users search for various cargo vendors in one place, while they make payments to you in any currency.</p>
                    </div>
                </div>

                <div className='flex flex-col gap-5 lg:flex-row-reverse'>
                    <div className='lg:w-[600px] lg:h-[400px] flex flex-col gap-7 items-center'>
                        <img src={invoice} alt='invoice'/>
                    </div>
                    <div className='lg:w-[500px] flex flex-col justify-center'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight'>Generate Invoice, send in one click & get paid faster</h2>
                        <p className='font-normal lg:text-base text-sm text-left'>As a Cargo vendor, you can create and send an invoice right away to your clients anywhere in the world with a payment link attached.
                            Your clients can pay in one click with their card, bank transfer, or via Spring multi-currency account.
                            You can also track which invoices are unpaid and paid.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='lg:w-[600px] lg:h-[400px] flex flex-col gap-7 items-center'>
                        <img src={manage} alt='manage'/>
                    </div>
                    <div className='lg:w-[500px] flex flex-col justify-center'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight'>Manage all your customers communication in one place with ease.</h2>
                        <p className='font-normal lg:text-base text-sm text-left'>Bring convenience to your business by having all your preferred communication channels with your customers e.g WhatsApp, Instagram, Twitter, email, into one place.</p>
                    </div>
                </div>
                
            </div>
        </Section>
    )
}

const Section = styled.section`
    .head{
        
    }

    .btn{
        background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
        box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
        border-radius: 6px;
    }
`
export default Business