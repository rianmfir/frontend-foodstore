import { Container } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct, Tag } from "../../components";
import { getProducts, getTags } from '../../app/features/Product/actions';
import { addItem, addToCart } from '../../app/features/Cart/actions';
import { getCartItem } from '../../app/api/cart';

const Home = () => {

    const { product, tags } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth.user);

    let { token } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

    let userID = auth !== null ? auth.user._id : auth;

    console.log("Auth : ", userID);
    console.log("Token : ", token);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getTags());
        dispatch(getCartItem(token, userID));

    }, [dispatch]);

    return (

        <Container className="mt-5">
            <div className="d-flex">
                <strong>
                    <h2>Tags: </h2>
                </strong>
                <div className="my-1">
                    <Tag items={tags} />
                </div>

            </div>

            {/* Card */}
            <div className="row">
                {
                    product.map((item, index) => {
                        return (
                            <div key={index} className="col-lg-3">
                                <CardProduct item={item} onAddToCart={() => dispatch(addToCart(item))} />
                            </div>
                        )
                    })
                }

            </div>
            {/* Akhir Card */}

        </Container >
    )
}

export default Home;