import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "../components";
import {
    Account,
    Cart,
    Checkout,
    Dashboard,
    Error,
    Home,
    Login,
    Register,
    Invoices
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
                    path="/Login"
                    element={
                        user?.role
                            ? <Navigate to="/" replace />
                            : <Login />
                    } />

                <Route path="/Register" element={<Register />} />
                <Route path="user" element={<Dashboard />}>
                    <Route index element={<Account />} />
                    <Route path="account" element={<Account />} />
                    <Route path="order" element={<Login />} />
                    <Route path="invoice" element={<Register />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>

        </>
    )
}

export default Routing;