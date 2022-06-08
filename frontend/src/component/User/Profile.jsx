import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";
import { Button, Container, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [t, i18n]= useTranslation();

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div  className="classContainer" >

          <Container>
            <h1>{t('My Profile')}</h1>

            <Stack direction="horizontal" gap={2} >
              <div >
                <Stack gap={2} className="p-5">
                  <div >
                    <img className="img" src={user.avatar.url} alt={user.name} width/>


                  </div>
                  <div >
                    <Container   id="">
                    <Button href="/profile/update"  className="justify-content-md-center">{t('Edit Profile')}</Button>

                    </Container>

                  </div>
                </Stack>
              </div>
              <div >
                <Stack gap={4} className="ms-auto">
                  <div >
                    <h4>{t('Full Name')}</h4>
                    <p>{user.name}</p>
                  </div>
                  <div >
                    <h4>{t('Email')}</h4>
                    <p>{user.email}</p>
                  </div>
                  <div >
                    <h4>{t('Joined On')}</h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>
                  <div >
                    <Button href="/orders" className="m-2">{t('My Orders')}</Button>
                    <Button href="/password/update" className="m-2">{t('Change Password')}</Button>

                  </div>
                </Stack>
              </div>
            </Stack>
          </Container>
</div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
