import React, { useState } from 'react'
import InputField from '../components/@shared/InputField'
import port from '../images/business/port.jpeg'
import port1 from '../images/business/port1.jpeg'
import VendorCard from '../components/@shared/VendorCard'
import { useQuery } from 'react-query'
import merchantService from '../@services/merchantService'
import axios from 'axios'
import helperFunctions from '../@helpers/helperFunctions'
import styled from 'styled-components'

function SearchVendors() {
    const [selectedCountry, setSelectedCountry] = useState('')

    const { data: vendors, isLoading } = useQuery(['banks'], merchantService.getVendors)

    vendors && console.log('from vendors ', vendors.data)

    const handleCountryChange = (e) => {
        console.log(e.currentTarget.value)
        setSelectedCountry(e.currentTarget.value)
        //console.log(selectedCountry)
    }

    const handleSearch = (e) => {
        console.log(e.currentTarget.value)
    }

    const { data: businessCategory, isLoading: businessCategoryLoading, error: businessCategoryError } = useQuery(['business_categories'], merchantService.getBusinessCategories)
    // businessCategory && console.log(businessCategory.data)

    const { data: countries, isLoading: countriesLoading, error } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                //console.log(res.data.data);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    )

    const { data: state, isLoading: statesLoading } = useQuery(['states', { selectedCountry }],
        async () => {
            try {
                const res = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`,
                    {
                        "country": selectedCountry
                    });
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        { enabled: !!selectedCountry }
    )
    state && console.log('states ', state.states)

    return (
        <Container className='w-full'>
            <div className='px-[200px] w-full flex flex-col items-center py-[100px]'>
                <h2 className='text-[#263238] text-5xl mb-14'>Spring Businesses. Worldwide. All in one place.</h2>
                <div className='w-full'>
                    <div className='flex gap-5 mb-10 w-full justify-between'>
                        <select name='country' className='w-[350px] py-2' onChange={(e) => handleCountryChange(e)}>
                            {
                                countriesLoading ? <option value="">Loading...</option>
                                    :
                                    <>
                                        <option value="">Select Country</option>
                                        {
                                            countries?.map(country => {
                                                return (
                                                    <option value={country.name} key={country.iso3}>{country.name}</option>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </select>
                        <select name='state' className='w-[350px]'>
                            {

                                statesLoading ? <option value="">Loading...</option> :
                                    <>
                                        {
                                            state?.states.map(state => {
                                                return (
                                                    <option
                                                        value={state.name}
                                                        key={state.name}
                                                    >
                                                        {state.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </select>
                        <select name='category' className='w-[350px]'>
                            {
                                businessCategoryLoading ? <option value="">Loading...</option>
                                    :
                                    <>
                                        <option value="">Select Category</option>
                                        {
                                            businessCategory?.data.map(category => {
                                                return (
                                                    <option value={category.category_name} key={category.id}>{category.category_name}</option>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </select>
                    </div>
                    <div className='flex w-full'>
                        <input type='text' className='flew grow px-4' name='search' onChange={handleSearch} placeholder='search vendors' />
                        <span className='w-[50px] bg-green-800 flex text-white py-3 justify-center items-center'>
                            <span class="material-symbols-outlined">search</span>
                        </span>
                    </div>

                    <h3 className='text-center text-xl font-semibold my-4'>Vendors</h3>
                    <div className='flex flex-wrap gap-6 justify-between'>
                        <VendorCard
                            name='Gig Logistics'
                            description='We are providing premier multimodal logistics and supply chain consulting throughout Nigera.'
                            image={port1}
                            address='22, Adeola Odeku, Victoria Island Lagos, Nigera.'
                        />
                        <VendorCard
                            name='Gig Logistics'
                            description='We are providing premier multimodal logistics and supply chain consulting throughout Nigera.'
                            image={port}
                            address='22, Adeola Odeku, Victoria Island Lagos, Nigera.'
                        />
                        <VendorCard
                            name='Gig Logistics'
                            description='We are providing premier multimodal logistics and supply chain consulting throughout Nigera.'
                            image={port}
                            address='22, Adeola Odeku, Victoria Island Lagos, Nigera.'
                        />
                        <VendorCard
                            name='Gig Logistics'
                            description='We are providing premier multimodal logistics and supply chain consulting throughout Nigera.'
                            image={port}
                            address='22, Adeola Odeku, Victoria Island Lagos, Nigera.'
                        />
                        {
                            vendors?.data?.business.map(vendor => {
                                return (
                                    <VendorCard
                                        name={vendor.business_name}
                                        description={vendor.description}
                                        image={vendor.business_logo}
                                        address={vendor.office_address_number + ' ' + vendor.official_address}
                                        imageAlt={vendor.business_name}
                                        key={vendor.id}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </Container>
    )
}

const Container = styled.div`
  select, input{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }
  select:focus, input:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }
`
export default SearchVendors