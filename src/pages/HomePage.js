import React from 'react'
import styled from 'styled-components'
import desk from '../images/home/desk.png'
import dskM from '../images/home/dskM.png'
import payment from '../images/home/payment.png'
import freight from '../images/home/freight.png'
import search from '../images/home/search.png'
import reports from '../images/home/reports.png'
import card from '../images/home/card.png'
import access from '../images/home/access.png'
import invoicing from '../images/home/invoicing.png'
import seamless from '../images/home/seamless-payment.png'
import easy from '../images/home/easy-process.png'
import digital from '../images/home/digital.png'
import providus from '../images/home/providus.png'
import providusmobile from '../images/home/providusmobile.png'
import bridgemobile from '../images/home/bridgemobile.png'
import bridgecard from '../images/home/bridgecard.png'
import WaitListForm from '../components/WaitListForm'
import {Link } from "react-router-dom"


function HomePage() {
    return (
        <Section className='flex flex-col w-full'>
            <div className="flex w-full md:bg-cargoBg bg-cargoBgMob md:h-screen h-[270px] bg-center bg-cover">
                <div className='bg-bgCover w-full h-full flex flex-col justify-center items-center'>
                    <h2 className='text-white font-bold md:text-6xl text-xl text-center lg:w-[980px] lg:mb-[100px] mb-8'>Digitizing Freight Management, Documentation &amp; Payments.</h2>
                    <div className='flex gap-4'>
                        <Link to='/' className='text-white text-center cursor-pointer text-lg py-3 md:w-[182px] w-[130px] font-semibold rounded-md btn'>Login</Link>
                        <Link to='/business-signup' className='text-lg py-3 text-center cursor-pointer md:w-[182px] w-[130px] font-semibold rounded-md bg-white text-green-800'>Sign Up</Link>
                        {/* <button className='text-white text-lg py-3 md:w-[182px] w-[130px] font-semibold rounded-md bg-green-700'>Login</button> */}
                        {/* <button className='text-lg py-3 md:w-[182px] w-[130px] font-semibold rounded-md bg-white text-green-800'>Sign Up</button> */}
                    </div>
                </div>
            </div>
            <div className='bg-[#D3FDE0] w-full flex flex-col items-center py-7 px-4'>
                <h2 className='mb-5 font-medium md:text-4xl text-base lg:w-[1000px] md:w-[600px] text-center'>WE BELIEVE IN INNOVATION &amp; COLLABORATION BY BRINGING GLOBAL DIGITIZATION SOLUTION TO FREIGHT MANAGEMENT &amp; PAYMENTS.</h2>
                <p className='text-[#979797] md:text-2xl text-sm lg:px-[200px] text-center md:mb-[135px] mb-10'>We help freight businesses either via Air, Ocean &amp; Inland Transport, manage their entire process of item collection of cargo goods, invoicing customers across the globe, collecting payments and generating port manifest across the globe for last mile distribution.</p>
                <a 
                    href='https://calendly.com/spring_freight/30min' 
                    target='blank'
                    className='text-white text-center cursor-pointer btn text-2xl font-semibold py-4 lg:w-[300px] rounded-md px-4'
                >BOOK A DEMO
                </a>
                {/* <button className='text-white bg-green-700 text-2xl font-semibold py-4 lg:w-[300px] rounded-md px-4'>BOOK A DEMO</button> */}
            </div>
            <div className='bg-[#EFFCF3] py-[80px] px-5 flex flex-col gap-[70px] md:flex-row justify-center md:gap-20'>
                <div className='flex flex-col md:w-[360px]'>
                    <div className='flex justify-center mb-10'>
                        <img src={invoicing} alt='invoicing'/>
                    </div>
                    <h3 className='mb-[22px] font-medium md:text-3xl text-2xl'>Invoicing &amp; Collaboration</h3>
                    <p className='text-left'>Invoice your new &amp; returning customers, while you also create and  share freight manifest information with your colleagues at country dest. </p>
                </div>
                <div className='flex flex-col md:w-[360px]'>
                    <div className='flex justify-center mb-10'>
                        <img src={seamless} alt='seamless payments'/>
                    </div>
                    <h3 className='mb-[22px] font-medium md:text-3xl text-2xl'>Tracking &amp; Seamless Payment</h3>
                    <p className='text-left'>Get corporate account with business virtual wallet for all payments and track all paid invoices across different regions, while you forget about manual paper work.</p>
                </div>
                <div className='flex flex-col md:w-[360px]'>
                    <div className='flex justify-center mb-10'>
                        <img src={access} alt='access'/>
                    </div>
                    <h3 className='mb-[22px] font-medium md:text-3xl text-2xl'>Communication &amp; Access Control</h3>
                    <p className='text-left'>Keep up communication with your customers daily and control workers access easily across regions.</p>
                </div>
            </div>
            <div className='bg-[#D3FDE0] py-[80px] px-5'>
                <div className='flex flex-col-reverse lg:flex-row justify-center items-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[46px] text-2xl leading-tight'>Fast &amp; Easy Process</h2>
                        <h3 className='font-normal lg:text-base text-sm md:text-left'>This is the end of paper invoicing to process daily cargo goods, using our platform to generate invoice, manage customers, collect payments etc. eliminates anything paper work instantly.</h3>
                    </div>
                    <img src={easy} alt='easy process' width='600px' height='450px' />
                </div>
                <div className='flex flex-col-reverse lg:flex-row-reverse justify-center mb-[100px] gap-6'>
                    <div className='flex flex-col lg:w-[461px]'>
                        <h2 className='mb-5 font-medium lg:text-[40px] text-2xl leading-tight text-left'>Digitization at your finger tips</h2>
                        <h3 className='font-normal lg:text-base text-sm md:text-left'>All digital documentation of your customer’s freight, payment history, proper addressing systems etc. will always be visible to you &amp; your team across the globe.
                        </h3>
                    </div>
                    <img src={digital} alt='digital' width='600px' height='450px' />
                </div>
            </div>
            <div className='bg-[#EFFCF3] py-[80px] px-5 flex flex-col items-center'>
                <h2 className='font-medium md:text-[56px]'>Our Partners</h2>
                <div className='flex md:gap-9'>
                    <img src={providus} alt='providus' className='hidden md:flex'/>
                    <img src={providusmobile} alt='providus' className='md:hidden'/>
                    <img src={bridgecard} alt='bridgecard' className='hidden md:flex'/>
                    <img src={bridgemobile} alt='providus' className='md:hidden'/>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
    margin:0;
    padding: 0;

    .btn{
        background: var(--demo-1, linear-gradient(128deg, #6199DB 0%, #4BCA69 100%));
box-shadow: 0px 1px 2px 0px rgba(105, 81, 255, 0.05);

    }
`

export default HomePage