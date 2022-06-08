import React from "react";
import "./Contact.css";
import { useTranslation } from 'react-i18next';
import { FloatingLabel, Container, Form } from 'react-bootstrap';

const Contact = () => {
  const [t, i18n] = useTranslation();

  return (
    <Container className="mainContainer margin text-center">
      <h1>{t('Contact')} </h1>

      <form >

        <FloatingLabel
          controlId="floatingInput"
          label={t('Full Name')}
          className="mb-3"
        >
          <input
            className="form-control"
            type="text"
            placeholder="Full Name"
            required
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
          />

        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" className="mb-3" label={t('Description :')}>
          <Form.Control
            as="textarea"
            placeholder="Description"

            style={{ height: '100px' }}
          />
        </FloatingLabel>

        <input type="submit" value={t('Contact')} className="cbtn" />
      </form>
    </Container>
  );
};

export default Contact;
