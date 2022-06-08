import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Form.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../actions/userAction";
import { useAlert } from "react-alert";
import {  FloatingLabel, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  console.log(error)


  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
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
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>



          <Container className="mainContainer margin text-center">
            <h1>{t('Login')} </h1>
            <form onSubmit={loginSubmit}>


              <FloatingLabel
                controlId="floatingInput"
                label={t('Email')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label={t('Password')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

              </FloatingLabel>



              <div className="atag">
                <Link to="/password/forgot">{t('Forgot Password ?')}</Link>
                <span>{t('Don\'t have an account? ')}</span><Link to="/signup" color="green">{t('sign up')}</Link>
              </div>


              <input type="submit" value={t('Login')} className="cbtn" />
            </form>


          </Container>










        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
