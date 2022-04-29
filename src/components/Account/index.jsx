import './account.scss';
import { BsPersonCircle } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';
import { userLogout } from '../../app/features/Auth/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';



const Account = ({ isLoggedIn, hoverRef, isHover }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLogout());
        // if (isLoggedIn) {
        //     window.location.reload()
        // }
    }

    let auth = JSON.parse(localStorage.getItem('token'));


    return (

        <div style={{ cursor: "pointer" }}>
            {
                isLoggedIn ?


                    <li className="nav-item" ref={hoverRef}>

                        <a className="nav-link d-flex" >
                            <BsPersonCircle className='fs-2 me-2' />
                            <strong className='fs-4'>
                                {auth && auth.user.full_name}
                            </strong>
                        </a>

                        {
                            isHover ?
                                <div className="shadow mt-0 mb-5 bg-body rounded" style={{ zIndex: 1, position: "absolute" }}>
                                    <div>
                                        <a className="d-block dropdown-item" href="">Settings</a>
                                        <Link
                                            to={'/'}
                                            className="d-block dropdown-item"
                                            onClick={handleLogout}
                                        >Logout</Link>
                                        {/* <a className="d-block dropdown-item" href="/">Log Out</a> */}
                                    </div>
                                </div>
                                :
                                ""
                        }
                    </li >
                    :
                    <li className="nav-item">
                        <div className='d-flex mt-2'>
                            {/* <NavLink to="/register"><h3><strong>Daftar</strong></h3></NavLink> */}
                            <Link to="/register"><h3><strong>Daftar</strong></h3></Link>
                            <><h4>|</h4></>

                            <NavLink to="/login"><h3><strong>Masuk</strong></h3></NavLink>
                        </div>
                    </li>
            }
        </div >
    )
}

export default Account;