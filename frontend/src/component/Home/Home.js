import React, { Fragment, useEffect } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import ProductsWomen from "./ProductsWomen";
import ProductsMen from "./ProductsMen";
import ProductsNew from "./ProductsNew";


const Home = () => {


  return (
    <Fragment>
    <MetaData title="ECOMMERCE" />

    <div className="banner">

      {/* <a href="#containerNew">
        <button>
          Shopping Now
        </button>
      </a> */}
    </div>
    <ProductsNew />

    <ProductsWomen />

    <ProductsMen />

  </Fragment>
  );
};

export default Home;
