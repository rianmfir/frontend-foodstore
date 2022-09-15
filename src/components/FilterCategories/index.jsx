import React from 'react'
import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loading, setCategory } from '../../app/features/Product/actions';
import './filterCategories.scss';

const FilterCategories = ({ categories, category }) => {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false)

    const handleChange = (state) => {
        setChecked(!checked);
        dispatch(setCategory(state));
        const Checked = () => {
            dispatch(setCategory(''))
            dispatch(loading);
        }
        const unChecked = () => {
            dispatch(setCategory(state))
        }
        checked
            ?
            Checked()
            :
            unChecked()
    }

    return (
        <Col>
            <Form>
                <h6>
                    <strong>Kategori</strong>
                </h6>
                {
                    categories && categories.map(state => (
                        <Form.Check
                            key={state._id}
                            label={state.name}
                            value={state.name}
                            name="category"
                            type={'checkbox'}
                            style={{ cursor: 'pointer' }}
                            disabled={checked && category !== state.name}
                            onClick={() => handleChange(state.name)}
                        />
                    ))
                }
                <hr />
            </Form>
        </Col >

    )
}

export default FilterCategories;