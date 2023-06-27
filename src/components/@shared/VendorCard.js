import { style } from '@mui/system'
import React from 'react'
import styled from 'styled-components'

function VendorCard({ name, category, image, address, imageAlt, phone, handleClick }) {
    //console.log(services)

    return (
        <Card onClick={handleClick} className='card cursor-pointer px-5 py-3 bg-white max-w-[350px] min-w-[350px] rounded-xl flex flex-col justify-between mb-3 max-h-[220px]'>
            <div className='max-h-[100px] min-h-[100px] flex justify-between'>
                <img className='w-[80px] h-[80px] rounded-[50%] object-contain' src={image} alt={imageAlt} />
                <div className='flex flex-col'>
                    <h3 className='font-semibold lg:text-lg text-base text-right mb-2'>{name}</h3>
                    <p className='text-gray text-xs w-[170px] text-right'>{category}</p>
                </div>
            </div>
            <hr className='text-gray my-1' />
            <div className='flex flex-col gap-2 bg-white h-auto'>
                {/* <p className='text-gray text-sm'>{description}</p> */}
                <span className='flex gap-2'>
                    <span class="material-symbols-outlined text-green-800">call</span>
                    <h3 className='text-sm'>{phone}</h3>
                </span>
                <span className='flex gap-2'>
                    <span class="material-symbols-outlined text-green-800">home_pin</span>
                    <h3 className='text-sm'>{address}</h3>
                </span>
            </div>
        </Card>
        // <Card className='card w-[350px] max-w-[350px] min-w-[350px] mb-3 max-h-[500px]'>
        //     <div className='max-h-[250px] min-h-[250px]'>
        //         <img className='w-[350px] h-[250px] object-cover' src={image} alt={imageAlt}/>
        //     </div>
        //     <div className='px-5 py-3 flex flex-col gap-4 bg-white'>
        //         <h3 className='font-semibold'>{name}</h3>
        //         <p className='text-gray text-sm'>{description}</p>
        //         <h3 className='text-base'>{address}</h3>
        //     </div>
        // </Card>

    )
}

const Card = styled.div`
.card{
    box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
}

`

export default VendorCard