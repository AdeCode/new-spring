import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'


function ServicesInput() {

    //const [services, setServices] = useState([])

    let services = []

    const [enteredService, setEnteredService] = useState('')

    const handleChange = (e) => {
        setEnteredService(e.currentTarget.value)
        // console.log(e.target.value)
        // if(e.key === 'Enter'){
        //     console.log('entered enter key pressed')
        // }
    }

    const handleKeyDown = event => {
        //console.log('User pressed: ', event.key);
    
        if (event.key === ',' && enteredService !== '') {
          // 👇️ your logic here
          services.push(enteredService);
        //   if(!services.includes(enteredService)){
        //     services.push(enteredService);
        //   }
        //   console.log('Enter key pressed , ✅');
        }
        console.log(services)
      };
 
  return (
    <Div className='form-control flex flex-col mb-4 relative border-none lg:border'>
        <label htmlFor='services' className='font-medium text-base text-label mb-[6px]'>Services</label>
        <input type='text' name='enteredService' placeholder='Enter list of services' onKeyDown={handleKeyDown} onChange={handleChange} className='py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'/>
        {
            services.length > 0 && services.map(service => (<ul>
                <li key={service}>{service}</li>
            </ul>))
        }
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

export default ServicesInput