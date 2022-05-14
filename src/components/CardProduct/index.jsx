// import { dummyImmage } from '../../assets/images';
import Tag from '../Tag';
import './cardProduct.scss';
import { Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addCartExample, addToCart } from '../../app/features/Cart/actions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CardProduct = ({ item }) => {

    const baseURL = axios.defaults.baseURL;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [enable, setDisable] = useState(false);


    const handlePesan = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            navigate("/login");
        } else {
            dispatch(addToCart({ product: item, qty: 1 }));
        }
        // setDisable(!enable);
    };

    const send = () => {
        // console.log(item);
        dispatch(addCartExample(item));
    }

    let cart = useSelector((state) => state.cart);

    console.log("Cart Data : ", cart)


    return (
        <>
            <Card className="card mb-4 ms-auto" style={{ height: "30rem" }}>
                <Card.Img
                    variant="top"
                    src={`${baseURL}images/products/${item.image_url}`}
                    style={{ height: '15rem' }} />
                <Card.Body className="border">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {item.category.name}
                    </Card.Subtitle>
                    <Tag items={item.tags} />
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Card.Text>
                        {item.price}
                    </Card.Text>
                    {/* <Button variant="primary" onClick={() => dispatch(addItem({ product: item, qty: 1 }))}>Add to Cart</Button> */}
                    <Button variant="primary" onClick={() => dispatch(addCartExample(item))} className={enable ? "disabled" : ""}>Add to Cart</Button>
                    {/* <Button variant="primary" onClick={handlePesan}>Add to Cart</Button> */}
                </Card.Body>
            </Card>
        </>
    )
}

export default CardProduct;