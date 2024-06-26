import React from 'react'
import styled from 'styled-components'
import desk from '../images/home/desk.png'
import dskM from '../images/home/dskM.png'
import payment from '../images/home/payment.png'
import freight from '../images/home/freight.png'
import search from '../images/home/search.png'
import reports from '../images/home/reports.png'
import card from '../images/home/card.png'
import WaitListForm from '../components/WaitListForm'

function HomePage() {
    return (
        <Section className='flex flex-col w-full'>
            <div className='bg-[#EFFCF3] w-full flex flex-col lg:justify-center lg:items-center pb-8 px-5 lg:px-0 lg:pt-6'>
                <h1 className='lg:w-[1039px] mb-10 text-left lg:text-center text-[26px] lg:text-[40px] font-semibold lg:font-normal leading-9 lg:leading-[53px]'>
                    Seamless Global Banking & Management Solution for Freight Businesses in Africa.
                </h1>
                <p className='text-blue hidden lg:flex lg:w-[776px] lg:text-center text-left lg:mb-20 text-xl font-medium'>Time automate and scale your freight business to process payments quickly, manage and monitor from anywhere.</p>
                <div className='flex flex-col mb-5 lg:flex-row lg:items-center'>
                    <h2 className='lg:font-normal text-blue lg:text-black lg:text-3xl text-sm font-bold lg:w-[580px] text-left mb-5'>Spring is your all-in-one payment, management & communication platform for freight & logistic business.</h2>
                    <div className='lg:w-[700px] lg:h-[500px]'>
                        <img src={desk} alt='spring' />
                    </div>
                </div>
                <WaitListForm/>
            </div>
            <div className='bg-[#D3FDE0] py-[80px] px-5'>
                <div className='flex flex-col-reverse lg:flex-row justify-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight'>Make an instant Cross-border Payment for your Cargo Release</h2>
                        <h3 className='font-normal lg:text-base text-sm text-left'>Instead of stressful way of exchanging currencies to pay your cargo vendor, you can make use of Spring multi-currency solution (mobile app or web) to make an instant payment.
                            Your payment will be confirmed in real-time with your cargo vendor.</h3>
                    </div>
                    <img src={payment} alt='payment' width='600px' height='450px' />
                </div>
                <div className='flex flex-col-reverse lg:flex-row-reverse justify-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight text-left'>Let your freight business reach new markets with foreign currency accounts</h2>
                        <h3 className='font-normal lg:text-base text-sm text-left'>Open business accounts in EUR, GBP & USD within minutes.
                            Generate instant invoice and accept payments from international customers in their preferred currency.
                            You can also hold and pay in foreign currency, or make payout in the same currency, or convert and withdraw in USD using outstanding FX rates.
                        </h3>
                    </div>
                    <img src={freight} alt='freight' width='600px' height='450px' />
                </div>
                <div className='flex flex-col-reverse lg:flex-row justify-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight text-left'>Search for freight businesses, make request and payments in one place</h2>
                        <h3 className='font-normal lg:text-base text-sm text-left'>You can search for various cargo vendors and other SMEs all in one place, while you make payment in any currency.</h3>
                    </div>
                    <img src={search} alt='search' width='600px' height='450px' />
                </div>
                <div className='flex flex-col-reverse lg:flex-row-reverse justify-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight text-left'>Skip manual reports and manage all your customers information & transactions in one place</h2>
                        <h3 className='font-normal lg:text-base text-sm text-left'>Take control of your business, manage your customer’s information, paying clients and transactions in one place.
                            Export clean transaction data directly in csv and upload to any accounting software. This saves you hours on manual accounting & bookkeeping.
                        </h3>
                    </div>
                    <img src={reports} alt='reports' width='600px' height='450px' />
                </div>
                <div className='flex flex-col-reverse lg:flex-row justify-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight text-left'>Take advantage of our borderless 3D secure virtual USD & NAIRA Cards</h2>
                        <h3 className='font-normal lg:text-base text-sm text-left'>Manage Online subscriptions seamlessly make payments online or even issue team members virtual dollar cards while being protected from overcharges and fraud.
                        </h3>
                    </div>
                    <img src={card} alt='card' width='600px' height='450px' />
                </div>
            </div>

        </Section>
    )
}

const Section = styled.section`
    margin:0;
    padding: 0;
`

export default HomePage