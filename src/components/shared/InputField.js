import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'
// import { IoEyeOffOutline } from "react-icons/io5";
// import { IoEyeOutline } from "react-icons/io5";


function InputField({name, label, type, value, placeholder, icon}) {
  const [show, setShow] = useState(false)

  const toggleIcon = () => {
    setShow(!show)
  }

  return (
    <Div className='form-control flex flex-col mb-4 relative border-none lg:border'>
        {
          icon ? 
          <div className='absolute right-2 top-12 cursor-pointer'  onClick={toggleIcon}>
            {
              show ?
              <span class="material-icons-outlined">visibility</span>
              :
              <span class="material-icons-outlined">visibility_off</span>
            }
          </div>
          : null
        }
        <label htmlFor={name} className='font-medium text-base text-label mb-[6px]'>{label}</label>
        <Field type={show ? 'text' : type} name={name} className='h-[46px] py-[11px] px-[14px] text-input_text text-sm font-[450] rounded-lg' placeholder={placeholder}/>
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