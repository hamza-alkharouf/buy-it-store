import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [t, i18n]= useTranslation();

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
       <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} {t('Reviews')})
        </span>
      </div> 
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
