import { Route, Routes } from "react-router-dom";
import { Navigation } from "../components";
import { Account, Cart, Dashboard, Home, Login, Register } from "../pages";

const Routing = () => {
    return (
        // Ditaro dinavigation
        <>
            {/* <Navigation /> */}
            <Routes>
                <Route exact path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="account" element={<Dashboard />}>
                    <Route index element={<Account />} />
                    <Route path="dashboard" element={<Account />} />
                    <Route path="order" element={<Login />} />
                    <Route path="invoice" element={<Register />} />
                </Route>
            </Routes>

        </>
    )
}

export default Routing;