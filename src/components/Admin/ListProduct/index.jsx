import React from 'react';
import { Image, Row } from 'react-bootstrap';
import { dummyImage } from '../../../assets/images';
import './cardProduct.css';

export const ListProduct = () => {
    return (
        <div id="body">
            <h3 className="color-primary fw-bold">List Product</h3>

            <Row>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="food-card d-flex justify-content-center align-items-center flex-column">
                        <div className="food-img">
                            <Image src={dummyImage} alt="" roundedCircle />
                        </div>

                        <h3 className="food-name">Lemon Tea</h3>
                        <h5 className="food-price">Rp. 15.000,00</h5>

                        <button className="food-btn">Add to Cart</button>
                    </div>
                </div>
            </Row>

        </div>
    )
}

