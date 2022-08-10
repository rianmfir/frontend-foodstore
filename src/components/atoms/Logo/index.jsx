import React from 'react'
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div>
            <Link to='/' className='pt-3 text-decoration-none'>
                <div className='d-flex justify-content-center'>
                    <MdShoppingBasket size={70} className="me-1 text-success" />
                </div>
                <div className='d-flex justify-content-center fs-1'>
                    <strong><span style={{ color: '#f9a825' }}>Food</span> <span style={{ color: '#9eeb47f7' }}>Store</span></strong>
                </div>
            </Link>
        </div>
    )
}

export default Logo;