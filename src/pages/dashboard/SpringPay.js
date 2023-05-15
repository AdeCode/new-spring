import React from 'react'
import styled from 'styled-components';

function SpringPay() {
    const accountNumber = '0238958584'
  return (
    <Div className='flex justify-center flex-col items-center'>
        <div className='flex flex-col items-center mb-10'>
            <h1 className='font-bold text-5xl mb-8'>SpringPay</h1>
            <h3 className='font-bold text-2xl text-lightDark mb-8'>Add/Receive NGN</h3>
            <h4 className='mb-6 font-semibold text-gray text-xl'>You can receive or add money to your Naria Virtual Account Number</h4>
            <p className='lg:max-w-[600px] text-center font-normal text-[#20173D] text-base'>You or anyone else can make a transfer to this account number and your spring Naira wallet will be funded immediately.</p>
        </div>
        <div className='flex justify-center lg:mb-9'>
            <div className='flex flex-col items-center py-[13px] lg:w-[338px] account'>
                <h3 className='font-normal text-xs text-[#555B6A] mb-[11px]'>Spring Account number</h3>
                <h2 className='font-bold text-base text-blackText mb-[17px]'>{accountNumber}</h2>
                <span className='bg-[#E7ECED] text-xs cursor-pointer mb-[18px] flex gap-[7px] items-center py-[5px] px-[10px] rounded-xl text-[#4BCA69]' 
                onClick={() => {navigator.clipboard.writeText(accountNumber);}}><span class="material-symbols-outlined">content_copy</span>COPY</span>
                <h4 className='text-[#555B6A] font-normal text-[10px]'>Powered by FCMB</h4>
            </div>
        </div>
        <div className='w-[450px]'>
            <h2 className='text-left text-[#20173D] text-xl uppercase mb-6'>How to transfer money to your spring naira wallet </h2>
            <ol className='list-decimal ml-3 text-[#20173D] font-normal text-[18px]'>
                <li>Login to your bank app</li>
                <li>Click on your menu icon and select ‘Transfer Money</li>
                <li>Select ‘Other Accounts’</li>
                <li>Choose FCMB from the list of Banks</li>
                <li>Enter your spring naria account-0238958584</li>
                <li>Confirm your name and enter your PIN or toketo make payment</li>
            </ol>
        </div>
        
    </Div>
  )
}

const Div = styled.div`
    .account{
        background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);
        border-radius: 7px;
    }
`

export default SpringPay