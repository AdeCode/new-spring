import React, { useState } from 'react'
import InputField from '../components/@shared/InputField'
import port from '../images/business/port.jpeg'
import port1 from '../images/business/port1.jpeg'
import avatar from '../images/business/avatar.png'
import containers from '../images/business/containers.jpeg'
import VendorCard from '../components/@shared/VendorCard'
import { useQuery } from 'react-query'
import merchantService from '../@services/merchantService'
import axios from 'axios'
import helperFunctions from '../@helpers/helperFunctions'
import styled from 'styled-components'
import { ThreeDots } from 'react-loader-spinner'

function SearchVendors() {
    const [selectedCountry, setSelectedCountry] = useState('')

    const [businessName, setBusinessName] = useState('')

    const { data: vendors, isLoading } = useQuery(['vendors',{businessName}], merchantService.getVendors)

    vendors && console.log('from vendors ', vendors.data)

    const handleCountryChange = (e) => {
        console.log(e.currentTarget.value)
        setSelectedCountry(e.currentTarget.value)
        //console.log(selectedCountry)
    }

    const handleSearch = (e) => {
        setBusinessName(e.currentTarget.value)
        //console.log(e.currentTarget.value)
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
        <Container className='w-full min-h-screen'>
            <div className='px-[200px] w-full flex flex-col items-center py-[50px]'>
                {/* <h2 className='text-[#263238] text-5xl mb-14'>Spring Businesses. Worldwide. All in one place.</h2> */}
                <div className='w-full'>
                    {/* <div className='flex gap-5 mb-10 w-full justify-between'>
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
                    </div>*/}
                    <div className='flex w-full'>
                        <input type='text' className='flew grow px-4' name='search' onChange={handleSearch} placeholder='Enter vendors names' />
                        <span className='w-[50px] bg-green-800 flex text-white py-3 justify-center items-center'>
                            <span class="material-symbols-outlined">search</span>
                        </span>
                    </div> 

                    {/* <h3 className='text-center text-xl font-semibold mb-4'>FREIGHT/CARGO COMPANIES</h3> */}
                    <h2 className='text-[#263238] text-4xl py-8 text-center'>FREIGHT/CARGO COMPANIES</h2>
                        {/* 
                        <VendorCard
                            name='Gig Logistics'
                            description='We are providing premier multimodal logistics and supply chain consulting throughout Nigera.'
                            image={port}
                            address='22, Adeola Odeku, Victoria Island Lagos, Nigera.'
                        /> */}
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
                            <div className='flex flex-wrap gap-4'>
                                {/* <div className='card px-5 py-3 bg-white max-w-[350px] min-w-[350px] rounded-xl flex flex-col justify-between mb-3 max-h-[220px]'>
                                    <div className='max-h-[100px] min-h-[100px] flex justify-between'>
                                        <img className='w-[80px] h-[80px] rounded-[50%] object-cover' src={avatar} alt='vendor'/>
                                        <div className='flex flex-col'>
                                            <h3 className='font-semibold text-xl text-right mb-2'>Fortnight Inc</h3>
                                            <p className='text-gray text-xs w-[170px] text-right'>Entertainment, music and video productions, and promotions.</p>
                                        </div>
                                    </div>
                                    <hr className='text-gray'/>
                                    <div className='flex flex-col gap-2 bg-white h-auto'>
                                        <span className='flex gap-2'>
                                            <span class="material-symbols-outlined text-green-800">call</span>
                                            <h3 className='text-base'>08190221232</h3>
                                        </span>
                                        <span className='flex gap-2'>
                                            <span class="material-symbols-outlined text-green-800">home_pin</span>
                                            <h3 className='text-base'>Lagos, Nigeria.</h3>
                                        </span>
                                    </div>
                                </div> */}
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
                                                phone={vendor?.phone}
                                            />
                                        )
                                    })
                                }
                            </div>
                            
                        }
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
  .card{
        box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
    }
`
export default SearchVendors