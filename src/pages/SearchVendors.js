import React, { useState } from 'react'
import VendorCard from '../components/@shared/VendorCard'
import { useQuery } from 'react-query'
import merchantService from '../@services/merchantService'
import axios from 'axios'
import helperFunctions from '../@helpers/helperFunctions'
import styled from 'styled-components'
import { ThreeDots } from 'react-loader-spinner'
import Modal from '@mui/material/Modal';
import VendorSearchResult from './auth/merchant/VendorSearchResult'
import { toast } from 'react-toastify'

function SearchVendors() {
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedMerchantId, setSelectedMerchantId] = useState(null)

    const [selectedVendorHash, setSelectedVendorHash] = useState(null)

    const [open, setOpen] = React.useState(false);
    const handleOpen = (hash) => {
        setSelectedVendorHash(hash)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const [businessName, setBusinessName] = useState('')

    const { data: vendors, isLoading } = useQuery(['vendors',{businessName}], merchantService.getVendors)

    const handleCountryChange = (e) => {
        setSelectedCountry(e.currentTarget.value)
    }

    const handleSearch = (e) => {
        setBusinessName(e.currentTarget.value)
    }

    const { data: merchantInfo, isLoading: merchantInfoLoading } = useQuery(['merchantInfo',{selectedMerchantId}], merchantService.getMerchantService, {enabled:!!selectedMerchantId})


    const handleClick = (id) => {
        setSelectedMerchantId(id)
    }

    const { data: businessCategory, isLoading: businessCategoryLoading, error: businessCategoryError } = useQuery(['business_categories'], merchantService.getBusinessCategories)

    const { data: countries, isLoading: countriesLoading, error } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
                toast.error(error?.message,{
                    theme: "colored"
                })
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
                toast.error(error?.message,{
                    theme: "colored"
                })
            }
        },
        { enabled: !!selectedCountry }
    )

    return (
        <Container className='w-screen min-h-screen'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}
            >
                <VendorSearchResult
                    handleClose={handleClose}
                    hash={selectedVendorHash}
                    merchantData={merchantInfo?.items}
                />
            </Modal>
            <div className='lg:px-[200px] px-3 w-full flex flex-col items-center lg:py-[50px]'>
                <div className='w-full'>
                    <div className='flex w-full'>
                        <input type='text' className='flew grow px-4' name='search' onChange={handleSearch} placeholder='Enter vendors names' />
                        <span className='w-[50px] bg-green-800 flex text-white py-3 justify-center items-center'>
                            <span class="material-symbols-outlined">search</span>
                        </span>
                    </div> 

                    <h2 className='text-[#263238] font-semibold lg:text-2xl text-xl py-8 text-center'>FREIGHT/CARGO COMPANIES</h2>
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
                            <div className='flex flex-wrap justify-center gap-4'>
                                {
                                    vendors?.data?.business.map(vendor => {
                                        return (
                                            <VendorCard
                                                name={vendor.business_name}
                                                category={vendor.business_category}
                                                image={vendor.business_logo}
                                                address={vendor.office_address_number + ' ' + vendor.official_address}
                                                imageAlt={vendor.business_name}
                                                key={vendor.id}
                                                phone={vendor?.phone}
                                                handleClick={()=>{handleOpen(vendor.merchant_profile_hash);handleClick(vendor?.merchant_id)}}
                                                merchantData={merchantInfo?.items}
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