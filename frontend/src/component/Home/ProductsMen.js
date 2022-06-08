import React, {  useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProductsMen, } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "@material-ui/core";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';


const ProductsMen = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.Menproducts);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductsMen());
  }, [dispatch, alert, error]);

  const [t, i18n]= useTranslation();

  return (
    <div>
      <h2 className="homeHeading">{t('Men')}</h2>
      <Link href={`/products-men`} className="more" underline="none">{t('More')} <ChevronRightIcon/></Link>

      <div className="container" id="container">

        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsMen;
