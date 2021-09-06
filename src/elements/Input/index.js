import React from 'react'
import './input.scss'
import { getuid } from '../../utils/helper'

const Input = ({ type = 'text', onChange, classname = '', value, name, inputMode, style = {}, errorMessage = null, placeholder, onEnter, label, labelclass, suggestions = [] }) => {

    const id = getuid()
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onEnter(e.target.value)
        }
    }

    return (
        <div className="input-wrapper" style={style}>
            <input type={type} className={`custom-input ${classname} ${errorMessage !== null ? 'error' : ''}`} value={value} id={id} onChange={onChange} name={name} inputMode={inputMode} placeholder={placeholder} onKeyDown={handleKeyDown} />
            <label htmlFor={id} className={labelclass}>{label}</label>
            <ul className="suggestions-wrapper">
                {suggestions.map((el, idx) => <li key={`${el}_sugg_${idx}`} className="suggestions-item">{el}</li>)}
            </ul>
            <div className="error-message">{errorMessage || ''}</div>
        </div>
    )
}

export default Input;