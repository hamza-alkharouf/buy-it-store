import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useTranslation } from 'react-i18next';

const Search = ({ history }) => {

    
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  const [t, i18n]= useTranslation();

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder={t('Search a Product ...')}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value={t('Search')} />
      </form>
    </Fragment>
  );
};

export default Search;