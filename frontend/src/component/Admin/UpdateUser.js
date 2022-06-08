import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import { FloatingLabel, Container, Form, Row, Col } from "react-bootstrap";
import Loader from "../layout/Loader/Loader";
import { useTranslation } from 'react-i18next';

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {

      dispatch(getUserDetails(userId));
    } else {

      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard margin">
      <SideBar />
      <Container className="mainContainer  text-center">
                  <h1>{t('Update User')}</h1>
          {loading ? (
            <Loader />
          ) : (
            
        

            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <FloatingLabel
                controlId="floatingInput"
                label={t('Name')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>

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

              <FloatingLabel
                controlId="floatingSelectGrid"
                label={t('Choose Roles')}
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">{t('Choose Role')}</option>
                  <option value="admin">{t('Admin')}</option>
                  <option value="user">{t('User')}</option>
                </Form.Select>
              </FloatingLabel>

              <input
              type="submit"
              value={t('Update')}
              className="cbtn mt-3"
            />

            </form>
          

          )}
            </Container>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
