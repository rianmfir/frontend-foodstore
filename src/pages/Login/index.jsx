// import './login.scss'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginBg } from '../../assets/images';
import { userLogin } from '../../app/features/Auth/actions';
import { Form, Image } from 'react-bootstrap';
import { BackPage, Button, Gap, Input, Logo } from '../../components/atoms';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {

    const [userState, setUserState] = useState({});
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const message = auth
        ? auth.user?.message
        : null

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(userState));
    }

    return (

        <div className="main-page">
            <div className="left" >
                <Image
                    src={LoginBg}
                    className="bg-image"
                    alt="image-bg"
                />
            </div>
            <div className="right">
                <Link to={'/'} style={{ textDecoration: "none" }}>
                    <div className='btnHome'>
                        <span className="fw-bold color-secondary" style={{ fontSize: '20px' }}>Home <BsFillArrowRightCircleFill size={24} color={'var(--dark-orange)'} />
                        </span>
                    </div>
                </Link>
                <div className='d-flex flex-column justify-content-center  my-5'>
                    <Logo type="md" />
                    {/* <Gap height={10} /> */}
                    <Form onSubmit={handleSubmit}>
                        <Gap height={30} />
                        <p className='message fs-6'><i>{message}</i></p>
                        <Gap height={30} />
                        <p className='title'>Login</p>
                        <Gap height={18} />

                        <Input
                            label="E-mail"
                            customType='input'
                            type="teks"
                            placeholder="jhon@example.com"
                            required
                            className={auth.user?.error === 1 ? 'loginError' : ''}
                            onChange={(e) => {
                                const email = e.target.value;
                                setUserState({ ...userState, ...{ email } });
                            }}
                        />
                        <Gap height={18} />
                        <Input
                            label="Password"
                            customType='input'
                            type="password"
                            placeholder="********"
                            required
                            className={auth.user?.error === 1 ? 'loginError' : ''}
                            onChange={(e) => {
                                const password = e.target.value;
                                setUserState({ ...userState, ...{ password } });
                            }}
                        />
                        <Gap height={50} />
                        <Button title="Login" type="submit" />
                    </Form>
                    <Gap height={100} />
                    <BackPage paragraph={"Belum punya akun ? "} title={"Register"} to={"/register"} />
                </div>
            </div>
        </div >
    )
}

export default Login;