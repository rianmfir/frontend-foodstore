import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Paginate = ({ activePage, total, onPageChange }) => {

    const handleClick = page => {
        onPageChange(page);
    }

    console.log('Current Page : ', activePage);

    let items = [];
    for (let i = 1; i <= total; i++) {
        items = [
            ...items,
            <Pagination.Item onClick={() => handleClick(i)} key={i} active={i === activePage}>
                {i}
            </Pagination.Item>]
    }

    return (

        <Pagination>
            <Pagination.First disabled={activePage === 1} onClick={() => handleClick(1)} />
            <Pagination.Prev
                disabled={activePage === 1}
                onClick={() => handleClick(activePage - 1)}
            />
            {items}
            <Pagination.Next
                disabled={activePage === total}
                onClick={() => handleClick(activePage + 1)}

            />

            <Pagination.Last disabled={activePage === total} onClick={() => handleClick(total)} />
        </Pagination>

    )
}

export default Paginate;