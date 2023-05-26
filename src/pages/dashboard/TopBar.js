import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../contexts/AuthContexts'

function TopBar() {
  const {state} = useContext(AuthContext)

  // console.log(state)

  return (
    <Div className='bg-white flex justify-between w-full h-[86px] py-3 pl-[51px] pr-12'>
        <div className='flex items-center lg:py-[4px] bg-app_bar gap-3 px-2 lg:w-[526px] rounded-[5px]'>
            <span className="material-symbols-outlined">search</span>
            <input type='text' className='w-full h-10 bg-app_bar text-[#1F4173] font-normal text-base px-4' placeholder='search'/>
        </div>
        <div className='flex items-center gap-4'>
            <span className="material-symbols-outlined">help</span>
            <span className="material-symbols-outlined">notifications</span>
              {
                state.isAuthenticated &&
                <div className='flex items-center cursor-pointer'>
                  <span className='bg-bg_dark p-3 text-black lg:rounded-[50%] font-medium text-sm'>{state.user.business_username}</span>
                  <span className="material-symbols-outlined" style={{color:'#1F4173', fontSize:'32px'}}>keyboard_arrow_down</span>
                </div>
              }
            
            {/* <MdKeyboardArrowDown style={{color:'#1F4173', fontSize:'32px'}}/> */}
        </div>
    </Div>
  )
}

// const Question  = styled(AiOutlineQuestionCircle)`
//   color: rgba(31, 65, 115, 0.5);
//   transform: scale(2);
//   margin: 5%;
//   font-size: 22px;
// `;

const Div = styled.div`

`

export default TopBar