import React, { useState } from 'react'
import { useQuery } from 'react-query'
import customerService from '../../@services/customerService'
import CustomerTable from '../../components/@tables/CustomerTable'
import {
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';

function RecentCustomers() {
  const [currency, setCurrency] = useState('USD')

  const [selectedCountry, setSelectedCountry] = useState('')


  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  const { data: customers, isLoading, error } = useQuery(['invoices',{selectedCountry}], customerService.fetchMerchantCustomers)

  const handleCountryChange = (e) => {
    setSelectedCountry(e.currentTarget.value)
  }

  const { data: countries, isLoading: countriesLoading } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
            }
        }
    )

  return (
    <div className='flex flex-col gap-10'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography color="#334D6E" variant="h2" sx={{ fontSize: '16px', paddingLeft: '12px', paddingTop: '20px' }}>
          Customers List
        </Typography>
        <div className='flex gap-2 items-center'>
          <h3 className='font-semibold'>Customer's Country</h3>
          <select name='country' onChange={handleCountryChange} className='py-2 px-3 ml-1 rounded-md text-blue_text border border-gray'>
          {
              countriesLoading ? <option value="">Loading...</option>
                :
                <>
                  <option value="">Select Country</option>
                  {
                    countries?.map((country, index) => {
                      return (
                        <option value={country.name} key={country.ise3}>{country.name}</option>
                      )
                    })
                  }
                </>
            }
          </select>
        </div>
      </Box>
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