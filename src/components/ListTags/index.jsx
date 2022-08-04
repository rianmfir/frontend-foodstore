import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setTag } from '../../app/features/Product/actions';

const ListTags = ({ tags }) => {

    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);

    const handleCheck = event => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";
    console.log("Chek Items : ", checkedItems);


    useEffect(() => {
        dispatch(setTag(checkedItems))
    }, [dispatch, checkedItems])

    return (
        <Col className=''>
            <Form>
                <h6>
                    <strong>Tags</strong>
                </h6>
                {
                    tags && tags.map(state => (
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

export default ListTags;
