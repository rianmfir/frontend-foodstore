// import './login.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { dummyImmage } from '../../assets/images';

import { userRegister } from '../../app/features/Auth/actions';


const Register = () => {

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
        <div className='container shadow-lg p-3 mb-5 bg-body rounded'>
            <div className="row">
                <div className="col-6">
                    <img src={dummyImmage} height='100%' alt='' />
                </div>
                <div className="col-6">
                    <form onSubmit={handleSubmit}>
                        <div className='container'>
                            <h5 className='fs-2'>Register</h5>
                        </div>
                        <div className="py-5 container">
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

export default Register;