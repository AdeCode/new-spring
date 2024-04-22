import React, { useState } from 'react'
import BusinessProfile from '../../../components/@settings/BusinessProfile';
import PersonaliseProfile from '../../../components/@settings/PersonaliseProfile';
import * as Yup from 'yup'
import BusinessProfileForm from '../../../components/@settings/BusinessProfileForm';
import PersonalizeProfileForm from '../../../components/@settings/PersonalizeProfileForm';
import { Formik, Form, useField, useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import InputField from '../../../components/@shared/InputField';

function AccountBusiness() {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const updateProfileMutation = () => {}

    const handleSubmit = () => {
        
    };

    const onSubmit = (values) => {
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 1:
                return (
                    <PersonalizeProfileForm />
                );
            case 2:
                return (
                    <BusinessProfileForm />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Account and Business</h2>
            <Formik
                isValid
                initialValues={{
                    first_name: '',
                    last_name: '',
                    business_name:'',
                    business_owner_username:'',
                    customer_email: '',
                    customer_name: '',
                    notes: '',
                    customer_phone: '',
                    invoice_due_date: '',
                    invoice_items: '',
                    description:'',
                    official_address_number:'',
                    zip_code:'',
                    business_category:'',
                    country:'',
                    state:'',
                    utility_bill:'',
                    cac_document:'',
                    tin_number:'',
                    


                }}
                validationSchema={
                    Yup.object({
                        customer_email: Yup.string().email("Invalid email address")
                            .required("email field can not be empty"),
                        first_name: Yup.string().required("Please enter customer name"),
                        last_name: Yup.string().required("Please enter customer name"),
                        business_name: Yup.string().required("Please enter business name"),
                        customer_phone: Yup.string().required("Please enter customer  phone number"),
                        invoice_items: Yup.array(Yup.object({
                            item_name: Yup.string().required('Item name is required'),
                            quantity: Yup.number().required('Quantity is required').min(1, 'minimum of one quantity required'),
                            price: Yup.number().required('Price is required').min(1, 'must be greater than zero'),
                            cbm: Yup.number().required('CBM is required'),
                            total: Yup.number(),
                        })).min(1, 'Enter at least 1 invoice item'),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    resetForm({
                        customer_email: '',
                        customer_name: '',
                        notes: '',
                        customer_phone: '',
                        invoice_items: []
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        {renderStepContent(step)}
                        {step > 1 && (
                            <button type="button" onClick={handlePrevious}>
                            Previous
                            </button>
                        )}
                        {step < 2 && (
                            <button type="button" onClick={handleNext}>
                            Next
                            </button>
                        )}
                        {step === 2 && (
                            <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                Submit
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AccountBusiness