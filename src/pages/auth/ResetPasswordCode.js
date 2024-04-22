import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../images/home/logo1.png'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from '../../components/@shared/InputField'
import OtpInput from 'react-otp-input';
import { url } from '../../@services/httpService'
import {Link} from 'react-router-dom'


function ResetPasswordCode() {
    const [otp, setOtp] = useState('')

    const submitMutation = ()=>{}

    const onSubmit = (values) => {
    }

  return (
    <Box className='flex justify-center pt-[107px]'>
        <div className='flex flex-col items-center'>
            <div className='mb-5'>
                <Link to={`${url}`}>
                    <img src={logo} alt='logo'/>
                </Link>
            </div>
            <div className='bg-white form px-16 py-7 flex flex-col items-center'>
                <h2 className='text-[#373737] font-bold text-2xl mb-7'>Forget Password</h2>
                <p className='lg:w-[351px] font-normal text-sm text-start mb-7'>Please enter the code sent to your email to validate your account</p>

                <Formik
                initialValues={{
                    password:'',
                    confirm_password:''
                }}
                validationSchema={
                    Yup.object({                        
                        password: Yup.string()
                            .required("password field can not be empty")
                            .min(6, "password must be at least 6 characters"),
                        confirm_password: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),

                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    onSubmit(values)
                }}
                >
                    {({ isSubmitting }) => (
                        <Form className='flex flex-col w-full'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input {...props} />}
                                inputStyle='otpInput'
                                className='w-full'
                                containerStyle='otpContainer'
                            />
                            <button type="submit" disabled={isSubmitting} className='w-full py-[11px] text-white text-[16px] mt-[13px]'>
                                {
                                    submitMutation.isLoading 
                                    ? "Please wait..." 
                                    : "Save"
                                }
                            </button>
                        </Form>
                    )}
                </Formik>
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

    .otpContainer{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .otpInput{
        min-width:45px;
        height: 45px;
        background: linear-gradient(107.13deg, rgba(71, 192, 190, 0.15) -13.42%, rgba(57, 123, 190, 0.15) 104.4%);
        border-radius: 4.07143px;
        font-weight: 700;
        font-size: 26px;
        color: #131417;
        line-height: 32px;
    }

    .otpInput:focus{
        border:2px solid red;
    }
    
   
`

export default ResetPasswordCode