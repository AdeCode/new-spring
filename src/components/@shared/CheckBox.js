import React from 'react'
import styled from 'styled-components'

function CheckBox({ checked, onChange }) {
    return (
        <Label className='flex gap-2 my-4'>
            <input
                type="checkbox"
                onChange={onChange}
            />
            <svg
                className={`checkbox ${checked ? "checkbox--active" : ""}`}
                aria-hidden="true"
                viewBox="0 0 15 11"
                fill="none"
            >
                <path
                    d="M1 4.5L5 9L14 1"
                    strokeWidth="2"
                    stroke={checked ? "#fff" : "none"}
                />
            </svg>
            <h2 className='text-gray'>
                You agree to Spring <a href='sprinfinance.com.terms'>terms and conditions.</a>
            </h2>
        </Label>
    )
}

const Label = styled.label`
    input[type="checkbox"] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    }

    .checkbox {
    display: inline-block; 
    height: 20px;
    width: 20px;
    background: #fff;
    border: 2px #ddd solid;
    margin-right: 4px;
    }

    .checkbox--active {
    border-color: green;
    background: green;
    }
`

export default CheckBox