import React, { Fragment, useState, useEffect } from "react";
import "./Form.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {  FloatingLabel, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));

    console.log(email)
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />


          <Container className="mainContainer margin marginBottom text-center">
            <h1> {t('Forgot Password')}</h1>
            <form
                onSubmit={forgotPasswordSubmit}
              >
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />

              </FloatingLabel>

           

                <input
                  type="submit"
                  value={t('Send')}
                  className="cbtn" 
                />

              </form>


          </Container>


        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
