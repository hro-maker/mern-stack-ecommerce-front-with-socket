import React from "react";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";
import "./style.css";
import getparams from './../../../utils/getparams';
import Layout from './../../../components/Header/Layout/index';

/**
 * @author
 * @function ProductListPage
 **/
const ProductListPage = (props) => {
  const renderProduct = () => {

    const params = getparams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }

    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
