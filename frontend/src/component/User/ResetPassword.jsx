import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import "./Form.css";
import {  FloatingLabel, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [t, i18n]= useTranslation();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    console.log(password)
    console.log(confirmPassword)

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />


          <Container className="mainContainer margin marginBottom text-center">
            <h1>{t('Reset Password')}</h1>
            <form
                onSubmit={resetPasswordSubmit}
                >

                <FloatingLabel
                controlId="floatingInput"
                label={t('New Password')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="password"
                  placeholder={t('New Password')}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </FloatingLabel>

           
              <FloatingLabel
                controlId="floatingInput"
                label={t('Confirm Password')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </FloatingLabel>


           

                <input
                  type="submit"
                  value={t('Change')}
                  className="cbtn" 
                />

              </form>


          </Container>

        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
