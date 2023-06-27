import { Form, Formik } from 'formik'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as Yup from 'yup'
import merchantService from '../../../../@services/merchantService'
import { toast } from 'react-toastify'
import InputField from '../../../../components/@shared/InputField'
import { ThreeDots } from 'react-loader-spinner'

function Contraband({merchantId}) {
    const queryClient = useQueryClient()

    const { data: contraband, isLoading } = useQuery(['contraband',{type:'contraband', merchantId}], merchantService.getWebInformation)
    contraband && console.log(contraband)

    const deleteServiceMutation = useMutation(merchantService.deleteWebInformation, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('contraband')
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const deleteItem = (itemId) => {
        deleteServiceMutation.mutate(itemId)
    }

    const addContrabandMutation = useMutation(merchantService.addMerchantDeliveryRegion, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('contraband')
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
        addContrabandMutation.mutate(values)
    }

    return (
        <div>
            <h2>Contraband Items</h2>
            <Formik
                isValid
                initialValues={{
                    contraband: ''
                }}
                validationSchema={
                    Yup.object({
                        contraband: Yup.string().required("Please enter a contraband item"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit({
                        type: "contraband",
                        value: values.contraband
                    })
                    resetForm({
                        contraband: '',
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>contraband Items</h2>
                                    <p className='text-gray font-normal'>Enter lists of contraband items</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='contraband'
                                            type='text'
                                            label='Contraband item*'
                                            placeholder='e.g. Fish'
                                        />
                                    </div>
                                    <div className='flex justify-end items-center'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full h-10 rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                addContrabandMutation.isLoading ?
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
                <h3 className=''>Contraband Items: </h3>
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
                        contraband?.items?.map(item => (
                            <div className='flex gap-3 w-[200px] justify-between'>
                                <h3 className=''>{item?.item_name}</h3>
                                <span class="material-symbols-outlined text-red-700 cursor-pointer" 
                                    onClick={()=>deleteItem(item?.id)}>
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

export default Contraband