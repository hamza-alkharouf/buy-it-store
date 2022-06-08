import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorsCategory,
  getAllCategories,
} from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./category.css"
import { useTranslation } from 'react-i18next';

function CategoryList() {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, categories } = useSelector((state) => state.allCategories);

  console.log(categories)
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorsCategory());
    }


    dispatch(getAllCategories());
  }, [dispatch, alert, error]);
  const [t, i18n] = useTranslation();

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="margin text-center">
        <h1 className="">{t('Categories')}</h1>

        <Container>


          {categories.map((category, index) => (
            <Link className="linkcategory  m-3" to={`/category/${category.name}/${category._id}`}>

              <Card className="bg-dark text-white">

                {category.images &&
                  category.images.map((item, i) => (
                    <Card.Img
                      className="CarouselImage linkCategoryImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}


                <Card.ImgOverlay className="imgOverlayCategory">
                  <Card.Title className="titleCategory">{category.name}</Card.Title>

                </Card.ImgOverlay>
              </Card>
            </Link>
          ))}
        </Container>

      </div>
    </Fragment>
  )
}

export default CategoryList