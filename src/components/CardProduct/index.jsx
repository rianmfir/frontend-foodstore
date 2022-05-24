// import { dummyImmage } from '../../assets/images';
import Tag from '../Tag';
import './cardProduct.scss';
import { Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import axios from 'axios';


const CardProduct = ({ item, onAddToCart }) => {

    const baseURL = axios.defaults.baseURL;
    // console.log("Card Item : ", useSelector(state => state.cart))
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
                    {/* <Card.Text>
                        {item.description}
                    </Card.Text> */}
                    <Card.Text>
                        {item.price}
                    </Card.Text>

                    <Button variant="primary" onClick={() => onAddToCart()}>Add to Cart</Button>

                </Card.Body>
            </Card>
        </>
    )
}

export default CardProduct;