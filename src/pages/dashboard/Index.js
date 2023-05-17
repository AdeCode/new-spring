import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Outlet, Navigate } from 'react-router-dom'


function Index() {
    const [open, setOpen] = useState(false)

    const toggleButton = () => {
        setOpen(!open)
    }

    return (
        <Container className='bg-[#F5F5F5] hidden justify-between lg:flex w-full'>
            <div className='w-[13%] h-full'>
                <div className="fixed overflow-auto">
                    <Sidebar />
                </div>
            </div>
            <div className='flex flex-col w-[80%] h-full pb-5'>
                <TopBar />

                <div className='main min-h-full mt-4 ml-4 mr-2'>
                    <Outlet />
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    /* background: rgba(246, 246, 246, 0.34); */

    
`
export default Index