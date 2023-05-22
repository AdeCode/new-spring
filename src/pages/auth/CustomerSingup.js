import React from 'react'
import InputField from '../../components/@shared/InputField'
import { Formik, Form } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import styled from 'styled-components'
import authService from '../../@services/authService'

function CustomerSignup() {
    const navigate = useNavigate()

    const signUpMutation = useMutation(authService.registerCustomer, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/dashboard')
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
        signUpMutation.mutate(values)
    }
    return (
        <Div className='flex justify-center bg-white w-full pt-7 pb-7'>
            <div className='bg-white w-[500px] h-auto shadow pt-12 rounded-md pb-7'>
                <h2 className='text-center font-bold text-3xl lg:text-2xl'>Customer Signup</h2>
                <p className='px-[80px] mb-4'>
                    In few steps, you can start to create invoices, order a USD, EURO, GBP & NGN account, send and receive money from your customers
                </p>
                <div className='flex justify-center'>
                    <Formik
                        isValid
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            pin: '',
                            email: '',
                            username:'',
                            phone:'',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string().required("email field can not be empty").email("Invalid email address"),
                                first_name:Yup.string().required("Please enter first name"),
                                last_name:Yup.string().required("Please enter last name"),
                                pin:Yup.string().required("Pleasee enter pin").max(6, 'Pin is a maximum of 6 digits').min(4, 'Too Short!'),
                                username:Yup.string().required("Please enter user name"),
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
                                    placeholder='e.g. Olawale'
                                />
                                <InputField
                                    name='last_name'
                                    type='text'
                                    label='Last Name'
                                    placeholder='e.g. Adekunle'
                                />
                                <InputField
                                    name='username'
                                    type='text'
                                    label='Username'
                                    placeholder='e.g. GIGLOOGISTICS'
                                />
                                <InputField
                                    name='pin'
                                    type='number'
                                    label='Pin'
                                    placeholder='Create a 4 or 6 digits pin for your self'
                                />
                                <InputField
                                    name='email'
                                    type='email'
                                    label='Email Address'
                                    placeholder='e.g. user@example.com'
                                />
                                <InputField
                                    name='phone'
                                    type='text'
                                    label='Phone'
                                    placeholder='e.g. 08022338800'
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
                                <Link to='/login' className='text-end text-[#1BB6EF] font-normal text-sm'>Have an account? Login</Link>
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

export default CustomerSignup