import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ListTags from '../ListTags';

const ListCategories = ({ categories, category, onFilterCategory }) => {


    // const { tags } = useSelector(state => state.products);
    // console.log("Tag Paginate : ", tags);

    const [click, setClick] = useState(true)

    const handleChange = (state) => {
        setClick(!click);
        click ? onFilterCategory(state) : onFilterCategory('');
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
                            name="category"
                            type={'checkbox'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleChange(state.name)}
                            // onClick={() => onFilterCategory(state.name)}
                            disabled={category !== state.name && category !== ''}
                        />
                    ))
                }
                <hr />
            </Form>


            {/* <ListGroup >
                    <ListGroup.Item
                        style={{ cursor: 'pointer' }}
                        onClick={() => onFilterCategory('')}
                        active={category === ''}
                        disabled={category === ''}
                    >

                        <spam>
                            Semua
                        </spam>

                    </ListGroup.Item>
                    {categories &&
                        categories.map((value, index) => (
                            <ListGroup.Item
                                key={index}
                                // className="category-aktif"
                                style={{ cursor: 'pointer' }}
                                onClick={() => onFilterCategory(value.name)}
                                active={category === value.name}
                                disabled={category === value.name}
                            >
                                <span>
                                    {value.name}
                                </span>
                            </ListGroup.Item>
                        ))}
                </ListGroup> */}
        </Col >


    )
}

export default ListCategories;