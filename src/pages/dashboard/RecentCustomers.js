import React from 'react'
import CustomerTable from '../../components/@tables/CustomerTable'

function RecentCustomers() {
  return (
    <div className='flex flex-col gap-10'>
        <h2 className='text-[#6A707E] text-2xl'>Welcome eSky Cargo Ltd,</h2>
        <CustomerTable/>
    </div>
  )
}

export default RecentCustomers