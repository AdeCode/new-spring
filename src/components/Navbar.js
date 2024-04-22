import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../images/home/logo1.png'
import menu from '../images/home/menu.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import close from '../images/home/close.png'
import './Navbar.css'
import apple from '../images/home/apple.png'
import appleM from '../images/home/appleM.png'
import play from '../images/home/play.png'


function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false)

    const [showProducts, setShowProducts] = useState(false)

    const handleShowProducts = () => setShowProducts(!showProducts)
    
    const closeMenu = () => {
        setMobileMenu(false)
    }

    const [active, setActive] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu)
        setActive(!active)
    }

    const style = ({ isActive }) => ({
        color: isActive ? '#4BCA69' : '#263238',
    });

    return (
        <Nav>
            <nav className='flex py-5 px-7  justify-between lg:gap-5 lg:h-[80px] items-center' id='top'>
                <div className='flex justify-between items-center w-full lg:px-[50px]'>
                    <div className='logo w-[90px] lg:w-[120px]'>
                        <Link to='./home'>
                            <img src={logo} alt='Spring Finance Logo' />
                        </Link>
                    </div>
                    <div className='nav-menu'>
                        <ul className={`${mobileMenu ? 'mobile' : 'hidden'} lg:flex lg:justify-end lg:gap-12 lg:items-center lg:h-[100%] z-10`}>
                            <div className='flex justify-end lg:hidden my-4' onClick={() => setMobileMenu(false)}>
                                <img src={close} alt='close' />
                            </div>
                            <li className='' >
                                <span className='menu flex items-center gap-[3px] lg:gap-[6px] cursor-pointer font-semibold text-lg lg:m-0 lg:p-0 leading-[20px]'>
                                    Products
                                    <h3 className='flex new font-normal text-xs py-1 px-3 rounded-2xl'>New</h3>
                                    <MdOutlineKeyboardArrowDown className=''/>
                                </span>
                                <div className='sub-menu absolute z-[1] bg-white w-[300px] md:min-w-[600px] lg:min-w-[900px] top-12 h-[300px] py-4 px-4 rounded-2xl'>
                                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 md:px-4'>
                                        <div className='md:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Invoicing</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Generate instant Invoice for your customers.</p>
                                        </div>
                                        <div className='md:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Communication Channels</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Keep up communication with your customers &amp; team all in one place.</p>
                                        </div>
                                        <div className='md:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Digital Freight Manifest</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Generate instant digital lading/unlading manifest for all your freights.</p>
                                        </div>
                                        <div className='md:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Access Control</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Have user management for your entire team across the globe.</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 md:px-4'>
                                        <div className='lg:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Vendor Profile</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Create a profile for your freight business for more visibility across the globe</p>
                                        </div>
                                        <div className='lg:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Global Payments</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Send invoices and get paid immediately.</p>
                                        </div>
                                        <div className='lg:w-[200px]'>
                                            <h3 className='text-left #001533 font-medium md:mb-2'>Corporate &amp; Business Wallet</h3>
                                            <p className='text-base w-full lg:text-xs max-w-[200px] text-left font-normal'>Get corporate account and generate instant virtual business wallet & cards.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li onClick={closeMenu} className='flex items-center flex-row lg:items-center lg:gap-[6px] cursor-pointer font-medium pb-[22px] lg:p-0 leading-[20px]  lg:font-semibold text-lg lg:m-0'>
                                <a href='https://calendly.com/spring_freight/30min' target='blank'>Book a demo</a>
                            </li>
                            <li onClick={closeMenu} className='flex items-center flex-row lg:items-center lg:gap-[6px] cursor-pointer font-medium pb-[22px] lg:p-0 leading-[20px]  lg:font-semibold text-lg lg:m-0'>
                                <NavLink to='/business-signup' style={style}>Sign Up</NavLink>
                            </li>
                            <li onClick={handleShowProducts} className='flex md:hidden items-center flex-row lg:items-center lg:gap-[6px] cursor-pointer font-medium pb-[22px] lg:p-0 leading-[20px]  lg:font-semibold text-lg lg:m-0'>
                                <NavLink to='/' className='text-white py-4 md:w-[182px] w-[150px] text-center rounded-md btn'>Login</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='hidden md:flex'>
                        <li onClick={closeMenu} className='flex items-center flex-row lg:items-center lg:gap-[6px] cursor-pointer font-medium pb-[22px] lg:p-0 leading-[20px]  lg:font-semibold text-lg lg:m-0'>
                            <NavLink to='/' className='text-white py-4 md:w-[182px] w-[150px] text-center rounded-md btn'>Login</NavLink>
                        </li>
                    </div>
                    <button className='lg:hidden flex' onClick={toggleMobileMenu}>
                        <img src={menu} alt='menu' />
                    </button>
                </div>
            </nav>
        </Nav>
    )
}

export default Navbar

const Nav = styled.div`
    margin:0;
    padding: 0;

    .btn{
        background: var(--demo-1, linear-gradient(128deg, #6199DB 0%, #4BCA69 100%));
        box-shadow: 0px 1px 2px 0px rgba(105, 81, 255, 0.05);

    }

    nav{
        background: #EFFCF3;
        .new{
            background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);
        }

        @media (min-width: 1024px) {
            border-bottom: 1px solid #F2F4F7;
            box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.09);
            padding:1.5rem 1rem;
        }

        .right{
            .btn{
                display: flex;
                padding: 8px 20px;
                background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
                box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
                border-radius: 8px;
                color: #FFFFFF;
                font-weight: 600;
                font-size: 18px;
                line-height: 28px;
            }

            h4{
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 18px;
                line-height: 28px;
            }
        
        }

        ul{
            .mobile-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                width: 100%;
                background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);                
                border-radius: 8px; 
                font-size: 18px;
                line-height: 28px;
                margin-bottom: 20px;
                font-weight: 600;
            }

            .reg{
                background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
                box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
                color: #FFFFFF;
            }

            
        }

        .play-store{
            background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%);
        }

        .app-store{
            background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
        }
    }
    
    
`