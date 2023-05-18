import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'


function TextField({name, rows, label, type, value, placeholder, readOnly}) {
 
  return (
    <Div className='form-control flex flex-col mb-4 relative border-none lg:border'>
        <label htmlFor={name} className='font-medium text-base text-label mb-[6px]'>{label}</label>
        <Field rows={rows} readOnly={readOnly} component='textarea'type={type} name={name} value={value} className='py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' placeholder={placeholder}/>
        <ErrorMessage name={name} component="div" className='text-red-500'/>
    </Div>
  )
}

const Div = styled.div`
  textarea{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }
  textarea:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }
`

export default TextField