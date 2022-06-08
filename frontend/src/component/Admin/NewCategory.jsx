import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createCategory, clearErrorsCategory } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import SideBar from "./Sidebar";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import {
  FloatingLabel, Container
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const NewCategory = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorsCategory());
    }

    if (success) {
      alert.success("Category Created Successfully");
      history.push("/admin/categories");
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createCategory(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard margin">
        <SideBar />

        <Container className="mainContainer  text-center">
          <h1>{t('Create Category')}</h1>

          <form
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
          >
            <FloatingLabel
              controlId="floatingInput"
              label={t('Category Name')}
              className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Category Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label={t('Images')}
              className="mb-3">
              <input
                className="form-control"
                type="file"
                required
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
              />
            </FloatingLabel>

            {imagesPreview.map((image, index) => (

              <img className="imagesProduct" key={index} src={image} alt="Category Preview" />

            ))}




            <input
              type="submit"
              value={t('Send')}
              className="cbtn"
            />
          </form>
        </Container>

      </div>
    </Fragment>
  );
};

export default NewCategory;
