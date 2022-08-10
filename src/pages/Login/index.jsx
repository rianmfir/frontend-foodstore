// import './login.scss'
import './login.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { dummyImage } from '../../assets/images';
import { userLogin } from '../../app/features/Auth/actions';
import store from '../../app/store';
import { MdShoppingBasket } from 'react-icons/md';

import './login.scss';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { BackPage, Button, Gap, Input, Logo } from '../../components/atoms';

const Login = () => {

    const [userState, setUserState] = useState({});
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    // const user = useSelector(state => state.auth.user);
    const message = auth
        ? auth.user?.message
        : ""

    const [err, setErr] = useState(message);

    const tes = auth.user?.message;


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(userState));
    }
    console.log(auth);
    console.log("Pesan : ", message);

    return (

        <div className="main-page">
            <div className="left" >
                <Image
                    src={dummyImage}
                    className="bg-image"
                    alt="image-bg"
                />
            </div>
            <div className="right d-flex flex-column justify-content-center">
                <Logo />
                {/* <Gap height={10} /> */}
                <Form onSubmit={handleSubmit}>
                    <p className='message'>{message}</p>
                    <Gap height={60} />
                    <p className='title'>Login</p>
                    <Gap height={18} />

                    <Input
                        label="E-mail"
                        type="teks"
                        placeholder="jhon@example.com"
                        required
                        onChange={(e) => {
                            const email = e.target.value;
                            setUserState({ ...userState, ...{ email } });
                        }}
                    />
                    <Gap height={18} />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="********"
                        required
                        onChange={(e) => {
                            const password = e.target.value;
                            setUserState({ ...userState, ...{ password } });
                        }}
                    />
                    <Gap height={50} />
                    <Button title="Login" type="submit" />
                </Form>
                <Gap height={100} />
                <BackPage paragraph={"Belum punya akun ? "} title={"Register"} to={"/"} />
            </div>

        </div >

        // <div className='container shadow-lg my-4 rounded'>
        //     <div className="row">
        //         <div className="col-md-6 col-sm-12">
        //             <img src={dummyImage} height='100%' alt='' />
        //         </div>
        //         <div className="col-md-6 col-sm-12 container">

        //             <Link to='/' className='pt-3 text-decoration-none'>
        //                 <div className='d-flex justify-content-center'>
        //                     <MdShoppingBasket size={70} className="me-1 text-success" />
        //                 </div>
        //                 <div className='d-flex justify-content-center fs-1'>
        //                     <strong><span style={{ color: '#f9a825' }}>Food</span> <span style={{ color: '#9eeb47f7' }}>Store</span></strong>
        //                 </div>
        //             </Link>

        //             <form onSubmit={handleSubmit}>

        //                 <div className="container">
        //                     <h5 className='fs-2'>Login</h5>
        //                     <p className='text-center text-danger mb-5'>
        //                         {message}
        //                     </p>

        //                     <label><b>Email</b></label>
        //                     <input
        //                         type="text"
        //                         placeholder="Enter Email"
        //                         required
        //                         onChange={(e) => {
        //                             const email = e.target.value;
        //                             setUserState({ ...userState, ...{ email } });
        //                         }}
        //                     />

        //                     <label><b>Password</b></label>
        //                     <input
        //                         type="password"
        //                         placeholder="********"
        //                         name="password"
        //                         required
        //                         onChange={(e) => {
        //                             const password = e.target.value;
        //                             setUserState({ ...userState, ...{ password } });
        //                         }}
        //                     />

        //                     <button type="submit">Login</button>

        //                 </div>

        //                 <p className='text-center'>Belum Punya Akun? <Link to='/register'><strong>Register</strong> </Link></p>
        //             </form>
        //         </div>
        //     </div>
        // </div >
    )
}

export default Login;