import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'


function InputField({name, label, type, value, placeholder, icon}) {
  const [show, setShow] = useState(false)

  const toggleIcon = () => {
    setShow(!show)
  }

  return (
    <Div className='form-control flex flex-col mb-4 relative border-none lg:border'>
        {
          icon ? 
          <div className='absolute right-2 top-10 cursor-pointer'  onClick={toggleIcon}>
            {
              show ?
              <span class="material-symbols-outlined">visibility</span>

              :
              <span class="material-symbols-outlined">visibility_off</span>
            }
          </div>
          : null
        }
        <label htmlFor={name} className='font-medium text-base text-label mb-[6px]'>{label}</label>
        <Field type={show ? 'text' : type} name={name} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' placeholder={placeholder}/>
        <ErrorMessage name={name} component="div" className='text-red-500'/>
    </Div>
  )
}

const Div = styled.div`
  input{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }
  input:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }
`

export default InputField