import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "../components";
import { AdminProducts } from "../components/Admin";
import { UserOrder } from "../components/User";
import {

    Cart,
    Checkout,
    Dashboard,
    Error,
    Home,
    Login,
    Register,
    Invoices,
    Account
} from "../pages";

const Routing = () => {

    const user = useSelector((state) => state.auth?.user?.user);

    // console.log('Role = ', user)

    return (
        // Ditaro dinavigation
        <>
            {/* <Navigation /> */}
            <Routes>
                <Route exact path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/checkout" element={<Checkout />} />
                    <Route path="/invoices/" element={<Invoices />} />
                </Route>
                {

                }
                <Route
                    path="/login"
                    element={
                        user?.role
                            ? <Navigate to="/" replace />
                            : <Login />
                    } />

                <Route path="/register" element={<Register />} />

                <Route path="user" element={<Dashboard />}>
                    <Route index element={<Account />} />
                    <Route path="account" element={<Account />} />
                    <Route path="order" element={<UserOrder />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>

                <Route path="admin" element={<Dashboard />}>
                    <Route index element={<AdminProducts />} />
                    <Route path="products" element={<AdminProducts />} />
                    {/* <Route path="cart" element={<Home />} />
                    <Route path="checkout" element={<Checkout />} /> */}
                </Route>

                <Route path='*' element={<Error />} />
            </Routes>

        </>
    )
}

export default Routing;