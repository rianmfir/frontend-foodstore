import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Account, Logout, Navigation, Products } from "../components";
import {
    AdminDashboard,
    ListCategories,
    ListProduct,
    ListTags,
    ListUsers
} from "../components/Admin";
import {
    UserDashboard,
    UserOrder
} from "../components/User";
import {
    Cart,
    Checkout,
    Dashboard,
    Error,
    Home,
    Login,
    Register,
    Invoices,
} from "../pages";

const Routing = () => {

    const user = useSelector((state) => state.auth?.user?.user);
    const cart = useSelector((state) => state.cart);
    const { id } = useSelector((state) => state.order);

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    {
                        cart?.length > 0
                            ? <Route path="/checkout" element={<Checkout />} />
                            : null
                    }

                    {
                        id
                            ?
                            <Route path="/invoices/" element={<Invoices />} />
                            : null
                    }
                </Route>
                {

                }
                <Route path="/login" element={
                    user?.role === 'admin'
                        ? <Navigate to="/admin/dashboard" replace />
                        : user?.role === 'user'
                            ? <Navigate to="/" replace />
                            : <Login />
                } />
                <Route path="/register" element={
                    user?.role
                        ? <Navigate to="/" replace />
                        : <Register />
                } />

                {
                    user?.role === 'user'
                        ?
                        <Route path="user" element={<Dashboard />}>
                            <Route index element={<UserDashboard />} />
                            <Route path="dashboard" element={<UserDashboard />} />
                            <Route path="account" element={<Account />} />
                            <Route path="order" element={<UserOrder />} />
                            <Route path="checkout" element={<Checkout />} />
                        </Route>
                        : null
                }
                {
                    user?.role === 'admin'
                        ?
                        <Route path="admin" element={<Dashboard />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="products" element={<Products />}>
                                <Route exact index element={<ListProduct />} />
                                <Route path="product" element={<ListProduct />} />
                                <Route path="category" element={<ListCategories />}>
                                    <Route path=":id" element={<ListCategories />} />
                                </Route>
                                <Route path="tag" element={<ListTags />}>
                                    <Route path=":id" element={<ListTags />} />
                                </Route>
                            </Route>
                            <Route path="users" element={<ListUsers />} />
                        </Route>
                        : null
                }
                <Route path='logout' element={<Logout />} />

                <Route path='*' element={<Error />} />
            </Routes>

        </>
    )
}

export default Routing;