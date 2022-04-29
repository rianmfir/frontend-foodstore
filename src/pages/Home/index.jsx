import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProduct, Tag } from "../../components";
import { getProducts, getTags } from '../../app/features/Product/actions';


const Home = ({ nama }) => {

    const [namas, setNamas] = useState('');
    const { product, tags } = useSelector(state => state.products);
    const dispatch = useDispatch();

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

                {
                    // console.log("Ini Tag nya : ", products.tags)
                    // products.tags.map((value) => {
                    //     return (
                    //         <div className="my-1">
                    //             <Tag items={value} />
                    //         </div>
                    //     )
                    // })
                }

                {/* <div className="my-1">
                    <Tag items={product.data} />
                </div> */}

            </div>

            <div className="row">
                {
                    product.map((value, index) => {
                        return (
                            <div key={index} className="col-lg-3">
                                <CardProduct item={value} />
                            </div>
                        )
                        console.log("ini isinya : ", value)
                    })
                }
                {/* <Row> */}

                {
                    // products.data.map((product, key) => {
                    //     return (
                    //         <div key={key} className="col-lg-3">
                    //             <CardProduct item={product} />
                    //         </div>
                    //     )
                    // })
                }
                {/* </Row> */}

            </div>
        </Container >
    )
}

export default Home;