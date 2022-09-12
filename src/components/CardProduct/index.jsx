// import { dummyImmage } from '../../assets/images';
import { Col, Image, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../app/features/Cart/actions';

import './cardProduct.scss';
import { Button } from '../atoms';
import { formatRupiah } from '../../utils';
import { useNavigate } from 'react-router-dom';
import './cardProduct.scss';


const CardProduct = ({ products }) => {

    const baseURL = axios.defaults.baseURL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        if (localStorage.getItem('auth')) {
            dispatch(addToCart(event))
        } else {
            navigate('/login')
        }
    }
    return (
        <>
            <Row >
                {
                    products?.map((item, index) => {
                        return (
                            <Col lg="3" md="4" sm="6" xs="12" key={index}>
                                <div className="food-card d-flex justify-content-center align-items-center flex-column mx-auto ">
                                    <div className="food-img">
                                        <Image src={`${baseURL}images/products/${item.image_url}`} alt="" roundedCircle />
                                    </div>

                                    <h3 className="food-name">{item.name}</h3>
                                    <h5 className="food-price">{formatRupiah(item.price)}</h5>

                                    <Button
                                        title={"Add to Cart"}
                                        onClick={() => handleAddToCart(item)}
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