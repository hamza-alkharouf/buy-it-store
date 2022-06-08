import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { Row, Form, FloatingLabel, Container, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };
  const [t, i18n]= useTranslation();

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

    <div className=" margin">
    <CheckoutSteps activeStep={0} />


      <Container className="mainContainer  text-center">

        <form
          encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >


          <Row className="g-2">
            <Col md>
              <FloatingLabel
                controlId="floatingInput"
                label={t('Address')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInput"
                label={t('City')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FloatingLabel>
            </Col>
          </Row>



          <Row className="g-2">
            <Col md>
              <FloatingLabel
                controlId="floatingInput"
                label={t('Pin Code')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />

              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingInput"
                label={t('Phone Number')}
                className="mb-3"
              >
                <input
                  className="form-control"
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel controlId="floatingSelectGrid" label={t('Choose Country')}>
            <Form.Select aria-label="Floating label select example" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>

          {country && (
            <FloatingLabel className="mt-3" controlId="floatingSelectGrid" label={t('Choose State')}>
              <Form.Select aria-label="Floating label select example" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
          )}


          <input
            type="submit"
            value={t('Continue')}
            className="cbtn mt-3"
            disabled={state ? false : true}
          />

        </form>
      </Container>

      </div>
    </Fragment>
  );
};

export default Shipping;
