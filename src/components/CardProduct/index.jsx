// import { dummyImmage } from '../../assets/images';
import Tag from '../Tag';
import './cardProduct.scss';
import { Col, Image, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../app/features/Cart/actions';

import './cardProduct.scss';
import { Button } from '../atoms';
import { formatRupiah } from '../../utils';


const CardProduct = ({ products }) => {

    const baseURL = axios.defaults.baseURL;
    const dispatch = useDispatch();
    return (
        <>
            <Row>
                {
                    products.map((item, index) => {
                        return (
                            <Col xs="6" md="4" lg="3" key={index}>
                                <div className="food-card d-flex justify-content-center align-items-center flex-column">
                                    <div className="food-img">
                                        <Image src={`${baseURL}images/products/${item.image_url}`} alt="" roundedCircle />
                                    </div>

                                    <h3 className="food-name">{item.name}</h3>
                                    <h5 className="food-price">{formatRupiah(item.price)}</h5>

                                    <Button
                                        title={"Add to Cart"}
                                        onClick={() => dispatch(addToCart(item))}
                                    />
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>

        </>
    )
}

export default CardProduct;