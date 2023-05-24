import React, { useContext } from 'react'
import {AuthContext} from '../../contexts/AuthContexts'

function InvoiceFooter() {
    const {state} = useContext(AuthContext)

    //console.log(state);
    const prefixAtUsername = (str) => {
        if(str.charAt(0) !== '@'){
            return '@'+str
        }else return str
    }

    // console.log(prefixAtUsername('@kokofoundation'))
  return (
    <div className='flex text-black mt-12 justify-between'>
        <div className='flex flex-col'>
            <h2 className='font-normal text-xl'>Business Name</h2>
            <h3 className='font-bold'>{state && state.user.business_name}</h3>
        </div>
        <div className='flex flex-col'>
            <h2 className='font-normal text-xl'>Business Tag Name</h2>
            <h3 className='font-bold'>{state && prefixAtUsername(state.user.business_username)}</h3>
        </div>
        <div className='flex flex-col lg:w-[300px]'>
            <h2 className='font-normal text-xl'>Business NGN Bank Account</h2>
            <div className='flex flex-col'>
                <h3 className=''>Account Name: GIG LOGISTICS INTL EXP LTD</h3>
                <h3 className=''>Account Number: 006862976</h3>
                <h3 className=''>Beneficiary Bank: STERLING BANK</h3>
            </div>
        </div>
        <div className='flex flex-col lg:w-[300px]'>
            <h2 className='font-normal text-xl'>Business USD Bank Account</h2>
            <div className='flex flex-col'>
                <h3 className=''>Account Name: GIG LOGISTICS INTL EXP LTD</h3>
                <h3 className=''>Account Number: 006862976</h3>
                <h3 className=''>Beneficiary Bank: STERLING BANK</h3>
            </div>
        </div>
    </div>
  )
}

export default InvoiceFooter