import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { Row,  Col } from "react-bootstrap"
import { getAllCategories } from "../../actions/categoryAction";
import { useTranslation } from 'react-i18next';

const forwhoms = [
  "All",
  "Women",
  "Men",
  "Women And Man"
]

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState("");
  const [forwhom, setforwhom] = useState("");
  const [ratings, setRatings] = useState(0);


  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.allCategories);


  const setCategoryy = (e) => {
    setCategory(e);

    if (e === "All") {
      setRatings(0);
      setPrice([0, 2500]);
    }
    updatePage(1)
  };

  const setforwhoms = (e) => {
    setforwhom(e);

    if (e == "All") {
      setRatings(0);
      setPrice([0, 2500]);
    }
    updatePage(1)
  };




  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const updatePage = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    updatePage(1)
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
    dispatch(getProduct(keyword, currentPage, price, category, forwhom, ratings));
  }, [dispatch, keyword, currentPage, price, category, forwhom, ratings, alert, error]);

  let count = filteredProductsCount;
  const [t, i18n]= useTranslation();
  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">{t('Products')}</h2>

          <div className="productcontainer">

            <Row>
              <Col md={3} >

                <Typography>{t('Price')}</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  step={10}
                  min={0}
                  max={500}
                />
                <Typography>{t('For')}</Typography>
                <ul className="categoryBox">
                  {forwhoms.map((forwhom) => (
                    <li
                      className="category-link"
                      key={forwhom}
                      onClick={() => setforwhoms(forwhom)}
                    >
                      {t(forwhom)}
                    </li>
                  ))}
                </ul>

                <Typography>{t('Categories')}</Typography>
                <ul className="categoryBox">
                  <li
                    className="category-link"
                    key='-1'
                    onClick={() => setCategoryy('All')}
                  >
                    All
                  </li>
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategoryy(category._id)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <Typography component="legend">{t('Ratings')}</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </Col>


              <Col md={9}>
                <Row>
                  {products &&
                    products.map((product) => (
                      <Col>
                        <ProductCard key={product._id} product={product} />
                      </Col>
                    ))}
                </Row>

              </Col>

            </Row>

          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;