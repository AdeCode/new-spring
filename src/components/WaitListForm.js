import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { validate } from '../common'

function WaitListForm() {
    const [formData, setFormData] = useState({
        email: '',
        businessName:'',
        phoneNumber:''
    })

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function submitForm(e) {
        e.preventDefault()
        console.log('submitting')
        if (validate(formData.email) === false) {
            return toast.error("The email field can not be empty.", {
                theme: "colored",
            })
        }
        if (validate(formData.businessName) === false) {
            return toast.error("Please enter a business name.", {
                theme: "colored",
            })
        }
        if (validate(formData.phoneNumber) === false) {
            return toast.error("Please enter your phone number.", {
                theme: "colored",
            })
        }
        await fetch('https://geolocation-db.com/json/', { method: 'GET' }).then((res) => {
            res.json().then((json) => {
                console.log(json)
                const bodyParams = {
                    "email": formData.email,
                    "businessName": formData.businessName,
                    "phoneNumber": formData.phoneNumber,
                    "ip_address": json.IPv4,
                    "city": json.city,
                    "state": json.state,
                    "country": json.country_name,
                    "latitude": json.latitude,
                    "longitude": json.longitude,
                    "form": 1
                };
                console.log(bodyParams)

                submitWaitlist(bodyParams)
            })

        })
    }

    const submitWaitlist = async (bodyParams) => {
        const response = await fetch('https://frkrvith3d.execute-api.us-east-1.amazonaws.com/api/waitlist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParams)
        })
        const json = await response.json()
        if (response.ok) {
            console.log(json)
            toast.success(json.data.message, {
                theme: "colored",
            })
            setFormData({
                email:'',
                businessName:'',
                phoneNumber:''
            })
        }
        if (!response.ok) {
            toast.error(json.message, {
                theme: "colored",
            })
        }
    }

    return (
        <div className='flex lg:justify-center'>
            <form className='w-[500px] text-white'>
                <div className='flex mb-4 gap-3 justify-between w-full'>
                    <div className='form-group w-[50%]'>
                        <input type='text' name='businessName' value={formData.businessName} onChange={handleInputChange} placeholder='Business name' className='py-2 px-2 rounded-lg w-full bg-[#6d52a7] text-white' />
                    </div>
                    <div className='form-group w-[50%]'>
                        <input type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} placeholder='Phone Number' className='py-2 px-2 rounded-lg w-full bg-[#6d52a7] text-white' />
                    </div>
                </div>
                <div className='form-group mb-4 w-full'>
                    <input type='text' name='email' value={formData.email} onChange={handleInputChange} placeholder='Email Address' className='py-2 px-2 rounded-lg w-full bg-[#6d52a7] text-white' />
                </div>
                <button type='submit' onClick={submitForm} className='text-[#6942C2] bg-white py-2 w-full hover:bg-[#6942C2] hover:text-white rounded-lg'>Join our Vendor Network</button>
            </form>
        </div>
    )
}

export default WaitListForm