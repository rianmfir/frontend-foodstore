import React from 'react'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../app/features/Auth/actions';
import { setCategory } from '../../app/features/Product/actions';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userLogout());
        dispatch(setCategory(''));
        setTimeout(function () {
            navigate('/');
        }, 1500);
    }, [dispatch, navigate])

    return (
        <div className="d-flex justify-content-center align-items-center bg-dark bg-opacity-10" style={{ height: ' 100vh' }}>
            <div className="text-center">
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <br />
                <span className="color-primary">L   O   G   O   U   T   .   .   .   .   .</span>
            </div>
        </div>
    )
}

export default Logout;