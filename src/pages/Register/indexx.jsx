// import './login.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { dummyImage } from '../../assets/images';

import { userRegister } from '../../app/features/Auth/actions';
import { MdShoppingBasket } from 'react-icons/md';
import './register.scss';


const Registers = () => {

    const [userState, setUserState] = useState({});
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userRegister(userState));

        if (auth._id) {
            return navigate("/login")
        };
        console.log(auth._id);
    }


    return (
        <div className='container shadow-lg my-3 rounded'>
            <div className="row">
                <div className="col-6">
                    <img src={dummyImage} height='90%' alt='' />
                </div>
                <div className="col-6">
                    <Link to='/' className='pt-3 text-decoration-none'>
                        <div className='d-flex justify-content-center'>
                            <MdShoppingBasket size={70} className="me-1 text-success" />
                        </div>
                        <div className='d-flex justify-content-center fs-1'>
                            <strong><span style={{ color: '#f9a825' }}>Food</span> <span style={{ color: '#9eeb47f7' }}>Store</span></strong>
                        </div>
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <div className='container'>
                            <h5 className='fs-2'>Register</h5>
                        </div>
                        <div className="pt-5 container">
                            <label><b>Full Name</b></label>
                            <input
                                type="text"
                                placeholder="Enter Fullname"
                                onChange={(e) => {
                                    const full_name = e.target.value;
                                    setUserState({ ...userState, ...{ full_name } });
                                }}
                            />
                            <span className='d-flex text-danger'></span>

                            <label><b>Email</b></label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                required
                                onChange={(e) => {
                                    const email = e.target.value;
                                    setUserState({ ...userState, ...{ email } });
                                }}
                            />

                            <label><b>Password</b></label>
                            <input
                                type="password"
                                placeholder="********"
                                name="password"
                                required
                                onChange={(e) => {
                                    const password = e.target.value;
                                    setUserState({ ...userState, ...{ password } });
                                }}
                            />

                            <button type="submit">Register</button>

                        </div>

                        <p className='text-center'>Sudah Punya Akun? <Link to='/login'><strong>Login</strong> </Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registers;