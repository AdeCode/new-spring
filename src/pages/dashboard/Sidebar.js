import React, { useContext, useState } from 'react'
import Logo from '../../images/home/logo1.png'
import styled from 'styled-components';
import SubMenu from './SubMenu';
import {useNavigate} from 'react-router-dom'
import {SidebarData} from '../../components/@shared/sideBarData'
// import { AuthContext } from '../contexts/AuthContexts';



function Sidebar() {
    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const navigate = useNavigate()
    // const {dispatch} = useContext(AuthContext)

    const toggleButton = () => {
        setOpen(!open)
    }

    const menuToggle = () => {
        setOpenMenu(!openMenu)
    }

    const logout = () => {
        //dispatch({ type: 'LOGOUT'})
    }

    return (
        <Div className='sidebar w-fit lg:h-[100vh] sticky overflow-y-scroll p-3 bg-white text-[#324054]'>
            <img src={Logo} alt='logo' className={`${open ? 'hidden' : 'flex'}`}/>
            {/* {
                open ? 
                <button className='' onClick={toggleButton}>
                    <img src={mobileLogo} alt='mobile-logo' />
                </button>
                :
                <div className={`btn p-[15px] cursor-pointer flex gap-[18.5px] w-[248px] ${open ? 'hidden' : 'flex'} mb-9`}
                    onClick={toggleButton}
                >
                    <img src={menu} alt='menu'/>
                    <h3 className='font-medium text-base'>Dashboard</h3>
                </div>
            } */}
            <div className={`btn p-[15px] cursor-pointer flex gap-[18.5px] w-[248px] mb-9`}
                onClick={()=>navigate('/dashboard')}>
                <span class="material-symbols-outlined">menu</span>
                <h3 className='font-medium text-base'>Dashboard</h3>
            </div>


            <nav className=''>
                <div>
                    {
                        SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                    <div className='lg:pl-[1.5rem] flex items-center lg:gap-4 cursor-pointer lg:mt-11 font-semibold' onClick={logout}>
                        <span class="material-symbols-outlined">logout</span>
                        <h2 className='text-base'>Logout</h2>
                    </div>
                </div>
            </nav>
            
        </Div>
    )
}

const Div = styled.div`
    .btn{
        background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);

        h3{
            color:#6199DB;
        }
    }
`

export default Sidebar