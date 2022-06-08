import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorsCategory,
  updateCategory,
  getCategoryDetails,
} from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useTranslation } from 'react-i18next';
import {
  FloatingLabel, Container,Row,
  Col
} from 'react-bootstrap';
const UpdateCategory = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n] = useTranslation();

  const { error, category } = useSelector((state) => state.categoryDetails);

  const {
    loading,
     updateError,
    isUpdated,
  } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);



  const categoryId = match.params.id;

  useEffect(() => {
    if (category && category._id !== categoryId) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      setName(category.name);
      setOldImages(category.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrorsCategory());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrorsCategory());
    }

    if (isUpdated) {
      alert.success("Category Updated Successfully");
      history.push("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    categoryId,
    category,
    clearErrorsCategory,
    updateError,
  ]);

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);

    images.forEach((image) => {
      myForm.append("images", images);
    });
    dispatch(updateCategory(categoryId, myForm));
  };

  const updateCategoryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
          <h1>{t('Update Category')}</h1>

          <form
            encType="multipart/form-data"
            onSubmit={updateCategorySubmitHandler}
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
                name="avatar"
                accept="image/*"
                onChange={updateCategoryImagesChange}
              />
            </FloatingLabel>





              {oldImages &&
                oldImages.map((image, index) => (

                    <img key={index} src={image.url} className="imagesProduct"  alt="Old Category Preview" />

                ))}


              {imagesPreview.map((image, index) => (


                  <img key={index} src={image} className="imagesProduct"  alt="Category Preview" />

     
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

export default UpdateCategory;
