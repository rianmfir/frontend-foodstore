import { Footer, SideBar, TopBar } from '../../components';
import { Nav } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import './dashboard.scss';

const Dashboard = () => {

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

            <Footer />
        </>
    )
}

export default Dashboard;