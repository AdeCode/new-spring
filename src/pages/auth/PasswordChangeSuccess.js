import React from 'react'
import styled from 'styled-components'
import logo from '../../images/logo1.png'
import unlock from '../../images/auth/unlock.png'
import {Link} from 'react-router-dom'
import { url } from '../../@services/httpService'


function PasswordChangeSuccess() {
   
  return (
    <Box className='flex justify-center pt-[107px]'>
        <div className='flex flex-col items-center'>
            <div className='mb-5'>
                <Link to={`${url}`}>
                    <img src={logo} alt='logo'/>
                </Link>
            </div>
            <div className=''>
                <img src={unlock} alt='unlocked'/>
            </div>
            <p className='w-[391px] text-[#373737] text-center font-normal text-sm'>YOU HAVE SUCCESSFULLY CHANGED YOUR PASSWORD. Click on the button below to continue</p>
            <button type="submit"  className='w-full py-[11px] text-white text-[16px] mt-[13px]'>Continue</button>
        </div>
    </Box>
  )
}

const Box = styled.div`
    .form{
        box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
    }
    button{
        background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
        box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
        border-radius: 6px;
    }
`

export default PasswordChangeSuccess