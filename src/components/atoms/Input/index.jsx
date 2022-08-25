import React from 'react'
import { Col, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import './input.scss';

const Input = ({ customType, dataAddress, label, options, error, ...rest }) => {

    const customInput = () => {

        if (customType === 'input') {
            return (
                <>
                    {/* <InputGroup hasValidation> */}
                    <FloatingLabel label={label}>
                        <Form.Control
                            required
                            className="form-control"
                            id="floatingInputValue"
                            {...rest}
                        />
                        <Form.Control.Feedback type="invalid">
                            {label} harus diisi
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    {/* </InputGroup> */}
                </>

            )
        }
        if (customType === 'optionInput') {
            return (

                // <FloatingLabel
                //     controlId="floatingSelectGrid"
                //     label={label}
                // >
                //     <Form.Select aria-label="Floating label select example"
                //         disabled={options.length === 0}
                //         {...rest}
                //     >
                //         {/* <option value="">Pilih {label}</option> */}
                //         {
                //             options.map((e, i) => {
                //                 const idValue = e.id ? e.id : e._id
                //                 return (
                //                     <option
                //                         value={JSON.stringify({
                //                             id: idValue,
                //                             name: e.name
                //                         })}
                //                         key={i}

                //                     >
                //                         {e.name}
                //                     </option>
                //                 )
                //             })

                //         }

                //     </Form.Select>
                // </FloatingLabel >
                <FloatingLabel
                    controlId="floatingSelectGrid"
                    label={label}

                >
                    <Form.Select
                        // aria-label="Floating label select example"
                        // value={form.provinsi}
                        disabled={options.length === 0}
                        {...rest}
                    // onChange={(e) => {
                    //     dispatch(setFormAddress("provinsi", e.target.value))
                    // }}
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

        if (customType === 'tes') {
            return (
                <select
                    name={label}
                    // onChange={/* on change handler function */}
                    // defaultValue={gender}
                    // required
                    {...rest}
                >
                    {
                        options.map((e, i) => {
                            return (
                                <option key={i} value={e.name}>{e.name}</option>
                            )
                        })
                    }
                    {/* <option value="Male">Male</option>
                <option value="Female">Female</option> */}
                </select>
            )
        }

    }



    // const customInput = customType === 'input'
    //     ? <FloatingLabel controlId={label} label={label}>
    //         <Form.Control
    //         class="form-control" id="floatingInputValue"
    //         {...rest} 
    //         />
    //     </FloatingLabel>
    //     :
    //     <Col md >
    //         <FloatingLabel
    //             controlId="floatingSelectGrid"
    //             label={label}
    //         >
    //             <Form.Select aria-label="Floating label select example">
    //                 <option selected>Pilih {label}</option>
    //                 <option value="Test">Test</option>
    //                 {/* {
    //                     options.map(e => {
    //                         <option key={e._id} value={e.name}>{e.name}</option>
    //                     })
    //                 } */}
    //             </Form.Select>
    //         </FloatingLabel>
    //     </Col>



    return (
        <div className='input-wrapper'>
            {customInput()}
        </div>
    )
}

export default Input;

