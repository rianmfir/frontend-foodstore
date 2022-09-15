import React from 'react'
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Logo = ({ type }) => {

    return (
        <div>
            {
                type === "md"
                    ?
                    <div as={Link} to='/' className='pt-3 text-decoration-none'>
                        <div className='d-flex justify-content-center'>
                            <MdShoppingBasket size={70} className="me-1 text-success" />
                        </div>
                        <div className='d-flex justify-content-center fs-2'>
                            <strong><span style={{ color: '#FF7C57' }}>Food</span> <span style={{ color: '#9eeb47f7' }}>Store</span></strong>
                        </div>
                    </div>
                    :
                    <div as={Link} to='/' className='pt-3 text-decoration-none'>
                        <div className='d-flex my-auto'>
                            <MdShoppingBasket size={30} className="me-1 text-success" />
                            <strong >
                                <span style={{ color: '#FF7C57' }}>Food</span>
                                <span style={{ color: '#9eeb47f7' }}>Store</span>
                            </strong>
                        </div>
                    </div>
            }
        </div>

    )
}

export default Logo;