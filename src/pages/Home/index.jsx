import { Container } from 'react-bootstrap'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct, Tag } from "../../components";
import { getProducts, getTags } from '../../app/features/Product/actions';

const Home = ({ nama }) => {

    const { product, tags } = useSelector(state => state.products);
    const dispatch = useDispatch();
    // const loggedIn = useSelector((state) => state.auth.isLoggedIn);

    const { data } = useSelector(state => state.cart);
    const datas = useSelector(state => state.cart);
    console.log(datas);

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
                                <CardProduct item={item} />
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