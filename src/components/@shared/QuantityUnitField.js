import { ErrorMessage, Field } from 'formik'
import React from 'react'
import styled from 'styled-components'


function QuantityUnitField({children,name,label,type,value,unit,onBlur,...props}) {
  return (
    <Div className='form-control flex flex-col mb-4 relative border-none lg:border w-[200px]'>
        <label htmlFor={name} className='font-medium text-base text-label mb-[6px]'>{label}</label>
        <div className='flex rounded-lg'>
            <Field type={type} name={name} className='h-10 py-2 pl-[14px] w-[120px] text-input_text text-sm font-[450] rounded-l-lg'/>
            <Field name={unit} onBlur={onBlur} value={value} as="select" {...props} className='drop h-10 py-2 px-2 w-[80px] text-input_text text-sm font-[450] rounded-r-lg'>
                {children}
            </Field> 
        </div>       
        <ErrorMessage name={name} component="div" className='text-red-500'/>
    </Div>

    
  )
}

const Div = styled.div`
  .field{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }
  .field:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }

  .drop{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }

  .drop:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }
`

export default QuantityUnitField
