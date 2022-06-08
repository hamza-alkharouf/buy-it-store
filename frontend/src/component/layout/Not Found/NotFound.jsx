import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const [t, i18n]= useTranslation();

  return (
    <div className="PageNotFound">
      <ErrorIcon />
      <Typography>{t('Page Not Found')}</Typography>
      <Link to="/">{t('Home')}</Link>
    </div>
  );
};

export default NotFound;
