import React from 'react'
import { Formik, Form, useField, useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { useMutation } from 'react-query'
import TextField from '../@shared/TextField'
import SelectField from '../@shared/SelectField'
import avatar from '../../images/business/avatar.png'
import merchantService from '../../@services/merchantService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function BusinessProfile() {
    const updateProfileMutation = useMutation()

    const navigate = useNavigate()

    const updateMerchantProfileMutation = useMutation(merchantService.updateProfile, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        //console.log(values)
        updateMerchantProfileMutation.mutate(values)
    }

    return (
        <div className='bg-white w-full px-4 py-4 overflow-scroll'>
            <h2 className='font-semibold text-black'>Personalize Merchant Account</h2>
            <Formik
                isValid
                initialValues={{
                    business_name:'',
                    website_url:'',
                    email_address:'',
                    company_rc_number:'',
                    country:'',
                    State:'',
                    official_address:'',
                    description:'',
                    tin_number:'',
                    cac_document:'',
                    utility_bill:'',
                    business_owner_username:'',
                    business_category:'',
                    zip_code:'',
                    office_address_number:'',
                    business_logo:'',
                }}
                validationSchema={
                    Yup.object({
                        email_address: Yup.string().email("Invalid email address")
                            .required("email field can not be empty"),
                        business_name: Yup.string().required("Please enter business name"),
                        company_rc_number: Yup.string().required("Please enter compnay RC number"),
                        tin_number: Yup.string().required("Please enter TIN number"),
                        country: Yup.string().required("Please select a country"),
                        
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    console.log(values)
                   
                }}
            >
                {({ isSubmitting, isValid, handleChange, handleBlur, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Business Name</h2>
                                    <p className='text-gray font-normal'>Enter your business name here</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='business_name'
                                            type='text'
                                            label='Business Name'
                                            placeholder='e.g. Gig Logistics'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='website_url'
                                            type='text'
                                            label='Website URL'
                                            placeholder='e.g. www.giglog.com'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Email &amp; RC Number</h2>
                                    <p className='text-gray font-normal'>Edit Email &amp; RC Number</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='email_address'
                                            type='email'
                                            label='Email Address'
                                            placeholder='e.g. user@mail.com'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='company_rc_number'
                                            type='text'
                                            label='Company RC Number'
                                            placeholder='e.g. NC00223'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Business Location</h2>
                                    <p className='text-gray font-normal'>Edit your business location</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <SelectField
                                            name='country'
                                            label='Country'
                                            value={values.country}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">Select Country</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Senegal">Senegal</option>
                                            <option value="Togo">Togo</option>
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='State'
                                            label='State'
                                            type='text'
                                        >
                                            <option value="">Select state</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="Abuja">Abuja</option>
                                            <option value="Oyo">Oyo</option>
                                        </SelectField>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex w-full gap-2 py-3'>
                                {/* <div className='flex flex-col items-center grow w-[150px]'>
                                    <div className='mb-3'>
                                        <img src={avatar} alt='avatar' />
                                    </div>
                                    <h2 className='font-normal text-[#40525E] text-sm opacity-70'>Upload Business Logo</h2>
                                </div> */}
                                <div className='w-[380px]'>
                                        <InputField
                                            name='business_logo'
                                            type='text'
                                            label='Business Logo'
                                            placeholder='e.g. 096453627181'
                                        />
                                    </div>
                                <div className='flex gap-4 grow'>
                                    <div className='grow'>
                                        <TextField
                                            name='official_address'
                                            type='text'
                                            label='Official Address'
                                            placeholder='Enter notes'
                                            component="textarea"
                                            rows='4'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <TextField
                                            name='description'
                                            type='text'
                                            label='Description'
                                            placeholder='e.g. Lagos'
                                            component="textarea"
                                            rows='4'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='grow'>
                                    <InputField
                                        name='business_owner_username'
                                        type='text'
                                        label='Business Owner Username'
                                        placeholder='e.g. Nigeria'
                                    />
                                </div>
                                <div className='grow'>
                                    <SelectField
                                        name='business_category'
                                        label='Business Category'
                                        type='text'
                                    >
                                        <option value="">Select Category</option>
                                        <option value="red">Merchant</option>
                                        <option value="green">Freight</option>
                                        <option value="blue">Blue</option>
                                    </SelectField>
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='cac_document'
                                        type='text'
                                        label='CAC document'
                                        placeholder='e.g. 002'
                                    />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='grow'>
                                    <InputField
                                        name='city'
                                        type='text'
                                        label='City'
                                        placeholder='e.g. Lagos'
                                    />
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='zip_code'
                                        type='text'
                                        label='Zip Code'
                                        placeholder='e.g. 000111'
                                    />
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='office_address_number'
                                        type='text'
                                        label='Office Address Number'
                                        placeholder='e.g. 002'
                                    />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='grow'>
                                    <InputField
                                        name='tin_number'
                                        type='text'
                                        label='Enter TIN Number'
                                        placeholder='e.g. 096453627181'
                                    />
                                </div>
                                
                                <div className='grow'>
                                    <InputField
                                        name='utility_bill'
                                        type='text'
                                        label='Utility bill'
                                        placeholder='e.g. 002'
                                    />
                                </div>

                            </div>

                            <div className='flex justify-end'>
                                <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                        {
                                            updateMerchantProfileMutation.isLoading ?
                                                "Loading..."
                                                : "Save"
                                        }
                                    </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BusinessProfile
