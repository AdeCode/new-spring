import { Form, Formik } from 'formik'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import merchantService from '../../../../@services/merchantService'
import * as Yup from 'yup'
import InputField from '../../../../components/@shared/InputField'
import { ThreeDots } from 'react-loader-spinner'

function Services({merchantId}) {
    const queryClient = useQueryClient()

    const { data: services, isLoading } = useQuery(['service',{type:'service', merchantId}], merchantService.getWebInformation)

    const deleteServiceMutation = useMutation(merchantService.deleteWebInformation, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('service')
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const deleteItem = (itemId) => {
        deleteServiceMutation.mutate(itemId)
    }

    const addServicesMutation = useMutation(merchantService.addMerchantService, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('service')
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        addServicesMutation.mutate(values)
    }

    return (
        <div>
            <h2>Our Services</h2>
            <Formik
                isValid
                initialValues={{
                    service: ''
                }}
                validationSchema={
                    Yup.object({
                        service: Yup.string().required("Please enter a service"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit({
                        type: "service",
                        value: values.service
                    })
                    resetForm({
                        service: '',
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Our Services</h2>
                                    <p className='text-gray font-normal'>Enter the services you offer here</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='service'
                                            type='text'
                                            label='Service*'
                                            placeholder='e.g. Importer'
                                        />
                                    </div>
                                    <div className='flex justify-end items-center'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full h-10 rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                addServicesMutation.isLoading ?
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
            <div className=''>
                <h3 className=''>Our Services: </h3>
                <div className='flex flex-col gap-2'>
                    {
                        isLoading ? 
                        <ThreeDots 
                            height="80" 
                            width="80" 
                            radius="9"
                            color="#4fa94d" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                        :
                        services?.items?.map(service => (
                            <div className='flex gap-3 w-[200px] justify-between'>
                                <h3 className=''>{service?.item_name}</h3>
                                <span class="material-symbols-outlined text-red-700 cursor-pointer" 
                                    onClick={()=>deleteItem(service?.id)}>
                                        delete_forever
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Services