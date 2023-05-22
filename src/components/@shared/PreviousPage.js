import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PreviousPage() {
    const navigate = useNavigate()
  return (
    <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6 ml-12'>
        <span className="material-symbols-outlined">keyboard_backspace</span><h2 className='font-semibold'>Back</h2>
    </Link>
  )
}

export default PreviousPage