import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import {  Form, FloatingLabel, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SignUp = ({ history, location }) => {
    const [t, i18n]= useTranslation();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    //10:37
    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error && "Please Login to access this resource" !== error) {
            alert.error(error);

        }

        if (isAuthenticated) {
            history.push(redirect);
        }
    }, [dispatch, error, alert, history, isAuthenticated, redirect]);




    return (


<Container className="mainContainer margin text-center">
<h1>{t('signUp')} </h1>

    <form

        encType="multipart/form-data"
        onSubmit={registerSubmit}
    >


        <FloatingLabel
            controlIda="floatingInput"
            label={t('Name')}
            className="mb-3"
        >
            <Form.Control type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
        </FloatingLabel>



        <FloatingLabel
            controlIda="floatingInput"
            label={t('Email')}
            className="mb-3"
        >
            <Form.Control type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
        </FloatingLabel>

        <FloatingLabel
            controlIda="floatingInput"
            label={t('Password')}
            className="mb-3"
        >
            <Form.Control type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
        </FloatingLabel>


        <div id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
             className="form-control"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
            />
        </div>

        <div className="atag">
        <span>{t('Do you have an account? ')}</span><Link to="/login">{t('login')}</Link>

        </div>

        <input type="submit" value={t('Register')} className="cbtn mt-2" />
    </form>
</Container>



    )
}

export default SignUp