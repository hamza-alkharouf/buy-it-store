import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const OrderSuccess = () => {
  const [t, i18n]= useTranslation();

  return (
    <div className="orderSuccess margin">
      <CheckCircleIcon />

      <Typography>{t('Your Order has been Placed successfully')}</Typography>
      <Link to="/orders" >{t('View Orders')}</Link>
    </div>
  );
};

export default OrderSuccess;
