import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProductsWomen } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "@material-ui/core";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';

const ProductsWomen = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.Womenproducts);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductsWomen());
  }, [dispatch, alert, error]);

  const [t, i18n]= useTranslation();

  return (
    <div>
      <h2 className="homeHeading">{t('Women')}</h2>
      <Link href={`/products-women`} className="more" underline="none">{t('More')} <ChevronRightIcon/></Link>

      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsWomen;
