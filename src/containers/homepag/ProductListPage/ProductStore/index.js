import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductsbyslug } from "../../../../actions/product.action";
import { Link } from "react-router-dom";
import Price from "./../../../../components/Header/UI/Price";
import Rating from "./../../../../components/Header/UI/Rating";
import { MaterialButton } from "../../../../components/Header/MaterialUi";
import Card from "./../../../../components/Header/UI/Card";

/**
 * @author
 * @function ProductStore
 **/
import "./style.scss";
import { IoIosStar } from 'react-icons/io';
const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getproductsbyslug(match.params.slug));
  }, []);

  return (
    <>
      {Object.keys(product.productsByPrice).length > 0 &&
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            product.productsByPrice[key].length > 0 && (
              <Card
                heaterLeft={`${props.match.params.slug.split("-")[0]}  under ${
                  priceRange[key]
                } $`}
               
                style={{
                  width: "calc(100% - 40px)",
                  margin: "20px",
                }}
              >
                <div className="product_store" style={{ display: "flex" }}>
                  {product.productsByPrice[key].length > 0 ? (
                    product.productsByPrice[key].map((product) => (
                      <Link
                        to={`/${product.slug}/${product._id}/p`}
                        style={{
                          display: "block",
                          textDecoration: "none",
                          color: "#000",
                        }}
                        className="productContainer "
                      >
                        <div className="productImgContainer">
                          <img
                            src={
                              product.productPictures[0].img
                            }
                            alt=""
                          />
                        </div>
                        <div className="productInfo">
                          <div
                            className="productInfo"
                            style={{ margin: "10px 0" }}
                          >
                            {product.name}
                          </div>
                          <div>
                            &nbsp;&nbsp;
                              <div className="rading_store">
                              {parseFloat(
                                product.reviews.reduce((t, el) => {
                                  return t + el.review;
                                }, 0) / product.reviews.length
                              ).toFixed(2)}<IoIosStar />
                              </div>
                          </div>
                          <Price value={product.price} />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div>wi dont have</div>
                  )}
                </div>
              </Card>
            )
          );
        })}
    </>
  );
};

export default ProductStore;
