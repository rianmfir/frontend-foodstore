import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Category, Dashboards, ListTags, Navigation, Products } from "../components";
import { AdminProducts, FormProduct, ListCategories, ListProduct } from "../components/Admin";
import { UserOrder } from "../components/User";
import Profile from "../components/User/Profile";
import {
    Cart,
    Checkout,
    Dashboard,
    Error,
    Home,
    Login,
    Register,
    Invoices,
    Account,

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
                <Route path="/login" element={
                    user?.role
                        ? <Navigate to="/" replace />
                        : <Login />
                } />
                <Route path="/register" element={<Register />} />

                <Route path="user" element={<Dashboard />}>
                    <Route index element={<Dashboards />} />
                    <Route path="dashboard" element={<Dashboards />} />
                    <Route path="account" element={<Account />} />
                    <Route path="order" element={<UserOrder />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>


                <Route path="admin" element={<Dashboard />}>
                    <Route index element={<Dashboards />} />
                    <Route path="dashboard" element={<Dashboards />} />
                    <Route path="products" element={<Products />}>
                        <Route exact index element={<ListProduct />} />
                        <Route path="product" element={<ListProduct />} />
                        <Route path="category" element={<ListCategories />} />
                        <Route path="tag" element={<ListTags />} />
                    </Route>
                </Route>

                <Route path='*' element={<Error />} />
            </Routes>

        </>
    )
}

export default Routing;