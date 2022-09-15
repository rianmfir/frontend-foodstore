import React, { useState } from 'react'
import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { CgShoppingCart } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCartItems, saveCarts } from '../../../app/features/Cart/actions';
import { totalItemCart } from '../../../utils';

import './shoppingCart.scss';

const ShoppingCart = () => {

  const dispatch = useDispatch();
  let cart = useSelector(state => state.cart);
  let { isLoggedIn } = useSelector(state => state.auth);

  const [Qty, setQty] = useState();

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCartItems());
    }
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    if (isLoggedIn === true) {
      saveCarts(cart);
      setQty(totalItemCart(cart));
      localStorage.setItem('cart', JSON.stringify(cart));
      // console.log("Cart Berubah")
    }
  }, [cart, isLoggedIn])

  return (
    <Nav className='ms-auto '>
      <NavLink to="/cart">
        <div className="d-flex justify-content-start align-items-center">

          <button className="nav-btn cart">
            <CgShoppingCart size="2em" />
            {
              Qty ?
                <span
                  className="position-absolute translate-middle badge rounded-pill"
                  style={{ backgroundColor: "#fbd560" }}>
                  {Qty}
                </span>
                :
                ""
            }
          </button>
        </div>
      </NavLink>

    </Nav>
  )
}

export default ShoppingCart;