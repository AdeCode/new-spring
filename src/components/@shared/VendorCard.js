import React from 'react'

function VendorCard({name,description,image,address, imageAlt}) {
    return (
        <div className='card w-[300px] mb-3'>
            <div className=''>
                <img src={image} alt={imageAlt} width='300px' height='250px'/>
            </div>
            <div className='px-5 py-3 flex flex-col gap-4 bg-white'>
                <h3 className='font-semibold'>{name}</h3>
                <p className='text-gray text-sm'>{description}</p>
                <h3 className='text-base'>{address}</h3>
            </div>
        </div>
    )
}

export default VendorCard