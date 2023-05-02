import React, { useState } from 'react'
import styled from 'styled-components'
import desk from '../images/home/desk.png'
import payment from '../images/home/payment.png'
import freight from '../images/home/freight.png'
import search from '../images/home/search.png'
import reports from '../images/home/reports.png'
import card from '../images/home/card.png'
import {validate} from '../common/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
    const [formData, setFormData] = useState({
        email: '',
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        //console.log(formData)
    }

    async function submitForm(e) {
        e.preventDefault()
        console.log('submitting')
        if(validate(formData.email) === false) {
            return toast.error("The email field can not be empty.")
        }
        if(validate(formData.user_type) === false) {
            return toast.error("Please select a user type.")
        }
        await fetch('https://geolocation-db.com/json/', { method: 'GET' }).then((res) => {
            res.json().then((json) => {
                console.log(json)
                const bodyParams = {
                    "email": formData.email,
                    "businessName":formData.businessName,
                    "phoneNumber":formData.phoneNumber,
                    "ip_address": json.IPv4,
                    "city": json.city,
                    "state": json.state,
                    "country": json.country_name,
                    "latitude": json.latitude,
                    "longitude": json.longitude,
                    "form": 1
                };
                console.log(bodyParams)

                fetch('https://qipbzv4fxl.execute-api.us-east-1.amazonaws.com/sandbox/admin/dashboard/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyParams)
                })
                    .then((data) => {
                        data.json().then((res) => {
                            console.log(res)
                            toast("You have joined the waiting list succesfully.")
                        });
                    })
                    .catch((err) => toast("An Error Occured!"));
            })

        })
    }

  return (
    <Section className='flex flex-col w-full'>
        <div className='bg-[#EFFCF3] w-full flex flex-col justify-center items-center pb-8'>
            <h1 className='lg:w-[1039px] lg:mb-10 text-left lg:text-center text-[26px] lg:text-[40px] font-semibold lg:font-normal leading-9 lg:leading-[53px]'>
                Seamless Global Banking & Management Solution for Freight Businesses in Africa.        
            </h1>
            <p className='text-blue lg:w-[776px] text-center mb-20 text-xl font-medium'>Time automate and scale your freight business to process payments quickly, manage and monitor from anywhere.</p>
            <div className='flex items-center'>
                <h2 className='font-normal text-3xl lg:w-[580px]'>Spring is your all-in-one payment, management & communication platform for freight & logistic business.</h2>
                <div className='w-[700px] h-[500px]'>
                    <img src={desk} alt='spring'/>
                </div>
            </div>
            <div className='flex justify-center'>
                <form className='w-[500px] text-white'>
                    <div className='flex lg:mb-4 gap-3 justify-between w-full'>
                        <div className='form-group w-[50%]'>
                            <input type='text' name='businessName' onChange={handleInputChange} placeholder='Business name' className='py-2 px-2 rounded-lg w-full bg-[#6d52a7] text-white'/>
                        </div>
                        <div className='form-group w-[50%]'>
                            <input type='text' name='phoneNumber' onChange={handleInputChange} placeholder='Phone Number' className='py-2 px-2 rounded-lg w-full bg-[#6d52a7] text-white'/>
                        </div>
                    </div>
                    <div className='form-group mb-4 w-full'>
                        <input type='text' name='email' onChange={handleInputChange} placeholder='Email Address'  className='py-2 px-2 rounded-lg w-full bg-[#6d52a7] text-white'/>
                    </div>
                    <button type='submit' onClick={submitForm} className='text-[#6942C2] bg-white py-2 w-full'>Join our Vendor Network</button>
                </form>
            </div>
            
        </div>
        <div className='bg-[#D3FDE0] py-[80px]'>
            <div className='flex justify-center mb-[100px] gap-6'>
                <div className='flex flex-col w-[461px]'>
                    <h2 className='mb-5 font-medium text-[40px] leading-tight text-left '>Make an instant Cross-border Payment for your Cargo Release</h2>
                    <h3 className='font-normal text-base text-left'>Instead of stressful way of exchanging currencies to pay your cargo vendor, you can make use of Spring multi-currency solution (mobile app or web) to make an instant payment.
                    Your payment will be confirmed in real-time with your cargo vendor.</h3>
                </div>
                <img src={payment} alt='payment' width='600px' height='450px'/>
            </div>
            <div className='flex flex-row-reverse justify-center mb-[100px] gap-6'>
                <div className='flex flex-col w-[461px]'>
                    <h2 className='mb-5 font-medium text-[40px] leading-tight text-left'>Let your freight business reach new markets with foreign currency accounts</h2>
                    <h3 className='font-normal text-base text-left'>Open business accounts in EUR, GBP & USD within minutes. 
                        Generate instant invoice and accept payments from international customers in their preferred currency.
                        You can also hold and pay in foreign currency, or make payout in the same currency, or convert and withdraw in USD using outstanding FX rates.
                    </h3>
                </div>
                <img src={freight} alt='freight' width='600px' height='450px'/>
            </div>
            <div className='flex justify-center mb-[100px] gap-6'>
                <div className='flex flex-col w-[461px]'>
                <h2 className='mb-5 font-medium text-[40px] leading-tight text-left'>Search for freight businesses, make request and payments in one place</h2>
                <h3 className='font-normal text-base text-left'>You can search for various cargo vendors and other SMEs all in one place, while you make payment in any currency.</h3>
                </div>
                <img src={search} alt='search' width='600px' height='450px'/>
            </div>
            <div className='flex flex-row-reverse justify-center mb-[100px] gap-6'>
                <div className='flex flex-col w-[461px]'>
                    <h2 className='mb-5 font-medium text-[40px] leading-tight text-left'>Skip manual reports and manage all your customers information & transactions in one place</h2>
                    <h3 className='font-normal text-base text-left'>Take control of your business, manage your customer’s information, paying clients and transactions in one place.
                        Export clean transaction data directly in csv and upload to any accounting software. This saves you hours on manual accounting & bookkeeping.
                    </h3>
                </div>
                <img src={reports} alt='reports' width='600px' height='450px'/>
            </div>
            <div className='flex justify-center mb-[100px] gap-6'>
                <div className='flex flex-col w-[461px]'>
                    <h2 className='mb-5 font-medium text-[40px] leading-tight text-left'>Take advantage of our borderless 3D secure virtual USD & NAIRA Cards</h2>
                    <h3 className='font-normal text-base text-left'>Manage Online subscriptions seamlessly make payments online or even issue team members virtual dollar cards while being protected from overcharges and fraud.
                    </h3>
                </div>
                <img src={card} alt='card' width='600px' height='450px'/>
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