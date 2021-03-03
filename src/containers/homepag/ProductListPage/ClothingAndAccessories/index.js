import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiDollar } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.scss";
import { getproductsbyslug } from './../../../../actions/product.action';
import Card from './../../../../components/Header/UI/Card';
import { Helmet } from 'react-helmet';


/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getproductsbyslug(match.params.slug));
  }, []);
  // {props.match.params.slug.split("-")[0]}
  return (
    <div style={{ padding: "10px" }}>
      <Helmet>
        <title> {props.match.params.slug.split("-")[0]} list </title>
             </Helmet> 
      <Card
      className="card_header_clout"
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        <div className="clout_wraper">
        {product.products.length > 0 ? product.products.map((product) => (
          <div className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={product.productPictures[0].img} alt=""/>
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice">
                <BiDollar />
                {product.price}
              </div>
            </div>
          </div>
        )) : <div className="product_dont_found_cat">products dont found</div>}
        </div>
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
