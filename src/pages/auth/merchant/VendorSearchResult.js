import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import merchantService from '../../../@services/merchantService'
import { ThreeDots } from 'react-loader-spinner'


function VendorSearchResult({handleClose, hash}) {
  const { data: vendor, isLoading } = useQuery(['vendor',{hash}], merchantService.getVendor)

    vendor && console.log('vendor ', vendor.data)
  return (
    <Vendor className='lg:w-[900px] bg-green-100 flex flex-col py-6 px-5 rounded-xl'>
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
        <>
          <div className='flex justify-between mb-3'>
            <img className='object-contain h-[80px]' src={vendor?.data?.business?.business_logo} alt={vendor?.data?.business?.business_name}/>
            <span onClick={handleClose} class="material-symbols-outlined cursor-pointer">close</span>
          </div>
          <div className='flex flex-col gap-2 mb-7'>
            <div className='flex gap-4'>
              <h2 className='text-darkGray font-bold'>{vendor?.data?.business?.business_name}:  </h2><span className='text-lightBrown'>{vendor?.data?.business?.business_category}  </span>
            </div>
            <p className='text-lightBrown'>{vendor?.data?.business?.description}</p>
            <div className='flex gap-4'>
              <h2 className='text-darkGray font-bold'>ADDRESS:  </h2><span className='text-lightBrown'>{vendor?.data?.business?.office_address_number+', '+vendor?.data?.business?.official_address} </span>
            </div>
            <div className='flex gap-4'>
              <h2 className='text-darkGray font-bold'>CONTACT:  </h2><span className='text-lightBrown'>{vendor?.data?.business?.phone}</span>
            </div>
            <div className='flex gap-4'>
              <h2 className='text-darkGray font-bold'>RATE GUIDE:  </h2><span className='text-lightBrown'>Daily UPS exports from Nigeria ! Prices from 5,700/KG </span>
            </div>
            <div className='flex gap-4'>
              <h2 className='text-darkGray font-bold'>SHIPPING DAYS:  </h2><span className='text-lightBrown'>Daily UPS exports from Nigeria ! Prices from 5,700/KG </span>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='w-[250px] bg-white py-3 px-3 border border-cyan-950 flex flex-col rounded-lg h-[260px]'>
              <h2 className='text-darkGray font-semibold text-center mb-5 underline'>LIST OF REGIONS WE SHIP TO</h2>
              <ol className='list-decimal flex flex-col gap-2 pl-3'>
                <li>Europe (All countries)</li>
                <li>America (All states)</li>
                <li>Canada (All states)</li>
                <li>Asia (Chin, India etc)</li>
                <li>Africa (All countries)</li>
                <li>United Kingdom</li>
              </ol>
            </div>
            <div className='w-[250px] bg-white py-3 px-3 border border-cyan-950 flex flex-col rounded-lg h-[260px]'>
              <h2 className='text-darkGray font-semibold text-center mb-5 underline'>CONTRABAND ITEM LIST</h2>
              <ol className='list-decimal flex flex-col gap-2 pl-3'>
                <li>Ponmo</li>
                <li>Milk</li>
                <li>Medicament</li>
                <li>Cream</li>
                <li>Herbs Sticks</li>
                <li>Meat Products</li>
              </ol>
            </div>
            <div className='w-[250px] bg-white py-3 px-3 border border-cyan-950 flex flex-col rounded-lg h-[260px]'>
              <h2 className='text-darkGray font-semibold text-center mb-5 underline'>OUR SERVICES</h2>
              <ol className='list-decimal flex flex-col gap-2 pl-3'>
                <li>Expressway Delivery</li>
                <li>Air Freight</li>
                <li>Sea Cargo</li>
                <li>Pickup Services</li>
                <li>Packaging</li>
                <li>Import &amp; Export</li>
              </ol>
            </div>
          </div>
        </>
      }
    </Vendor>
  )
}

const Vendor = styled.div`
  .underline{
    text-decoration-color: #979797;
  }
`

export default VendorSearchResult