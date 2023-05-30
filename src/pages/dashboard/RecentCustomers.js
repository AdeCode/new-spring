import React, { useState } from 'react'
import { useQuery } from 'react-query'
import customerService from '../../@services/customerService'
import CustomerTable from '../../components/@tables/CustomerTable'
import {
  Typography,
  Box
} from '@mui/material';

function RecentCustomers() {
  const [currency, setCurrency] = useState('USD')

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
    console.log(currency)
  }

  const { data: customers, isLoading, error } = useQuery('invoices', customerService.fetchMerchantCustomers)
  customers && console.log(customers)

  return (
    <div className='flex flex-col gap-10'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography color="#334D6E" variant="h2" sx={{ fontSize: '16px', paddingLeft: '12px', paddingTop: '20px' }}>
          Recent Customers
        </Typography>
        {/* <Typography variant="h5" sx={{ fontSize: '16px' }}>
          Select Invoice Currency
          <select name='currency' onChange={handleCurrencyChange} className='py-3 px-3 ml-1 rounded-md text-blue_text border border-gray'>
            <option value='USD' defaultValue>USD</option>
            <option value='Naira' >Naira</option>
          </select>
        </Typography> */}
      </Box>
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