import React from 'react'

function Selector({ label, options, value, onChange, }) {
    return (
        <div className='flex flex-col'>
            <label>{label}</label>
            <select
                value={value}
                onChange={onChange}
                className='border p-2 mr-2'
            >
                {options.map((option, index) => (
                    <option key={index} value={option?.key ? option?.key : option}>
                        {option?.name ? option?.name : option}
                    </option>
                ))}
            </select>
        </div>

    )
}

export default Selector