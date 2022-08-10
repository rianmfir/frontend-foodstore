import React from 'react'
import './button.scss';

const Button = ({ title, ...rest }) => {
    return (
        // <div>
        //     <button {...rest} className="button">{title}</button>
        // </div>
        <div>
            <button {...rest} className="food-btn">{title}</button>
        </div>

    )
}

export default Button;