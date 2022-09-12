import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { dummyImage, RegisterBg } from '../../assets/images';
import { userLogin, userRegister } from '../../app/features/Auth/actions';
import store from '../../app/store';
import { MdShoppingBasket } from 'react-icons/md';

import { Col, Form, Image, Row } from 'react-bootstrap';
import { BackPage, Button, Gap, Input, Logo } from '../../components/atoms';
import './register.scss';

const Register = () => {

    const [userState, setUserState] = useState({});
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    // const user = useSelector(state => state.auth.user);
    const message = auth.user?.fields
        ? auth.user?.fields
        : ""

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userRegister(userState));
    }

    useEffect(() => {
        if (auth.user?.password) {
            dispatch(userLogin({
                email: userState.email,
                password: userState.password
            }))
            navigate('/');
        }
    }, [auth.user?.password])
    console.log(auth);

    return (

        <div className="main-page">
            <div className="left" >
                <Image
                    src={RegisterBg}
                    className="bg-image"
                    alt="image-bg"
                />
            </div>
            <div className="right d-flex flex-column justify-content-center">
                <Logo type="md" />
                {/* <Gap height={10} /> */}
                <Form onSubmit={handleSubmit}>
                    <Gap height={60} />
                    <p className='title'>Register</p>
                    <Gap height={18} />

                    <Input
                        label="Full Name"
                        customType='input'
                        type="teks"
                        placeholder="Jhon Dhoe"
                        required
                        onChange={(e) => {
                            const full_name = e.target.value;
                            setUserState({ ...userState, ...{ full_name } });
                        }}
                    />
                    <span style={{ fontSize: '14px', color: '#dc3545' }} className="ms-3 pt-0">
                        <i>{message.full_name?.message}</i>
                    </span>
                    <Gap height={5} />
                    <Input
                        label="E-mail"
                        customType='input'
                        type="teks"
                        placeholder="jhon@example.com"
                        required
                        onChange={(e) => {
                            const email = e.target.value;
                            setUserState({ ...userState, ...{ email } });
                        }}
                    />
                    <span style={{ fontSize: '14px', color: '#dc3545' }} className="ms-3 pt-0">
                        <i>{message.email?.message}</i>
                    </span>
                    <Gap height={5} />
                    <Input
                        label="Password"
                        customType='input'
                        type="password"
                        placeholder="********"
                        required
                        onChange={(e) => {
                            const password = e.target.value;
                            setUserState({ ...userState, ...{ password } });
                        }}
                    />
                    <span style={{ fontSize: '14px', color: '#dc3545' }} className="ms-3 pt-0">
                        <i>{message.password?.message}</i>
                    </span>
                    <Gap height={50} />
                    <Button title="Register" type="submit" />
                </Form>
                <Gap height={100} />
                <BackPage paragraph={"Sudah punya akun ? "} title={"Login"} to={"/login"} />
            </div>

        </div >
    )
}

export default Register;