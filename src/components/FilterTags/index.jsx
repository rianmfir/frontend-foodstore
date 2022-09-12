import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTag, success } from '../../app/features/Product/actions';
import store from '../../app/store';

let currentCategory;
const FilterTags = ({ tag, tags, category }) => {

    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false);

    const [checked, setChecked] = useState(false);
    const [filterTag, setFilterTag] = useState([]);
    const checkboxRef = useRef();

    const handleCheck = event => {
        let updatedList = [...filterTag];
        if (event.target.checked) {
            updatedList = [...filterTag, event.target.value];
            console.log("Checked");
        } else {
            updatedList.splice(filterTag.indexOf(event.target.value), 1);
            console.log("Unchecked");
        }
        setFilterTag(updatedList);
        console.log(event)
    };


    useEffect(() => {
        dispatch(setTag(filterTag))
        setLoading(false)
        console.log("Loading 3 : ", loading)
    }, [dispatch, filterTag])

    useEffect(() => {
        setFilterTag([]);
        setLoading(true)
        console.log("Loading 2 : ", loading)
    }, [category]);



    if (loading) {
        return (<b>L O A D I N G  . . . . . .</b>)
    }


    return (
        <Col>
            <Form>
                <h6>
                    <strong>Tags</strong>
                </h6>
                {
                    loading
                        ? "L O A D I N G  . . . . . ."
                        : tags && tags.map(state => (
                            <Form.Check
                                key={state._id}
                                value={state.name}
                                label={state.name}
                                name="tags"
                                type={'checkbox'}
                                // checked={checked}
                                // ref={checkboxRef}
                                style={{ cursor: 'pointer' }}
                                onChange={handleCheck}
                            />
                        ))
                }
                <hr />
            </Form>
        </Col>
    )
}

export default FilterTags;
