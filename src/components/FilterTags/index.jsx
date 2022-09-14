import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setTag } from '../../app/features/Product/actions';

const FilterTags = ({ tag, tags, category }) => {

    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false);

    const [filterTag, setFilterTag] = useState([]);

    const handleCheck = event => {
        let updatedList = [...filterTag];
        if (event.target.checked) {
            updatedList = [...filterTag, event.target.value];
        } else {
            updatedList.splice(filterTag.indexOf(event.target.value), 1);
        }
        setFilterTag(updatedList);
    };

    useEffect(() => {
        dispatch(setTag(filterTag))
        setLoading(false)
    }, [dispatch, filterTag])

    useEffect(() => {
        setFilterTag([]);
        setLoading(true)
    }, [category]);

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
