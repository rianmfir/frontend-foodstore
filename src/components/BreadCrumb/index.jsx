import React from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './breadCrumb.scss';

const BreadCrumb = ({ items }) => {
    const navigate = useNavigate();
    return (
        <Breadcrumb>
            {
                items.map((item, i) => (
                    <Breadcrumb.Item
                        key={i}
                        active={i + 1 === items.length}
                        onClick={() => i + 1 !== items.length ? navigate(`${item.path}`) : null}
                    >
                        {item.label}
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb >
    )
}

export default BreadCrumb;