import { ErrorMessage, Field } from 'formik'
import React from 'react'
import styled from 'styled-components'


function SelectField({children,name,label,...props}) {
  return (
    <Div className='form-control flex flex-col mb-4 relative border-none lg:border'>
        <label htmlFor={name} className='font-medium text-base text-label mb-[6px]'>{label}</label>
        <Field name="color" as="select" {...props} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'>
            {children}
        </Field>        
        <ErrorMessage name={name} component="div" className='text-red-500'/>
    </Div>

    
  )
}

const Div = styled.div`
  select{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }
  select:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }
`

export default SelectField
