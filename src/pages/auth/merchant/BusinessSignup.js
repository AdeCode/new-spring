import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import styled from 'styled-components'
import merchantService from '../../../@services/merchantService'
import InputField from '../../../components/@shared/InputField'
import { AuthContext } from '../../../contexts/AuthContexts'
import logo from '../../../images/home/logo1.png'

function BusinessSignup() {
    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const signUpMutation = useMutation(merchantService.registerBusiness, {
        onSuccess: res => {
            console.log(res)
            //dispatch({ type: 'LOGIN', payload: res.data })
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/business-login')
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })


    const onSubmit = (values) => {
        console.log(values)
        signUpMutation.mutate(values)
    }
    return (
        <Div className='flex flex-col items-center justify-center bg-white w-full pt-7 pb-7'>
            <div className='mb-5'>
                <img src={logo} alt='logo'/>
            </div>
            <div className='bg-white w-[500px] h-auto shadow pt-12 rounded-md pb-7'>
                <h2 className='text-center font-bold text-3xl lg:text-2xl'>Create your business account</h2>
                <p className='px-[80px]'>
                    In few steps, you can start to create invoices, order a USD, EURO, GBP &amp; NGN account, send and receive money from your customers globally.                </p>
                <div className='flex justify-center'>
                    <Formik
                        isValid
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            business_name: '',
                            business_username: '',
                            pin: '',
                            email: '',
                            password: '',
                            // confirmPassword: '',
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("email field can not be empty"),
                                first_name:Yup.string().required("pleas enter first name"),
                                last_name:Yup.string().required("pleas enter last name"),
                                business_name:Yup.string().required("pleas enter business name"),
                                pin:Yup.string().required("Please enter pin"),
                                business_username:Yup.string().required("pleas enter business user name"),
                                password: Yup.string().required('Password is required')
                                .min(8, 'Password must be 8 characters long')
                                .matches(/[0-9]/, 'Password requires a number')
                                .matches(/[a-z]/, 'Password requires a lowercase letter')
                                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                                .matches(/[^\w]/, 'Password requires a symbol'),
                                confirmPassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false)
                            onSubmit(values)
                        }}
                    >
                        {({ isSubmitting, values, isValid }) => (
                            <Form className='flex flex-col w-[70%]'>
                                {/* <span class="material-icons">&#xE87C;</span> */}
                                {/* <span class="material-symbols-outlined">toggle_on</span>
                                <span class="material-symbols-outlined">visibility</span> */}
                                <InputField
                                    name='first_name'
                                    type='text'
                                    label='First Name'
                                    placeholder='Enter your first name'
                                />
                                <InputField
                                    name='last_name'
                                    type='text'
                                    label='Last Name'
                                    placeholder='Enter your last name'
                                />
                                <InputField
                                    name='business_name'
                                    type='text'
                                    label='Business Name'
                                    placeholder='Enter your business name'
                                />
                                <InputField
                                    name='business_username'
                                    type='text'
                                    label='Create your Business Username'
                                    placeholder='Enter your business user name'
                                />
                                <InputField
                                    name='pin'
                                    type='text'
                                    label='Pin'
                                    placeholder='Enter your your pin'
                                />
                                <InputField
                                    name='email'
                                    type='email'
                                    label='Email Address'
                                    placeholder='Enter your email address'
                                />
                                <InputField
                                    name='password'
                                    type='password'
                                    label='Password'
                                    placeholder='*********'
                                    icon={true}
                                />
                                <InputField
                                    name='confirmPassword'
                                    type='password'
                                    label='Confirm Password'
                                    placeholder='*********'
                                    icon={true}
                                />
                                <Link to='/business-login' className='text-end text-[#1BB6EF] font-normal text-sm'>Have an account? Login</Link>
                                <button type="submit" disabled={!isValid} className='btn w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        signUpMutation.isLoading ?
                                            "Loading..."
                                            : "Continue"
                                    }
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Div>
    )
}

const Div = styled.div`
    .btn{
        background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
    }
`

export default BusinessSignup