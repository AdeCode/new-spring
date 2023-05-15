import React, { useState } from 'react'

function AlertBox({message}) {
    const [show, setShow] = useState(true)
    
  return (
    <>
        {show ?        
        <div className="alert p-3 bg-[#f44336] text-white mb-3 text-sm">
            <span className="closebtn ml-2 text-white font-bold float-right text-xl leading-5 cursor-pointer transition-[0.3s] hover:text-black" 
            onClick={()=>setShow(false)}>&times;</span>
            {message}
        </div>
        :
        null
        }
    </>
    
    
  )
}

export default AlertBox