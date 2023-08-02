import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

export default function BackNav({info}) {
    const navigate = useNavigate()
  return (
    <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6 w-[200px]'>
        <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>{info}</h2>
    </Link>
  )
}
