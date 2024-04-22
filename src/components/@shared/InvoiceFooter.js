import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import styled from 'styled-components';
import merchantService from '../../@services/merchantService';
import {AuthContext} from '../../contexts/AuthContexts'

function InvoiceFooter() {
    const { data: profile, isLoading, error } = useQuery(['merchant_profile'], merchantService.getMerchantProfile)

    const prefixAtUsername = (str) => {
        if(str.charAt(0) !== '@'){
            return '@'+str
        }else return str
    }

  return (
    <Section className='flex text-black mt-12 justify-between'>
        <div className='flex flex-col'>
            <h2 className='font-bold text-base'>Business Name</h2>
            <h3 className='font-normal'>{profile && profile?.data?.profile?.business_name}</h3>
        </div>
        <div className='flex flex-col'>
            <h2 className='font-bold text-base'>Business Tag Name</h2>
            <h3 className='font-normal'>{profile && prefixAtUsername(profile?.data?.profile?.business_owner_username)}</h3>
        </div>
        <div className='flex flex-col lg:w-[280px]'>
            <h2 className='font-bold text-base'>Business NGN Bank Account</h2>
            <div className='flex flex-col'>
                {
                        profile?.data?.bank_account_detail ?
                        <div className='flex flex-col'>
                            <h3 className=''>Account Name: {profile?.data?.bank_account_detail?.bank_account_name}</h3>
                            <h3 className=''>Account Number: {profile?.data?.bank_account_detail?.bank_account_number}</h3>
                            <h3 className=''>Beneficiary Bank: {profile?.data?.bank_account_detail?.bank_name}</h3>
                        </div>
                        :
                        <h2 className='text-base font-normal'>Please update your profile</h2>                    
                        
                    }
            </div>
        </div>
        <div className='noprint flex flex-col lg:w-[280px]'>
            <h2 className='font-bold text-xl lg:text-base'>Business USD Bank Account</h2>
            <div className='flex flex-col'>
                <div className='flex flex-col rounded-[10px] py-2 items-center px-1'>
                    <h2 className='text-base font-normal text-center'>Create a Business USD, GBP &amp; EURO Bank Account</h2>
                    <p className='font-bold text-base'>Coming soon!</p>
                </div>
            </div>
        </div>
    </Section>
  )
}

const Section = styled.section`
    .noprint{
        @media print{
            display:none;
        }
    }
`

export default InvoiceFooter