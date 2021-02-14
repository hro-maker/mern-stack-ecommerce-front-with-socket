import React, { useState } from "react";
import Layout from "../../components/Header/Layout";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getallproducts } from "../../actions/product.action";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";
/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  const dispatch = useDispatch();

  const [products, setproductes] = useState([]);
  const product = useSelector((state) => state.product);
  const productes = product.allproducts;

  const randomprod = (productees) => {
    const prodArr = [];
    for (let i = 0; i < 5; i++) {
      const rand = productees[Math.floor(Math.random() * productees.length)];
      prodArr.push(rand);
    }
    return prodArr;
  };

  useEffect(() => {
    dispatch(getallproducts());
  }, []);

  
  return (
    <div>
      <Layout>
        <div className="wraper_home">
          <div className="home_subwraper">
            <div className="main_page_container">
              {/* stayed */}
              {productes.length > 0 && productes.length > 5
                ? randomprod(productes).map((el, i) => (
                    <div key={i} className="main_page_item" style={{ color: "white" }}>
                      <Link className="mainpage_item_link" to={`/${el.slug}/${el._id}/p`} >

                        {
                          el.productPictures.length > 0 &&  <div >
                          <img className="mainpage_item_image" src={el.productPictures[0].img} alt=""/>
                        </div>
                        }
                        <div className="product_informat">
                              <div className="product_nameeee">{el && el.name}</div>
                              <div className="product_quantity"> quantity <FaArrowRight/> {el && el.quantity}</div>
                        </div>
                       
                      
                      </Link>
                    </div>
                  ))
                : productes.map((el,i) => (
                  <div key={i} className="main_page_item" style={{ color: "white" }}>
                  <Link className="mainpage_item_link" to={`/${el.slug}/${el._id}/p`} >

                    {
                      el.productPictures.length > 0 &&  <div >
                      <img className="mainpage_item_image" src={el.productPictures[0].img} alt=""/>
                    </div>
                    }
                    <div className="product_informat">
                          <div className="product_nameeee">{el && el.name}</div>
                          <div className="product_quantity"> quantity <FaArrowRight/> {el && el.quantity}</div>
                    </div>
                   
                  
                  </Link>
                </div>
                  ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
