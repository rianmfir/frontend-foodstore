import { CartItem } from '../../components';

const Cart = () => {
    return (
        <>
            <CartItem />
        </>
    )
    // let { data  = useSelector((state) => state.cart);
    // let tes = useSelector((state) => state.cart);
    // let dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getCartItem())
    // }, [dispatch])

    // console.log("Tes : ", tes.data.length);

    // return (
    //     <div className='container'>
    //         <table className="table">
    //             <thead>
    //                 <tr>
    //                     <th scope="col">Image</th>
    //                     <th scope="col">Name</th>
    //                     <th scope="col">Price</th>
    //                     <th scope="col">Quality</th>
    //                     <th scope="col">Sum</th>
    //                 </tr>
    //             </thead>

    //             <tbody>
    //                 {
    //                     data.map((item, index) => {
    //                         return (
    //                             <tr key={index}>
    //                                 <CartItem items={item} key={index} />
    //                             </tr>
    //                         )

    //                     })
    //                 }
    //             </tbody>
    //         </table>
    //     </div>
    // )
}

export default Cart;