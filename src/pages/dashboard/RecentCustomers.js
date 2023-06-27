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
    console.log(currency)
  }

  const { data: customers, isLoading, error } = useQuery('invoices', customerService.fetchMerchantCustomers)
  //customers && console.log(customers)

  const handleCountryChange = (e) => {
    setSelectedCountry(e.currentTarget.value)
    console.log(selectedCountry)
  }

  const { data: countries, isLoading: countriesLoading } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
                console.log(error)
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