import React, { useContext } from 'react'
import styled from 'styled-components'
import AlertBox from '../../components/AlertBox'
import ngn from '../../images/dashboard/ngn.png'
import uk from '../../images/dashboard/uk.png'
import usd from '../../images/dashboard/usd.png'
import pnd from '../../images/dashboard/pnd.png'
import card from '../../images/dashboard/card.png'
import CustomerTransaction from '../../components/@tables/CustomerTransaction'
import DoughnutChart from '../../components/@charts/DoughnutChart'
import PendingPayment from '../../components/@tables/PendingPayment'
import { AuthContext } from '../../contexts/AuthContexts'

function Dashboard() {

    const {state} = useContext(AuthContext)
    //console.log(state)

    return (
        <DashboardSection>
            <h2 className='font-normal text-lg text-gray'>Welcome {state.user.business_name},</h2>
            <AlertBox
                message='Please complete your compliance requirements to access our services (Click the settings button to complete your KYC requirements)'
            />
            <h2 className='font-bold text-lg text-gray'>Dashboard</h2>
            <div className='flex gap-2 mb-3'>
                <div className='card w-[250px] h-[150px] py-2 px-2'>
                    <div className='flex justify-between'>
                        <h3 className='text-base text-amber-600'>Total Invoices</h3>
                        <h2 className='text-gray font-medium'>0%</h2>
                    </div>
                </div>
                <div className='card w-[250px] h-[150px] py-2 px-2'>
                    <div className='flex justify-between'>
                        <h3 className='text-base text-amber-600'>Outstanding Invoices</h3>
                        <h2 className='text-gray font-medium'>0%</h2>
                    </div>
                </div>
                <div className='card w-[250px] h-[150px] py-2 px-2'>
                    <div className='flex justify-between'>
                        <h3 className='text-base text-amber-600'>Overdue Invoices</h3>
                        <h2 className='text-gray font-medium'>0%</h2>
                    </div>
                </div>
                <div className='card w-[250px] h-[150px] py-2 px-2'>
                    <div className='flex justify-between'>
                        <h3 className='text-base text-amber-600'>Paid Invoices</h3>
                        <h2 className='text-gray font-medium'>0%</h2>
                    </div>
                </div>
            </div>
            <div className='flex gap-[18px] flex-wrap mb-6'>
                <div className='flex flex-col w-[240px] px-3 py-4 bg-white rounded-md mb-5'>
                    <div className='flex justify-between mb-[10px]'>
                        <h2 className='text-[#708299] text-sm'>Available Wallet Balance</h2>
                        <img src={usd} alt='usd' />
                    </div>
                    <h2 className='font-bold text-base text-[#334D6E] mb-3'>US$345,350</h2>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold'>US$ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold text-end'>US$ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[240px] px-3 py-4 bg-white rounded-md mb-5'>
                    <div className='flex justify-between mb-[10px]'>
                        <h2 className='text-[#708299] text-sm'>Available Wallet Balance</h2>
                        <img src={ngn} alt='ngn' />
                    </div>
                    <h2 className='font-bold text-base text-[#334D6E] mb-3'>₦ 79,645,350</h2>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold'>₦ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold text-end'>₦ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[240px] px-3 py-4 bg-white rounded-md mb-5'>
                    <div className='flex justify-between mb-[10px]'>
                        <h2 className='text-[#708299] text-sm'>Available Wallet Balance</h2>
                        <img src={pnd} alt='pnd' />
                    </div>
                    <h2 className='font-bold text-base text-[#334D6E] mb-3'>€345,350</h2>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold'>€ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold text-end'>€ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[240px] px-3 py-4 bg-white rounded-md mb-5'>
                    <div className='flex justify-between mb-[10px]'>
                        <h2 className='text-[#708299] text-sm'>Available Wallet Balance</h2>
                        <img src={uk} alt='uk' />
                    </div>
                    <h2 className='font-bold text-base text-[#334D6E] mb-3'>£345,350</h2>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold'>£ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className='text-[#273240] text-[9px] opacity-80 font-semibold text-end'>£ 0</h3>
                            <h3 className='text-[#708299] text-[8px]'>Ledger Balance</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-5 min-w-[800px] mb-6'>
                <img src={card} alt='card' />
                <div className='bg-white rounded-md flex flex-col py-4 px-4 min-w-[220px]'>
                    <div className='flex justify-between mb-1'>
                        <h3 className='font-normal text-[#708299] text-[11px]'>Available Card Balance</h3>
                        <img src={usd} alt='usd' />
                    </div>
                    <div className=''>
                        <h2 className='font-bold text-lg text-blue_text'>US$5,350</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mb-6'>
                <div className='max-w-[850px]'>
                    <PendingPayment/>
                </div>
                <div className='bg-white p-2 w-[300px]'>
                    <DoughnutChart/>
                </div>
            </div>
            <CustomerTransaction/>
        </DashboardSection>
    )
}


const DashboardSection = styled.section`
    .card{
        box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
    }
`
export default Dashboard