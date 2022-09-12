import React from 'react'
import { Col, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import './input.scss';

const Input = ({ customType, dataAddress, label, options, error, ...rest }) => {

    const customInput = () => {

        if (customType === 'input') {
            return (
                <>
                    <FloatingLabel label={label}>
                        <Form.Control
                            required
                            className="form-control"
                            {...rest}
                        />
                        <Form.Control.Feedback type="invalid">
                            {label} harus diisi
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </>

            )
        }
        if (customType === 'optionInput') {
            return (
                <FloatingLabel
                    controlId="floatingSelectGrid"
                    label={label}

                >
                    <Form.Select
                        disabled={options.length === 0}
                        {...rest}
                        style={{ cursor: 'pointer' }}
                    >
                        <option value="">Pilih {label}</option>
                        {
                            options.map((e, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={e.name}
                                    >
                                        {e.name}
                                    </option>
                                )
                            })
                        }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {label} harus dipilih
                    </Form.Control.Feedback>
                </FloatingLabel >
            )
        }
        if (customType === 'file') {
            return (
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control type="file" size="sm" {...rest} />
                    <Form.Control.Feedback type="invalid">
                        Gambar harus Diupload
                    </Form.Control.Feedback>
                </Form.Group>
            )
        }
    }

    return (
        <div className='input-wrapper'>
            {customInput()}
        </div>
    )
}

export default Input;

