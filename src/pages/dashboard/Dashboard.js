import React, { useContext } from 'react'
import styled from 'styled-components'
import AlertBox from '../../components/AlertBox'
import PendingPayment from '../../components/@tables/PendingPayment'
import { AuthContext } from '../../contexts/AuthContexts'
import { useQuery } from 'react-query'
import invoiceService from '../../@services/invoiceService'
import { ThreeDots } from 'react-loader-spinner'
import merchantService from '../../@services/merchantService'


function Dashboard() {

    const { state } = useContext(AuthContext)

    const { data: invoices, isLoading, error } = useQuery(['invoices'], invoiceService.getInvoices)

    const { data: unpaidInvoices, isLoading:unpaidLoading } = useQuery(['invoices',{ status:'UNPAID',currency:''}], invoiceService.getAllInvoices)

    const { data: profile } = useQuery(['merchant_profile'], merchantService.getMerchantProfile)
    return (
        <DashboardSection>
            <h2 className='font-normal text-lg text-gray'>Welcome {profile?.data?.profile?.business_name},</h2>
            {
                (!profile?.data?.bank_account_detail || !profile?.data?.merchant_account_profile || !profile?.data?.profile) &&
                <AlertBox
                    message='Please complete your compliance requirements to access our services (Click the settings button to complete your KYC requirements)'
                />
            }
            
            <h2 className='font-bold text-lg text-gray'>Dashboard</h2>
            {
                isLoading ?
                    <div className='flex w-full justify-center'>
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
                    :
                    <div className='flex gap-2 mb-3'>
                    <div className='card flex flex-col justify-between w-[250px] h-[150px] py-4 px-2'>
                        <div className='flex justify-between'>
                            <h3 className='text-base text-amber-600'>Total Invoices</h3>
                            <h2 className='text-green-700 font-medium'>0%</h2>
                        </div>
                        <div className=''>
                            <h2 className='text-green-700 text-3xl font-medium'>{invoices?.analysis?.total_invoice}</h2>
                        </div>
                    </div>
                    <div className='card w-[250px] h-[150px] flex flex-col justify-between py-4 px-2'>
                        <div className='flex justify-between'>
                            <h3 className='text-base text-amber-600'>Outstanding Invoices</h3>
                            <h2 className='text-green-700 font-medium'>{(invoices?.analysis?.outstanding_percentage)?.toFixed(2)} %</h2>
                        </div>
                        <div className=''>
                            <h2 className='text-green-700 text-3xl font-medium'>{invoices?.analysis?.outstanding_invoices}</h2>
                        </div>
                    </div>
                    <div className='card w-[250px] h-[150px] flex flex-col justify-between py-4 px-2'>
                        <div className='flex justify-between'>
                            <h3 className='text-base text-amber-600'>Overdue Invoices</h3>
                            <h2 className='text-green-700 font-medium'>{(invoices?.analysis?.overdue_percentage)?.toFixed(2)} %</h2>
                        </div>
                        <div className=''>
                            <h2 className='text-green-700 text-3xl font-medium'>{invoices?.analysis?.overdue_invoices}</h2>
                        </div>
                    </div>
                </div>
            }
            
            <div className='flex justify-between mb-6'>
                <div className='w-full'>
                    {
                        unpaidLoading ?
                        <div className='flex w-full justify-center'>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#4fa94d"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </div>
                        :
                        <PendingPayment 
                            data={unpaidInvoices?.invoices}
                        />
                    }
                    
                </div>
            </div>
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