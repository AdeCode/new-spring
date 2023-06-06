import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import styled from 'styled-components'
import { AuthContext } from '../../../contexts/AuthContexts'
import InputField from '../../../components/@shared/InputField'
import merchantService from '../../../@services/merchantService'
import logo from '../../../images/home/logo1.png'


function MerchantLogin() {
    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const loginMutation = useMutation(merchantService.login, {
        onSuccess: res => {
            console.log(res)
            dispatch({ type: 'LOGIN', payload: res.data })
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
        loginMutation.mutate(values)
    }

    const handleInputChange=(e,handleChange)=>{
        //console.log(e.currentTarget.value)
        
        handleChange(e)
        // console.log(phoneNumberRef.current.length)
    }

    return (
        <Div className='flex justify-center bg-white w-full'>
            <div className='w-full flex flex-col items-center justify-center items-center h-screen'>
                <div className='mb-5'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='bg-white w-[500px] h-[500px] shadow pt-12 rounded-md mt-7'>
                    <h2 className='text-center font-bold text-3xl lg:text-2xl'>Sign in</h2>
                    <div className='flex justify-center'>
                        <Formik
                            isValid
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={
                                Yup.object({
                                    email: Yup.string()
                                        .email("Invalid email address")
                                        .required("email field can not be empty"),
                                    password: Yup.string().required('password field can not be empty')
                                })
                            }
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false)
                                onSubmit(values)
                            }}
                        >
                            {({ isSubmitting, values, isValid, handleChange }) => (
                                <Form className='flex flex-col w-[70%]'>
                                    <InputField
                                        name='email'
                                        type='email'
                                        label='Email'
                                        placeholder='e.g. user@example.com'
                                        onChange={(e)=>{handleInputChange(e,handleChange)}}
                                    />
                                    <InputField
                                        name='password'
                                        type='password'
                                        label='Password'
                                        placeholder='*********'
                                        icon={true}
                                        onChange={(e)=>{handleInputChange(e,handleChange)}}
                                    />
                                    <Link to='/business-forgot-password' className='text-end text-[#1BB6EF] font-normal text-sm mb-2'>Forgot password?</Link>
                                    <Link to='/select-user-type' className='text-end text-[#1BB6EF] font-normal text-sm'>Create new account</Link>
                                    <button type="submit" disabled={!isValid} className='btn w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                        {
                                            loginMutation.isLoading ?
                                                "Loading..."
                                                : "Continue"
                                        }
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
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

export default MerchantLogin