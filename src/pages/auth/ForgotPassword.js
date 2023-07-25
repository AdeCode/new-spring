import React, { useRef } from 'react'
import styled from 'styled-components'
import logo from '../../images/home/logo1.png'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from '../../components/@shared/InputField'
import authService from '../../@services/authService'
import { useMutation } from 'react-query'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import PreviousPage from '../../components/@shared/PreviousPage'


function ForgotPassword() {
    const navigate = useNavigate()

    const inputEmail = useRef('')

    const forgotPasswordMutation = useMutation(authService.forgotPassword, {
        onSuccess: res => {
            // console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/reset-password',{
                state:{
                    email:inputEmail.current
                }
            })

        },
        onError: err => {
            console.log(err.message)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        forgotPasswordMutation.mutate(values)
        inputEmail.current=values.email
    }

  return (
    <Box className='flex justify-center pt-[107px] flex-col'>
        <PreviousPage/>
        <div className='flex flex-col items-center'>
            <div className='mb-5'>
            <Link to='/home'>
                <img src={logo} alt='logo'/>
            </Link>
            </div>
            <div className='bg-white form px-16 py-7 flex flex-col items-center'>
                <h2 className='text-[#373737] font-bold text-2xl mb-7'>Forgot Password</h2>
                <p className='lg:w-[351px] font-normal text-sm text-center'>Enter the email address dar**********@gmail.com associated with your account</p>

                <Formik
                initialValues={{
                    email:'',
                }}
                validationSchema={
                    Yup.object({                        
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("email field can not be empty"),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    onSubmit(values)
                }}
                >
                    {({ isSubmitting }) => (
                        <Form className='flex flex-col w-full'>
                            <InputField
                                name='email'
                                type='email'
                                placeholder='enter your email'
                                label='Email'
                            />
                            <Link to='/login' className='text-end text-[#1BB6EF] font-normal text-sm mb-2'>Login</Link>
                            <Link to='/customer-signup' className='text-end text-[#1BB6EF] font-normal text-sm'>Create new account</Link>
                            <button type="submit" disabled={isSubmitting} className='w-full py-[11px] text-white text-[16px] mt-[13px]'>
                                {
                                    forgotPasswordMutation.isLoading 
                                    ? "Please wait..." 
                                    : "Continue"
                                }
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className='mt-5'>
                    <h3 className='text-[#C4C4C4] font-normal text-base'>Didn’t get code? <span className='text-[#4BCA69]'>Resend</span></h3>
                </div>
            </div>
        </div>
    </Box>
  )
}

const Box = styled.div`
    .form{
        box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
    }
    button{
        background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
        box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
        border-radius: 6px;
    }
`

export default ForgotPassword