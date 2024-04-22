import { Form, Formik } from 'formik'
import React from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import * as Yup from 'yup'
import merchantService from '../../../../@services/merchantService'
import { toast } from 'react-toastify'
import InputField from '../../../../components/@shared/InputField'
import { ThreeDots } from 'react-loader-spinner'

function Regions({merchantId}) {
    const queryClient = useQueryClient()

    const { data: regions, isLoading } = useQuery(['regions',{type:'region', merchantId}], merchantService.getWebInformation)

    const deleteServiceMutation = useMutation(merchantService.deleteWebInformation, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('regions')
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

    const addRegionMutation = useMutation(merchantService.addMerchantDeliveryRegion, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('regions')
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        addRegionMutation.mutate(values)
    }

    return (
        <div>
            <h2>Regions we deliver to</h2>
            <Formik
                isValid
                initialValues={{
                    region: ''
                }}
                validationSchema={
                    Yup.object({
                        region: Yup.string().required("Please enter a regions"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit({
                        type: "region",
                        value: values.region
                    })
                    resetForm({
                        region: '',
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Our Regions</h2>
                                    <p className='text-gray font-normal'>Enter the regions that you deliver to</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='region'
                                            type='text'
                                            label='Region*'
                                            placeholder='e.g. America'
                                        />
                                    </div>
                                    <div className='flex justify-end items-center'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full h-10 rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                addRegionMutation.isLoading ?
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
                <h3 className=''>Current regions: </h3>
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
                        regions?.items?.map(region => (
                            <div className='flex gap-3 w-[200px] justify-between'>
                                <h3 className=''>{region?.item_name}</h3>
                                <span class="material-symbols-outlined text-red-700 cursor-pointer" 
                                    onClick={()=>deleteItem(region?.id)}>
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

export default Regions