import React from 'react'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../app/features/Auth/actions';

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(function () {
            dispatch(userLogout());
            window.location.href = '/';
        }, 1500);
    }, [dispatch])

    return (
        <div className="d-flex justify-content-center align-items-center bg-black bg-opacity-50" style={{ height: ' 100vh' }}>
            <div className="text-center">
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="danger" />
                <p className="text-muted">L O G O U T . . .</p>
            </div>
        </div>
    )
}

export default Logout;