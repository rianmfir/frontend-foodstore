import React from 'react'
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuBar, ShoppingCart } from '../atoms';

const TopBar = () => {

    const { titleDashboard } = useSelector(state => state.auth);

    return (
        <Navbar variant="light" className='d-flex justify-content-between px-4 border' fixed="top" style={{ marginLeft: '239px', backgroundColor: '#ffffff', borderBottom: '1px solid #e8e8e8' }}>
            <Navbar.Brand> <span className="color-primary fw-bold fs-2">{titleDashboard}</span></Navbar.Brand>
            <Nav>
                <NavLink as={Link} to={'/'}>
                    <span className="fs-4 color-primary fw-bolder">Home</span>
                </NavLink>
                <ShoppingCart />
                <MenuBar />
            </Nav>

        </Navbar >
    )
}

export default TopBar;