import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
import './input.scss';

const Input = ({ label, ...rest }) => {
    return (
        <div className='input-wrapper'>
            <FloatingLabel controlId={label} label={label}>
                <Form.Control {...rest} />
            </FloatingLabel>
        </div>
    )
}

export default Input;

