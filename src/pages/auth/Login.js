import React from 'react'
import { Formik, Form } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import styled from 'styled-components'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputField from '../../components/@shared/InputField'

function Login() {
    const navigate = useNavigate()
    // const loginMutation = useMutation(authService.login, {
    //     onSuccess: res => {
    //         console.log(res)
    //         toast.success(res.message, {
    //             theme: "colored",
    //           })
    //         navigate('/home')
    //     },
    //     onError: err => {
    //         console.log(err)
    //         toast.error(err.response.data.message, {
    //             theme: "colored",
    //           })
    //     }
    // })

    const loginMutation = () => { }

    const onSubmit = (values) => {
        loginMutation.mutate(values)
    }
    return (
        <Div className='flex justify-center bg-white w-full pt-7 pb-7'>
            <div className='bg-white w-[500px] h-[500px] shadow pt-12 rounded-md '>
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
                        {({ isSubmitting, values, isValid }) => (
                            <Form className='flex flex-col w-[70%]'>
                                <InputField
                                    name='email'
                                    type='email'
                                    label='Email'
                                    placeholder='input your email address'
                                />
                                <InputField
                                    name='password'
                                    type='password'
                                    label='Password'
                                    placeholder='*********'
                                    icon={true}
                                />
                                <Link to='/forgot-password' className='text-end text-[#1BB6EF] font-normal text-sm'>Forgot password?</Link>
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
        </Div>
    )
}

const Div = styled.div`
    .btn{
        background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
    }
`

export default Login