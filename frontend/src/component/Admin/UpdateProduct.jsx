import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { getAllCategories } from "../../actions/categoryAction";

import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import {
  FloatingLabel, Container, Form, Row,
  Col
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n] = useTranslation();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.allCategories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [forwhom, setForwhom] = useState("");

  const forwhoms = [
    "Women",
    "Men",
    "Women And Man",
  ]


  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      setForwhom(product.forwhom);

      
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
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    dispatch(getAllCategories());

  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("forwhom", forwhom);


    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
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



  console.log(product)
  return (

    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard margin">
        <SideBar />
        <Container className="mainContainer marginBottom text-center">
          <h1>{t('Update Product')}</h1>
          <form
            onSubmit={updateProductSubmitHandler}
            encType="multipart/form-data"
          >
            <Row className="g-2">
              <Col md>


                <FloatingLabel
                  controlId="floatingInput"
                  label={t('Product Name')}
                  className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FloatingLabel>

              </Col>
              <Col md>
                <FloatingLabel
                  controlId="floatingInput"
                  label={t('Price')}
                  className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel controlId="floatingTextarea2" className="mb-3" label={t('Product Description')}>
              <Form.Control
                as="textarea"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}

                style={{ height: '100px' }}
              />
            </FloatingLabel>



            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label={t('Choose Category')}>
                  <Form.Select aria-label="Floating label select example" onChange={(e) => setCategory(e.target.value)}>
                    <option key='0' value={category}>{t('Choose Category')}</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate._id}>
                        {cate.name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label={t('Choose forhow')}>
                  <Form.Select aria-label="Floating label select example" onChange={(e) => setForwhom(e.target.value)}>
                    <option key='0' value={forwhom}>{t('Choose forhow')}</option>
                    {forwhoms.map((cate) => (
                      <option key={cate} value={cate}>
                        {t(cate)}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel
              controlId="floatingInput"
              label={t('Stock')}
              className="mb-3 mt-3">
              <input
                className="form-control"
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
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
                multiple
                onChange={updateProductImagesChange}
              />
            </FloatingLabel>
            <Row>

              {oldImages && oldImages.map((image, index) => (
                <Col xs={6} md={4} className="ColImagesProduct">

                  <img key={index} src={image.url} className="imagesProduct" alt="Old Product Preview" />

                </Col>
              ))}
            </Row>

            <Row>
              {imagesPreview.map((image, index) => (
                <Col xs={6} md={4} className="ColImagesProduct">

                  <img className="imagesProduct" key={index} src={image} alt="Product Preview" />

                </Col>
              ))}


            </Row>


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

export default UpdateProduct;
