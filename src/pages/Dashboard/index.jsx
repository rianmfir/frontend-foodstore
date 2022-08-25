import { useEffect, useState } from "react";
import { SideBarMenu } from '../../config/navigation';
import { SideBar, TopBar } from '../../components';
import { Nav } from 'react-bootstrap';

import './dashboard.scss';
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const [menu, setMenu] = useState([]);
    const [pages, setPages] = useState("");

    const role = "user";

    const sideBar = () => {
        if (role === "admin") {
            return (setMenu(SideBarMenu.admin))
        } else if (role === "user") {
            return (setMenu(SideBarMenu.user)

            )
        }
    }

    useEffect(() => {
        sideBar();
    }, [])

    console.log(auth)

    return (
        <>
            <Nav id="nav-sidebar" className="sidebar">
                <SideBar />
            </Nav>

            <Nav id="main-content" className="content p-5">
                {/* <TopBar /> */}
                <Outlet />
            </Nav>
        </>

    )
}

export default Dashboard;