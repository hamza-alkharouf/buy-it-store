import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";
import { useTranslation } from 'react-i18next';

const CheckoutSteps = ({ activeStep }) => {
  const [t, i18n]= useTranslation();

  console.log(i18n.language)
  const steps = [
    {
      label: <Typography>{t('Shipping Details')}</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>{t('Confirm Order')}</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>{t('Payment')}</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (


          
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "green" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
