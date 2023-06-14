import React from 'react'

function VendorCard({name,description,image,address, imageAlt}) {
    return (
        <div className='card w-[350px] max-w-[350px] min-w-[350px] mb-3 max-h-[500px]'>
            <div className='max-h-[250px] min-h-[250px]'>
                <img className='w-[350px] h-[250px] object-cover' src={image} alt={imageAlt}/>
            </div>
            {/* <div className='max-h-[250px] min-h-[250px] relative'>
                <img className='max-h-full absolute right-0 w-full max-w-[350px]' src={image} alt={imageAlt}/>
            </div> */}
            <div className='px-5 py-3 flex flex-col gap-4 bg-white'>
                <h3 className='font-semibold'>{name}</h3>
                <p className='text-gray text-sm'>{description}</p>
                <h3 className='text-base'>{address}</h3>
            </div>
        </div>
    )
}

export default VendorCard