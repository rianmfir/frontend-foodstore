// import { dummyImmage } from '../../assets/images';
import Tag from '../Tag';
import './cardProduct.scss';
import { Card, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../app/features/Cart/actions';


const CardProduct = ({ products, onAddToCart }) => {

    const baseURL = axios.defaults.baseURL;
    const dispatch = useDispatch();

    // console.log("Card Item : ", useSelector(state => state.cart))
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 2, style: 'currency', currency: 'IDR' }).format(number);
    }
    return (
        <>
            {
                products.map((item, index) => {
                    return (
                        <Col md={4} sm={6} xs={6} key={index}>
                            <Card className='shadow' >
                                <Card.Img
                                    variant='top'
                                    src={`${baseURL}images/products/${item.image_url}`}
                                    height="200px"
                                />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Tag items={item.tags} />
                                    <Card.Text>{formatRupiah(item.price)}</Card.Text>
                                    {/* <Button variant="primary" onClick={() => onAddToCart()}>Add to Cart</Button> */}
                                    <Button variant="primary" onClick={() => dispatch(addToCart(item))}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })

            }
        </>
    )
}

export default CardProduct;