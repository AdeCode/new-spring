import React, { useState } from 'react'
import { useQuery } from 'react-query'
import customerService from '../../@services/customerService'
import CustomerTable from '../../components/@tables/CustomerTable'

function RecentCustomers() {
  const [currency, setCurrency] = useState('USD')

  const { data: customers, isLoading, error } = useQuery('invoices', customerService.fetchMerchantCustomers)
  customers && console.log(customers)

  return (
    <div className='flex flex-col gap-10'>
      {/* <h2 className='text-[#6A707E] text-2xl'>Welcome eSky Cargo Ltd,</h2> */}
      {
        isLoading ? 'Data loading...'
          :
          <CustomerTable
            data={customers}
            currency={currency}
          />
      }
    </div>
  )
}

export default RecentCustomers