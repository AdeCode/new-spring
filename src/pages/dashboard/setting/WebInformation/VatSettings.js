import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as Yup from 'yup'
import merchantService from '../../../../@services/merchantService'
import InputField from '../../../../components/@shared/InputField'
import { toast } from 'react-toastify'
import Switch from '@mui/material/Switch';
import SelectField from '../../../../components/@shared/SelectField'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { Modal } from '@mui/material'
import UpdateVatModal from '../../../../components/@shared/UpdateVatModal'


function VatSettings() {
    const queryClient = useQueryClient()

    const [modalData, setModalData] = useState(null)

    const [checked, setChecked] = useState(false)

    const handleToggleChange = (e) => {
        setChecked(e.target.checked)
    }

    const { data: vats, isLoading: vatLoading } = useQuery(['vats',{customerCountry:''}], merchantService.getVat)
    console.log(vats?.data)

    const { data: Allvats } = useQuery('vats', merchantService.getAllVat)
    Allvats && console.log(Allvats?.data)

    const manageVATMutation = useMutation(merchantService.addVat, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('vats')
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
        manageVATMutation.mutate(values)
    }

    const { data: countries, isLoading: countriesLoading } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    )

    
    const updateVat = (value, country, id) => {
        setOpen(true)
        setModalData({value: value, country: country, vat_id: id})
        //updateVATMutation.mutate(itemId)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (hash) => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}
            >
                <UpdateVatModal
                    handleClose={handleClose}
                    data={modalData}
                />
            </Modal>
            <h2 className=''>VAT Settings</h2>
            <Formik
                isValid
                initialValues={{
                    vat: '',
                    country: ''
                }}
                validationSchema={
                    Yup.object({
                        country: Yup.string(),
                        vat: Yup.number().required("vat is required"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    // resetForm({
                    //     service: '',
                    // })
                }}
            >
                {({ isSubmitting, isValid, handleChange, handleBlur, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>VAT Status</h2>
                                    <p className='text-gray font-normal'>Toggle to modify VAT</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow flex items-center'>
                                        <Switch
                                            checked={checked}
                                            onChange={handleToggleChange}
                                        />
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='country'
                                            label='Country*'
                                            value={values.country}
                                            onBlur={handleBlur}
                                        >
                                            {
                                                countriesLoading ? <option value="">Loading...</option>
                                                    :
                                                    <>
                                                        <option value="">Select Country</option>
                                                        {
                                                            countries?.map((country, index) => {
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
                                        <InputField
                                            name='vat'
                                            type='number'
                                            label='VAT(%)*'
                                            placeholder='e.g. 5'
                                            disabled={!checked}
                                        />
                                    </div>
                                    <div className='flex justify-end items-center'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full px-2 rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                manageVATMutation.isLoading ?
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
                <h3 className='font-semibold mb-3'>Available country VATs: </h3>
                <div className='flex flex-col gap-2'>
                    {
                        vatLoading ? 
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
                        Allvats?.data?.map(vat => (
                            <div key={vat.id} className='flex gap-1 w-[300px] justify-between'>
                                <div className='flex gap-3'>
                                    <h3 className='w-[200px]'>{vat?.country}: </h3><span className='w-[50px]'>{vat.vat_value} %</span>
                                </div>
                                <span class="material-symbols-outlined text-red-700 cursor-pointer" 
                                    onClick={()=>updateVat(vat?.vat_value,vat?.country,vat?.id)}
                                >
                                    edit
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default VatSettings