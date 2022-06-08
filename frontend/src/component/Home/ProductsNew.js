import React, {useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors ,getProductsNew} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "@material-ui/core";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';

const ProductsNew = () => {
    
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductsNew());
  }, [dispatch, alert, error]);
  const [t, i18n]= useTranslation();

  return (
    <div>
      <h2 className="homeHeading">{t('New')}</h2>
        <Link href={`/products-new`} className="more" underline="none">{t('More')} <ChevronRightIcon/></Link>
      <div className="container" id="containerNew">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};


export default ProductsNew;
