import React, { Fragment, useEffect, useState } from "react";
import Loader from '../layout/Loader/Loader';
import MetaData from "../layout/MetaData";
import "./ProductListNew.css";
import { Link } from "react-router-dom";
import { Typography, Breadcrumbs, Container } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors ,getProductsNew} from "../../actions/productAction";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import { useTranslation } from 'react-i18next';

const ProductListNew = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const alert = useAlert();

  const {
  products,
  loading,
  error,
  productsCount,
  resultPerPage,
  filteredProductsCount,
} = useSelector((state) => state.newAddProducts);


const setCurrentPageNo = (e) => {
  setCurrentPage(e);
};



useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  dispatch(getProductsNew(currentPage));
}, [dispatch, currentPage, alert, error]);

let count = filteredProductsCount;
const [t, i18n]= useTranslation();

  return (
    <Fragment>
      <MetaData title="New Products" />

      <div className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit"  href={`/`}>
          {t('Home')}
          </Link>

          <Typography color="text.primary">{t('New Products')}</Typography>
        </Breadcrumbs>
      </div>

      <div className="productcontainer">
        
      
      <h2 className="homeHeading">{t('New')}</h2>
      <div className="container" id="containerNew">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
   



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
  );
}

export default ProductListNew