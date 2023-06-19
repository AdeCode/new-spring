import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, useField, useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import TextField from '../@shared/TextField'
import SelectField from '../@shared/SelectField'
import avatar from '../../images/business/avatar.png'
import merchantService from '../../@services/merchantService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import helperFunctions from '../../@helpers/helperFunctions'
import { AuthContext } from '../../contexts/AuthContexts'

function BusinessProfile({data}) {
    console.log('data details: ',data)
    const queryClient = useQueryClient()

    let initialState={}

    if (!!data.profile) {
        initialState = {
            business_name: data?.profile?.business_name,
            website_url: data?.profile?.website_url,
            email_address: data?.profile?.email_address,
            city: data?.profile?.city,
            country: data?.profile?.country,
            // State: 'Lagos State',
            State: data?.profile?.State+' State',
            official_address: data?.profile?.official_address,
            description: data?.profile?.description,
            // tin_number: data?.profile?.tin_number,
            // cac_document: data?.profile?.cac_document,
            // utility_bill: data?.profile?.utility_bill,
            business_owner_username: data?.profile?.business_owner_username,
            business_category: data?.profile?.business_category,
            zip_code: data?.profile?.zip_code,
            office_address_number: data?.profile?.office_address_number,
            business_logo: data?.profile?.business_logo,
        }
    } else {
        initialState = {
            business_name: '',
            website_url: '',
            email_address: '',
            city: '',
            country: '',
            State: '',
            official_address: '',
            description: '',
            // tin_number: '',
            // cac_document: '',
            // utility_bill: '',
            business_owner_username: '',
            business_category: '',
            zip_code: '',
            office_address_number: '',
            business_logo: '',
        }
    }
    console.log(data?.profile?.State)

    const [businessLogo, setBusinessLogo] = useState('')

    const [selectedCountry, setSelectedCountry] = useState('')

    //console.log(states)

    const navigate = useNavigate()

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
    //countries && console.log(countries)

    const { data: state, isLoading: statesLoading, error: statesError } = useQuery(['states', { selectedCountry }],
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

    //state && console.log('states ',state.states)

    const updateMerchantProfileMutation = useMutation(merchantService.updateProfile, {
        onSuccess: res => {
            //console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('merchant_profile')
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

    const handleCountryChange = (e, handleChange) => {
        //console.log(e.currentTarget.value)
        setSelectedCountry(e.currentTarget.value)
        //console.log(selectedCountry)
        handleChange(e)
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setBusinessLogo(fileReader.result)
                resolve(fileReader.result);
                // console.log('outside ', businessLogo)
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleBusinessLogo = async (e, setFieldValue) => {
        const file = e.target.files[0];
        //check the size of image 
        if (file?.size / 1024 / 1024 < 2) {
            const base64 = await convertToBase64(file);
            setFieldValue('business_logo', base64);
        }
        else {
            toast.error('Image size must be of 2MB or less');
        };
    };

    const FileUploader = (props) => {
        const { setFieldValue, handleChange } = useFormikContext();

        const handleIcon = async (e, setFieldValue) => {
            const file = e.target.files[0];
            //check the size of image 
            if (file?.size / 1024 / 1024 < 2) {
                const base64 = await convertToBase64(file);
                setFieldValue(props.name, base64);
            }
            else {
                toast.error('Image size must be of 2MB or less');
            };
            handleChange(e)
        };

        return (
            <div>
                <label htmlFor={props.name} className='font-medium text-base text-label mb-[6px]'>{props.label}</label>
                <input
                    {...props}
                    className='form-control'
                    onChange={(e) => handleIcon(e, setFieldValue)}
                />
            </div>
        )
    }


    const NewField = (props) => {
        const { setFieldValue } = useFormikContext();

        const onFileChange = async (e, setFieldValue) => {
            let file = e.target.files[0];
            //console.log('selected file ', file)
            if (file?.size / 1024 / 1024 < 2) {
                const base64 = await convertToBase64(file);
                setFieldValue(props.name, base64);
            }
            else {
                toast.error('Image size must be 2MB or less');
            };
        }

        return (
            <div className='flex flex-col'>
                <label htmlFor={props.name} className='font-medium text-base text-label mb-[6px]'>{props.label}</label>
                <input
                    {...props}
                    className='form-control'
                    onChange={(e) => onFileChange(e, setFieldValue)}
                />
            </div>
        );
    }

    const BusinessLogoField = (props) => {

        const {
            values: { customer_phone, }, setFieldValue,
        } = useFormikContext();

        const onFileChange = async (e, setFieldValue) => {
            let file = e.target.files[0];
            //console.log('selected file ', file)

            if (file?.size / 1024 / 1024 < 2) {
                const base64 = await convertToBase64(file);
                setFieldValue('business_logo', base64);
            }
            else {
                toast.error('Image size must be of 2MB or less');
            };
        }


        const [field, meta] = useField(props)

        return (
            <div className='flex flex-col items-center grow w-[150px]'>
                <div className='mb-3'>
                    <img src={avatar} alt='avatar' />
                </div>
                <input {...props} {...field} className="form-control" onChange={onFileChange} />
                <h2 className='font-normal text-[#40525E] text-sm opacity-70'>Upload Business Logo</h2>
                {!!meta.touched && !!meta.error && <div className='text-red-500'>{meta.error}</div>}
            </div>
        );
    }
    return (
        <div className='bg-white w-full px-4 py-4 overflow-scroll'>
            <h2 className='font-semibold text-black'>Personalize Merchant Account</h2>
            
                <Formik
                isValid
                initialValues={
                    initialState
                //     {
                //     business_name: '',
                //     website_url: '',
                //     email_address: '',
                //     company_rc_number: '',
                //     country: '',
                //     State: '',
                //     official_address: '',
                //     description: '',
                //     tin_number: '10299303',
                //     cac_document: '',
                //     utility_bill: '',
                //     business_owner_username: '',
                //     business_category: '',
                //     zip_code: '',
                //     office_address_number: '',
                //     business_logo: '',
                // }
            }
                validationSchema={
                    Yup.object({
                        email_address: Yup.string().email("Invalid email address")
                            .required("email field can not be empty"),
                        business_name: Yup.string().required("Please enter business name"),
                        // description: Yup.string().required("Enter your business description"),
                        // official_address: Yup.string().required("Enter your official address"),
                        // country: Yup.string().required("Please select a country"),
                        // State: Yup.string(),
                        // business_category: Yup.string().required("Please select your state"),
                        // business_logo: Yup.string().required("Please select your business logo"),
                        // business_owner_username: Yup.string().required("Please enter business owner username"),
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
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Business Name</h2>
                                    <p className='text-gray font-normal'>Enter your business name here</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='business_name'
                                            type='text'
                                            label='Business Name*'
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
                                    <h2 className='font font-medium'>Email</h2>
                                    <p className='text-gray font-normal'>Edit Email</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='email_address'
                                            type='email'
                                            label='Email Address*'
                                            placeholder='e.g. user@mail.com'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='city'
                                            type='text'
                                            label='City'
                                            placeholder='e.g. Lagos'
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
                                    <div className=''>
                                        <SelectField
                                            name='country'
                                            label='Country*'
                                            value={values.country}
                                            onChange={(e) => { handleCountryChange(e, handleChange) }}
                                            onBlur={handleBlur}
                                        >
                                            {
                                                countriesLoading ? <option value="">Loading...</option>
                                                    :
                                                    <>
                                                        <option value="">Select Country</option>
                                                        {
                                                            countries?.map((country,index) => {
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
                                            name='State'
                                            label='State'
                                            value={values.State}
                                            type='text'
                                        >
                                            {
                                                
                                                statesLoading ? <option value="">Loading...</option> :
                                                    <>
                                                        {
                                                            data?.profile?.State &&
                                                            <option value={data?.profile?.State} defaultValue>{data?.profile?.State}</option>
                                                        }
                                                        {
                                                            state?.states.map((state,index) => {
                                                                // console.log(state.name.includes(values.State))
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
                                </div>
                            </div>

                            <div className='flex w-full gap-2 py-3'>
                                <div className='flex flex-col items-center grow w-[150px]'>
                                    <div className='mb-3 max-w-[100px] max-h-[100px]'>
                                        {
                                            values.business_logo ?
                                            <img src={data?.profile?.business_logo} alt={data?.profile?.business_name} />
                                            :
                                            <img src={avatar} alt='avatar' />
                                        }
                                    </div>
                                    <input
                                        name='business_logo'
                                        type='file'
                                        className='form-control'
                                        onChange={(e) => handleBusinessLogo(e, setFieldValue,)}
                                    />
                                    <h2 className='font-normal text-[#40525E] text-sm opacity-70'>Upload your Business Logo</h2>
                                    <ErrorMessage name='business_logo' component="div" className='text-red-500' />
                                </div>





                                {/* <FileUploader
                                    type="file"
                                    name="business_logo"
                                    label='Upload utility bill'
                                /> */}




                                {/* <div className=''>
                                    <input
                                        name='business_logo'
                                        type='file'
                                        className='form-control'
                                        onChange={(e) => handleIcon(e, setFieldValue)}
                                    />
                                </div> */}

                                {/* <BusinessLogoField
                                    type="file" 
                                    name="business_logo"
                                    // onChange={onFileChange}
                                /> */}
                                {/* <div className='w-[380px]'>
                                    <InputField
                                        name='business_logo'
                                        type='text'
                                        label='Business Logo'
                                        placeholder='e.g. 096453627181'
                                    />
                                </div> */}
                                <div className='flex gap-4 grow'>
                                    <div className='grow'>
                                        <TextField
                                            name='official_address'
                                            type='text'
                                            label='Office Address*'
                                            placeholder='Enter your official address'
                                            component="textarea"
                                            rows='4'
                                            defaultValue={values.official_address}
                                        />
                                    </div>
                                    <div className='grow'>
                                        <TextField
                                            name='description'
                                            type='text'
                                            label='Business Description*'
                                            placeholder=''
                                            component="textarea"
                                            rows='4'
                                            defaultValue={values.description}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='grow'>
                                    <InputField
                                        name='business_owner_username'
                                        type='text'
                                        label='Business Owner Username*'
                                        placeholder='e.g. @user'
                                    />
                                </div>
                                <div className='grow'>
                                    <SelectField
                                        name='business_category'
                                        label='Business Category*'
                                        type='text'
                                    >
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
                                    </SelectField>
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='office_address_number'
                                        type='text'
                                        label='Office Address Number*'
                                        placeholder='e.g. 002'
                                    />
                                </div>
                                {/* <div className='flex w-[300px] justify-center items-center'>
                                    <div className='w-full flex flex-col items-center'>
                                        <div className='form-control flex flex-col mb-4 relative border-none lg:border'>
                                            <div className='flex justify-center'>
                                                <div className='mb-3 max-w-[100px] max-h-[100px]'>
                                                    {
                                                        values.cac_document ?
                                                        <img src={data?.profile?.cac_document} alt={data?.profile?.business_name} />
                                                        :
                                                        <span class="material-symbols-outlined">image</span>
                                                    }
                                                </div>
                                            </div>
                                            <label htmlFor={'cac_document'} className='font-medium text-base text-label mb-[6px]'>Upload your CAC document</label>
                                            <input
                                                name='cac_document'
                                                type='file'
                                                className='form-control'
                                                onChange={(e) => handleCacDoc(e, setFieldValue,)}
                                            />
                                            <ErrorMessage name='cac_document' component="div" className='text-red-500' />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='w-[350px]'>
                                    <InputField
                                        name='zip_code'
                                        type='text'
                                        label='Zip Code'
                                        placeholder='e.g. 000111'
                                    />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                {/* <div className='grow'>
                                    <div className='w-full flex flex-col items-center'>
                                        <div className='form-control flex flex-col items-center mb-4 relative border-none lg:border'>
                                            <div className='flex justify-center'>
                                                <div className='mb-3 max-w-[100px] max-h-[100px]'>
                                                    {
                                                        values.utility_bill ?
                                                        <img src={data?.profile?.utility_bill} alt={data?.profile?.business_name} />
                                                        :
                                                        <span class="material-symbols-outlined">image</span>
                                                    }
                                                </div>
                                            </div>
                                            <label htmlFor={'cac_document'} className='font-medium text-base text-label mb-[6px]'>Upload your Utility bill</label>
                                            <input
                                                name='utility_bill'
                                                type='file'
                                                className='form-control'
                                                onChange={(e) => handleIcon(e, setFieldValue,)}
                                            />
                                            <ErrorMessage name='utility_bill' component="div" className='text-red-500' />
                                        </div>
                                    </div>
                                </div> */}

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
