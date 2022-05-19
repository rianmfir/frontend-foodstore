import { Container } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct, Tag } from "../../components";
import { getProducts, getTags } from '../../app/features/Product/actions';
import { addItem, addToCart } from '../../app/features/Cart/actions';

const Home = () => {

    const { product, tags } = useSelector(state => state.products);
    const dispatch = useDispatch();
    // const loggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getTags());
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