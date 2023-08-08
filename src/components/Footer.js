import React from 'react'
import styled from 'styled-components'
import logodark from '../images/home/Logo-dark.png'
// import { GoArrowUp } from "react-icons/go";
import {Link } from "react-router-dom"

function Footer() {
    return (
        <Foot className='pt-[37.8px] pb-4 pl-[31px] pr-[15.5px] lg:pt-[45px] lg:pb-0 lg:px-[100px]'>
            <div className='flex justify-between items-center'>
                <img src={logodark} alt='dark logo' />
                <nav className='hidden lg:flex'>
                    <ul className='list-none flex gap-[53px] text-base leading-[17px] font-medium items-center'>
                        {/* <li>
                            <a href='./'>Product</a>
                        </li>
                        <li>
                            <a href='./'>Industries</a>
                        </li> */}
                        {/* <li>
                            <a href='./'>About</a>
                        </li>
                        <li>
                            <a href='./'>FAQ</a>
                        </li> */}
                    </ul>
                </nav>
                <nav className='lg:hidden'>
                    <ul className='socials list-none flex gap-[14px]'>
                        <li>
                            <a href='https://web.facebook.com/springfinance/' target='_blank' rel='noreferrer'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8441 0H2.15628C0.965556 0 0.000244141 0.965273 0.000244141 2.15603V13.8439C0.000244141 15.0346 0.965517 15.9999 2.15628 15.9999H7.92063L7.93046 10.2824H6.44505C6.25201 10.2824 6.09534 10.1263 6.09459 9.93329L6.08747 8.0903C6.08672 7.8962 6.24387 7.73847 6.43797 7.73847H7.92067V5.95767C7.92067 3.89107 9.18282 2.7658 11.0264 2.7658H12.5391C12.7327 2.7658 12.8896 2.92271 12.8896 3.1163V4.67031C12.8896 4.86382 12.7328 5.0207 12.5393 5.02081L11.611 5.02124C10.6084 5.02124 10.4142 5.49766 10.4142 6.19682V7.73851H12.6172C12.8272 7.73851 12.99 7.9218 12.9653 8.13026L12.7468 9.97325C12.7259 10.1496 12.5764 10.2825 12.3988 10.2825H10.4241L10.4142 16H13.8441C15.0349 16 16.0001 15.0347 16.0001 13.844V2.15603C16.0001 0.965273 15.0348 0 13.8441 0Z" fill="#263238" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href='https://twitter.com/springfinancehq' target='_blank' rel='noreferrer'>
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 1.70616C15.4111 1.9671 14.7792 2.14407 14.1153 2.22307C14.7932 1.81714 15.3121 1.17327 15.558 0.408405C14.9222 0.784326 14.2203 1.05729 13.4724 1.20527C12.8735 0.566392 12.0217 0.168457 11.0769 0.168457C9.26421 0.168457 7.79448 1.63818 7.79448 3.44984C7.79448 3.70678 7.82348 3.95774 7.87948 4.19771C5.152 4.06072 2.73346 2.75397 1.11477 0.768326C0.831817 1.25225 0.67085 1.81612 0.67085 2.41803C0.67085 3.55682 1.25075 4.56163 2.13059 5.1495C1.59268 5.13152 1.08677 4.98354 0.643869 4.73758V4.77858C0.643869 6.36828 1.77566 7.69502 3.27637 7.99698C3.00141 8.07097 2.71148 8.11196 2.41153 8.11196C2.19958 8.11196 1.99461 8.09097 1.79365 8.05097C2.21156 9.35573 3.42335 10.3045 4.85908 10.3306C3.73629 11.2104 2.32055 11.7333 0.78285 11.7333C0.517909 11.7333 0.256941 11.7173 0 11.6883C1.45273 12.6211 3.17741 13.165 5.03106 13.165C11.0689 13.165 14.3693 8.16396 14.3693 3.82678L14.3583 3.40187C15.0032 2.94192 15.561 2.36404 16 1.70616Z" fill="#263238" />
                                </svg>

                            </a>
                        </li>
                        <li>
                            <a href='https://www.instagram.com/springfinancehq/' target='_blank' rel='noreferrer'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4395_48287)">
                                        <path d="M11.6689 0H4.33105C1.94287 0 0 1.94287 0 4.33105V11.669C0 14.0571 1.94287 16 4.33105 16H11.669C14.0571 16 16 14.0571 16 11.669V4.33105C16 1.94287 14.0571 0 11.6689 0V0ZM7.99998 12.3749C5.58764 12.3749 3.62512 10.4123 3.62512 7.99998C3.62512 5.58764 5.58764 3.62512 7.99998 3.62512C10.4123 3.62512 12.3749 5.58764 12.3749 7.99998C12.3749 10.4123 10.4123 12.3749 7.99998 12.3749ZM12.4795 4.65685C11.7666 4.65685 11.1867 4.07702 11.1867 3.36413C11.1867 2.65124 11.7666 2.07129 12.4795 2.07129C13.1924 2.07129 13.7723 2.65124 13.7723 3.36413C13.7723 4.07702 13.1924 4.65685 12.4795 4.65685Z" fill="#263238" />
                                        <path d="M8.00012 4.56323C6.1051 4.56323 4.56323 6.10498 4.56323 8.00012C4.56323 9.89513 6.1051 11.437 8.00012 11.437C9.89525 11.437 11.437 9.89513 11.437 8.00012C11.437 6.10498 9.89525 4.56323 8.00012 4.56323Z" fill="#263238" />
                                        <path d="M12.4792 3.00928C12.2837 3.00928 12.1245 3.16846 12.1245 3.36401C12.1245 3.55957 12.2837 3.71875 12.4792 3.71875C12.6749 3.71875 12.8341 3.55969 12.8341 3.36401C12.8341 3.16833 12.6749 3.00928 12.4792 3.00928Z" fill="#263238" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4395_48287">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>
                        {/* <li>
                            <a href='linkedin.com' target='_blank' rel='noreferrer'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4395_48283)">
                                        <path d="M4.38629 15.4921H0.508301V5.04272H4.38629V15.4921Z" fill="#263238" />
                                        <path d="M15.4922 15.4921H11.693L11.6946 10.8694C11.7106 10.119 11.4077 9.50015 10.8846 9.21378C10.5254 9.01703 10.1121 9.01648 9.72424 9.20599L9.69073 15.4921H5.7146V5.04272H9.69312V5.46744C10.9292 4.96628 12.2399 5.0386 13.379 5.69009C14.6628 6.42453 15.4922 7.78226 15.4922 9.14914V15.4921Z" fill="#263238" />
                                        <path d="M2.43933 4.39032C1.3656 4.39032 0.492188 3.51599 0.492188 2.44125C0.492188 1.36652 1.3656 0.492188 2.43933 0.492188C3.51288 0.492188 4.38629 1.36652 4.38629 2.44125C4.38629 3.51599 3.51288 4.39032 2.43933 4.39032Z" fill="#263238" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4395_48283">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div className='flex md:mt-[57.7px] mt-5'>
                <h5 className='w-full text-[16px] leading-[20px] text-left'>Springstack Technologies Limited is a Financial Technology and Digital Freight Management for Africa. We manage the entire processing of freight by air and ocean using software to provide invoices, freight manifest generation, customers document management, payments, omni-channel communication and user access control.</h5>
            </div>
            <div className='footer-bottom lg:flex lg:mt-10 lg:justify-between lg:border-t-[1px] lg:border-gray lg:h-[104.9px] lg:items-center'>
                <div className='text-[12px] lg:text-[16px] lg:leading-[19px] lg:font-normal leading-[15px] font-medium mt-[22.6px] lg:m-0'>
                    © Springstack Technologies Limited. All rights reserved  
                </div>
                <div className='flex lg:hidden lg:justify-between gap-[21px] text-[11px] font-medium leading-[13px] mt-[40px] lg:m-0'>
                    <Link to='/terms-and-condition'>Terms and Conditions</Link>
                    <Link to='/privacy-policy'>Privacy policy</Link>
                </div>
                <Link to='terms-and-condition' href='/terms-and-condition' className='hidden lg:flex font-medium text-base leading-[19px]'>Terms and Conditions</Link>
                <Link to='/privacy-policy' className='hidden lg:flex font-medium text-base leading-[19px]'>Privacy policy</Link>

                <div className='hidden lg:flex lg:m-0'>
                    <ul className='socials list-none flex gap-[14px] lg:gap-[29px] items-center pr-11'>
                        <li>
                            <a href='https://web.facebook.com/springfinance/' target='_blank' rel='noreferrer'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8441 0H2.15628C0.965556 0 0.000244141 0.965273 0.000244141 2.15603V13.8439C0.000244141 15.0346 0.965517 15.9999 2.15628 15.9999H7.92063L7.93046 10.2824H6.44505C6.25201 10.2824 6.09534 10.1263 6.09459 9.93329L6.08747 8.0903C6.08672 7.8962 6.24387 7.73847 6.43797 7.73847H7.92067V5.95767C7.92067 3.89107 9.18282 2.7658 11.0264 2.7658H12.5391C12.7327 2.7658 12.8896 2.92271 12.8896 3.1163V4.67031C12.8896 4.86382 12.7328 5.0207 12.5393 5.02081L11.611 5.02124C10.6084 5.02124 10.4142 5.49766 10.4142 6.19682V7.73851H12.6172C12.8272 7.73851 12.99 7.9218 12.9653 8.13026L12.7468 9.97325C12.7259 10.1496 12.5764 10.2825 12.3988 10.2825H10.4241L10.4142 16H13.8441C15.0349 16 16.0001 15.0347 16.0001 13.844V2.15603C16.0001 0.965273 15.0348 0 13.8441 0Z" fill="#263238" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href='https://twitter.com/springfinancehq' target='_blank' rel='noreferrer'>
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 1.70616C15.4111 1.9671 14.7792 2.14407 14.1153 2.22307C14.7932 1.81714 15.3121 1.17327 15.558 0.408405C14.9222 0.784326 14.2203 1.05729 13.4724 1.20527C12.8735 0.566392 12.0217 0.168457 11.0769 0.168457C9.26421 0.168457 7.79448 1.63818 7.79448 3.44984C7.79448 3.70678 7.82348 3.95774 7.87948 4.19771C5.152 4.06072 2.73346 2.75397 1.11477 0.768326C0.831817 1.25225 0.67085 1.81612 0.67085 2.41803C0.67085 3.55682 1.25075 4.56163 2.13059 5.1495C1.59268 5.13152 1.08677 4.98354 0.643869 4.73758V4.77858C0.643869 6.36828 1.77566 7.69502 3.27637 7.99698C3.00141 8.07097 2.71148 8.11196 2.41153 8.11196C2.19958 8.11196 1.99461 8.09097 1.79365 8.05097C2.21156 9.35573 3.42335 10.3045 4.85908 10.3306C3.73629 11.2104 2.32055 11.7333 0.78285 11.7333C0.517909 11.7333 0.256941 11.7173 0 11.6883C1.45273 12.6211 3.17741 13.165 5.03106 13.165C11.0689 13.165 14.3693 8.16396 14.3693 3.82678L14.3583 3.40187C15.0032 2.94192 15.561 2.36404 16 1.70616Z" fill="#263238" />
                                </svg>

                            </a>
                        </li>
                        <li>
                            <a href='https://www.instagram.com/springfinancehq/' target='_blank' rel='noreferrer'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4395_48287)">
                                        <path d="M11.6689 0H4.33105C1.94287 0 0 1.94287 0 4.33105V11.669C0 14.0571 1.94287 16 4.33105 16H11.669C14.0571 16 16 14.0571 16 11.669V4.33105C16 1.94287 14.0571 0 11.6689 0V0ZM7.99998 12.3749C5.58764 12.3749 3.62512 10.4123 3.62512 7.99998C3.62512 5.58764 5.58764 3.62512 7.99998 3.62512C10.4123 3.62512 12.3749 5.58764 12.3749 7.99998C12.3749 10.4123 10.4123 12.3749 7.99998 12.3749ZM12.4795 4.65685C11.7666 4.65685 11.1867 4.07702 11.1867 3.36413C11.1867 2.65124 11.7666 2.07129 12.4795 2.07129C13.1924 2.07129 13.7723 2.65124 13.7723 3.36413C13.7723 4.07702 13.1924 4.65685 12.4795 4.65685Z" fill="#263238" />
                                        <path d="M8.00012 4.56323C6.1051 4.56323 4.56323 6.10498 4.56323 8.00012C4.56323 9.89513 6.1051 11.437 8.00012 11.437C9.89525 11.437 11.437 9.89513 11.437 8.00012C11.437 6.10498 9.89525 4.56323 8.00012 4.56323Z" fill="#263238" />
                                        <path d="M12.4792 3.00928C12.2837 3.00928 12.1245 3.16846 12.1245 3.36401C12.1245 3.55957 12.2837 3.71875 12.4792 3.71875C12.6749 3.71875 12.8341 3.55969 12.8341 3.36401C12.8341 3.16833 12.6749 3.00928 12.4792 3.00928Z" fill="#263238" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4395_48287">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>
                        <li className='hidden'>
                            <a href='instagram.com'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_4395_48283)">
                                        <path d="M4.38629 15.4921H0.508301V5.04272H4.38629V15.4921Z" fill="#263238" />
                                        <path d="M15.4922 15.4921H11.693L11.6946 10.8694C11.7106 10.119 11.4077 9.50015 10.8846 9.21378C10.5254 9.01703 10.1121 9.01648 9.72424 9.20599L9.69073 15.4921H5.7146V5.04272H9.69312V5.46744C10.9292 4.96628 12.2399 5.0386 13.379 5.69009C14.6628 6.42453 15.4922 7.78226 15.4922 9.14914V15.4921Z" fill="#263238" />
                                        <path d="M2.43933 4.39032C1.3656 4.39032 0.492188 3.51599 0.492188 2.44125C0.492188 1.36652 1.3656 0.492188 2.43933 0.492188C3.51288 0.492188 4.38629 1.36652 4.38629 2.44125C4.38629 3.51599 3.51288 4.39032 2.43933 4.39032Z" fill="#263238" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4395_48283">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>


            </div>
        </Foot>
    )
}

export default Footer

const Foot = styled.footer`
    /* background: linear-gradient(128.03deg, rgba(97, 153, 219, 0.1) -0.78%, rgba(75, 202, 105, 0.1) 90.56%); */
    //background: #4BCA69;
    background: var(--placeholder, linear-gradient(128deg, rgba(97, 153, 219, 0.10) 0%, rgba(75, 202, 105, 0.10) 100%));

    .form{
        box-shadow: 0px 32px 84px rgba(14, 86, 124, 0.165308);
        border-radius: 4px;
    }

    form{
        .btn{
            background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
            border-radius: 5px;
            color: #FFFFFF;
        }
    }

    .scroll-container{
        position: absolute;
        top: 0;
        right:4%;
        height: 100%;
    }

    .scroll{
        background: linear-gradient(128.03deg, #6199DB -0.78%, #4BCA69 90.56%);
        box-shadow: 0px 1.11602px 2.23204px rgba(16, 24, 40, 0.05);
        position: sticky;
        top: 75vh;
        cursor: pointer;
    }

    .scroll-container:before {
      content: '';
      display: block;
      height: 100vh;
      pointer-events: none;
    }
`