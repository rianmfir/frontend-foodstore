import { useEffect, useState } from "react";
import { SideBarMenu } from '../../config/navigation';
import { Footer, SideBar, TopBar } from '../../components';
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
            <Nav id="nav-topbar" className="topbar">
                <TopBar />
            </Nav>

            <Nav id="nav-sidebar" className="sidebar">
                <SideBar />
            </Nav>


            <div id="main-content" className="content" >
                <Outlet />
            </div >
            {/* </div> */}

            <Footer />
        </>
    )
}

export default Dashboard;