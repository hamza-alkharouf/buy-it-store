import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import "./Form.css";
import { useTranslation } from 'react-i18next';

import {  FloatingLabel, Container } from 'react-bootstrap';

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      history.push("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />


          <Container className="mainContainer margin text-center">
            <h1>{t('Update Password')}</h1>
            <form
                onSubmit={updatePasswordSubmit}
                >

                <FloatingLabel
                controlId="floatingInput"
                label={t('Old Password')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  />
              </FloatingLabel>

           

              <FloatingLabel
                controlId="floatingInput"
                label={t('New Password')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;
