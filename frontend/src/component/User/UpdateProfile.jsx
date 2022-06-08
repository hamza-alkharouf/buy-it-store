import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

import { Button,Form, FloatingLabel,Container} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);





  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };




  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }


    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });

    }
  }, [dispatch, error, alert, history, user, isUpdated]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment >
          <MetaData title="Update Profile" />
          <div className="updateProfile">
            <div className="classContainer">
            <Container>
            <div   className="shadow p-3 mb-5 bg-white rounded">
              <h2 className="text-center">{t('Update Profile')}</h2>

              <form
                className="p-3 mb-5 "
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <FloatingLabel
                  controlIda="floatingInput"
                  label={t('Name')}
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>


                <FloatingLabel
                  controlId="floatingInput"
                  label={t('Email')}
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>


             
                <Form.Group controlId="formFile" className="mb-3">
                <Form.Control   size="sm" type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange} />
              </Form.Group>

              <Container   className="m-0">
              <Button type="submit" className="justify-content-md-center">{t('Update')}</Button>

                    </Container>
              </form>
            </div>
          </Container>

            </div>

          </div>

        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
