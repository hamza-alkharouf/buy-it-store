import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const CartItemCard = ({ item, deleteCartItems }) => {
  const [t, i18n]= useTranslation();

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`${t('Price')}: $${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>{t('Remove')}</p>
      </div>
    </div>
  );
};

export default CartItemCard;
