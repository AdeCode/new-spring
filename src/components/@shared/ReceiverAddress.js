import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import InputField from './InputField'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import merchantService from '../../@services/merchantService';
import { toast } from 'react-toastify'
import SelectField from './SelectField';
import { useCountriesQuery, useCreateReceiverAddress, useStatesQuery } from './invoiceUtils';
import axios from 'axios';

function ReceiverAddress ({handleClose,customerId}) {
    const {data:countries,isLoading:countriesLoading} = useCountriesQuery();
    const queryClient = useQueryClient()
    const [selectedCountry, setSelectedCountry] = useState(null)

    const { data: state, isLoading: statesLoading, error: statesError } = useQuery(['states', { selectedCountry }],
        async () => {
            try {
                const res = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`,
                    {
                        "country": selectedCountry
                    });
                return res.data.data
            } catch (error) {
                toast.error(error?.response?.data?.error || 'Could not load data', {
                    theme: "colored",
                })
            }
        },
        { enabled: !!selectedCountry }
    )


    const handleCountryChange = (e, handleChange) => {
        setSelectedCountry(e.currentTarget.value)
        handleChange(e)
    }
   
    const createReceiverAddressMutation = useMutation(merchantService.createReceiverAddress, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('receiverAddress')
            handleClose()
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        if(!customerId){
            const address = {
                country: values.country,
                state: values.state,
                city: values.city,
                house_no: values.house_no,
                address: values.address,
                zip_code: values.zip_code,
            }
            localStorage.setItem('receiver_address', JSON.stringify(address))
            toast.success("Receiver's Address saved", {
                theme: "colored",
            })
            handleClose()
        }else{
            createReceiverAddressMutation.mutate(values)
        }
    }

    return (
        <div className='bg-white w-[400px] px-3 py-2'>
            <h2 className='font font-medium'>Create Receiver's Address</h2>
            <div className=''>
            <Formik
                isValid
                initialValues={{
                    customer_id: customerId,
                    country: '',
                    state: '',
                    city: '',
                    house_no: '',
                    address: '',
                    zip_code: '',
                }}
                validationSchema={
                    Yup.object({
                        country: Yup.string(),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                   
                }}
            >
                {({ isSubmitting, isValid, handleChange, handleBlur, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='grow flex-col gap-4'>
                                    <div className='grow'>
                                        <SelectField
                                            name='country'
                                            label='Country*'
                                            value={values.country}
                                            onBlur={handleBlur}
                                            onChange={(e) => { handleCountryChange(e, handleChange) }}
                                        >
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
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='state'
                                            label='State'
                                            value={values.state}
                                            type='text'
                                        >
                                            {
                                                statesLoading ? <option value="">Loading...</option> :
                                                    <>
                                                        {
                                                            state?.states.map((state,index) => {
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
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='city'
                                            type='text'
                                            label='City'
                                            placeholder='e.g. Ohio'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='house_no'
                                            type='number'
                                            label='House Number'
                                            placeholder='e.g. 22'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='address'
                                            type='text'
                                            label='Address'
                                            placeholder='e.g. 22'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='zip_code'
                                            type='text'
                                            label='Zip Code'
                                            placeholder='e.g. 009112'
                                        />
                                    </div>
                                    <div className='flex justify-end items-center grow'>
                                        <button type="submit" disabled={!isValid || createReceiverAddressMutation.isLoading} className='btn bg-green-700 hover:bg-green-600 w-full cursor-pointer rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                createReceiverAddressMutation.isLoading ?
                                                    "Loading..."
                                                    : "Save"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default ReceiverAddress
