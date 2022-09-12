import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loading, setCategory } from '../../app/features/Product/actions';
import './filterCategories.scss';

const FilterCategories = ({ categories, category, onFilterCategory }) => {
    // const { tags } = useSelector(state => state.products);
    // console.log("Tag Paginate : ", tags);
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false)

    const handleChange = (state) => {
        setChecked(!checked);
        dispatch(setCategory(state));
        console.log(checked)
        const Checked = () => {
            dispatch(setCategory(''))
            dispatch(loading);
            console.log("Checked : 1")
        }
        const unChecked = () => {
            dispatch(setCategory(state))
            console.log("Checked : 2")
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
                            // onClick={() => onFilterCategory(state.name)}
                            // disabled={category !== state.name && category === ""}
                            // disabled={checked && category !== state.name}
                            // disabled={checked && category !== state.name}
                            variant={'warning'}
                        />
                    ))
                }
                <hr />
            </Form>
        </Col >

    )
}

export default FilterCategories;