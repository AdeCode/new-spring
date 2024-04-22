import React from 'react'
import InputField from '../@shared/InputField'

function PersonalizeProfileForm() {
    return (
        <div className='flex flex-col py-2'>
            <div className='flex w-full gap-4 py-3'>
                <div className='flex flex-col w-[350px]'>
                    <h2 className='font font-medium'>Full Name</h2>
                    <p className='text-gray font-normal'>You can customize your full name here</p>
                </div>
                <div className='grow flex gap-4'>
                    <div className='grow'>
                        <InputField
                            name='first_name'
                            type='text'
                            label='First Name'
                            placeholder='e.g. Adewale'
                        />
                    </div>
                    <div className='grow'>
                        <InputField
                            name='last_name'
                            type='text'
                            label='Last Name'
                            placeholder='e.g. Komolafe'
                        />
                    </div>
                </div>
            </div>
            <div className='flex w-full gap-4 py-3'>
                <div className='flex flex-col w-[350px]'>
                    <h2 className='font font-medium'>Email &amp; Phone Number</h2>
                    <p className='text-gray font-normal'>Gain access to ccounts and notifications</p>
                </div>
                <div className='flex grow gap-4'>
                    <div className='grow'>
                        <InputField
                            name='customer_email'
                            type='email'
                            label='Email Address'
                            placeholder='e.g. user@mail.com'
                        />
                    </div>
                    <div className='grow'>
                        <InputField
                            name='customer_phone'
                            type='text'
                            label='Phone Number'
                            placeholder='e.g. 08033889999'
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-end w-full gap-4 py-3'>
                <div className='w-[360px]'>
                    <InputField
                        name='bvn'
                        type='text'
                        label='BVN'
                        placeholder='e.g. 0022133889999'
                    />
                </div>
            </div>

            <h2 className='font-semibold text-black'>Password Update</h2>
            <hr className='text-[#40525E] opacity-50' />
            <div className='flex w-full gap-4 py-3'>
                <div className='flex flex-col w-[350px]'>
                    <h2 className='font font-medium'>Change your password</h2>
                    <p className='text-gray font-normal'>You can change your password here easily</p>
                </div>
                <div className='grow'>
                    <InputField
                        name='old_password'
                        type='password'
                        label='Old Password'
                        placeholder='********'
                        icon={true}
                    />
                </div>
                <div className='grow'>
                    <InputField
                        name='new_password'
                        type='password'
                        label='New Password'
                        placeholder='********'
                        icon={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalizeProfileForm