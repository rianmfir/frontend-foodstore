// import './login.scss'
import './login.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { dummyImmage } from '../../assets/images';
import { userLogin } from '../../app/features/Auth/actions';
// import Home from '../Home';


const Login = () => {

    const [userState, setUserState] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = useSelector(state => state.auth.user);

    const auth = useSelector(state => state.auth);


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(userLogin(userState));
        if (auth.isLoggedIn === true) {
            navigate("/");
        }
    }

    useEffect(() => {
        if (auth.isLoggedIn === true) {
            navigate("/");
        }
    }, [auth, navigate]);


    return (
        <div className='container shadow-lg p-3 mb-5 bg-body rounded'>
            <div className="row">
                <div className="col-6">
                    <img src={dummyImmage} height='100%' alt='' />
                </div>
                <div className="col-6 container">
                    <form onSubmit={handleSubmit}>

                        <div className="py-5 container">
                            <h5 className='fs-2'>Login</h5>
                            <p className='text-center text-danger mb-5'>{message}</p>

                            <label><b>Email</b></label>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                required
                                onChange={(e) => {
                                    const email = e.target.value;
                                    setUserState({ ...userState, ...{ email } });
                                    { console.log(auth) }
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

                            <button type="submit">Login</button>

                        </div>

                        <p className='text-center'>Belum Punya Akun? <Link to='/register'><strong>Register</strong> </Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;