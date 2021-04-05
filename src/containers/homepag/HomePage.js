import React, { useState } from "react";
import Layout from "../../components/Header/Layout";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getallproducts } from "../../actions/product.action";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { BiDollar } from 'react-icons/bi';
import { IoIosStar } from 'react-icons/io';
import Loaderr from "../../components/Header/UI/loaderr";
/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  const dispatch = useDispatch();

  const [products, setproductes] = useState([]);
  const product = useSelector((state) => state.product);
  const productes = product.allproducts;
  const category= useSelector(state => state.category)

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
      <Helmet>
        <title>Shlyans cart</title>
             </Helmet> 
        <div className="wraper_home">
          <div className="home_subwraper">
            <div className="main_page_container">
            
              {productes.length > 0 && productes.length > 5
                ? randomprod(productes).map((el, i) => (
                  <>
                        <div key={i} className="main_page_item_m" style={{ color: "white" }}>
                         <>
                         {
                          el.productPictures.length > 0 &&  <div className="home_page_images_wraper">
                          <img className="mainpage_item_image_m" src={el.productPictures[0].img} alt=""/>
                          <img className="mainpage_item_image_secnt_m" src={el.productPictures[el.productPictures.length - 1].img} alt=""/>
                        </div>
                        }
                         </>
                          
                      <Link className="mainpage_item_link_m" to={`/${el.slug}/${el._id}/p`} >

                        
                        <div className="product_informat_m">
                              <div className="product_nameeee_m">{el && el.name}</div>
                              <div style={{marginTop:"7%",fontSize:"25px"}} className="product_quantity_m"> {el && el.price} <BiDollar/> </div>
                              <div style={{marginTop:"7%",fontSize:"25px",color:"yellow"}} className="rading_store">
                              {el &&  Number.isNaN(Number(parseFloat(
                                el.reviews.reduce((t, al) => {
                                  return t + al.review;
                                }, 0) / el.reviews.length
                              ).toFixed(2))) ? 0 : parseFloat(
                                el.reviews.reduce((t, al) => {
                                  return t + al.review;
                                }, 0) / el.reviews.length
                              ).toFixed(2)  }<IoIosStar />
                              </div>
                        </div>
                       
                      
                      </Link>
                    </div>

                                  </>
                  ))
                : productes.map((el,i) => (
                  <div key={i} className="main_page_item_m" style={{ color: "white" }}>
                         <>
                         {
                          el.productPictures.length > 0 &&  <div className="home_page_images_wraper">
                          <img className="mainpage_item_image_m" src={el.productPictures[0].img} alt=""/>
                          <img className="mainpage_item_image_secnt_m" src={el.productPictures[el.productPictures.length - 1].img} alt=""/>
                        </div>
                        }
                         </>
                          
                      <Link className="mainpage_item_link_m" to={`/${el.slug}/${el._id}/p`} >

                        
                        <div className="product_informat_m">
                              <div className="product_nameeee_m">{el && el.name}</div>
                              <div style={{marginTop:"7%",fontSize:"25px"}} className="product_quantity_m"> {el && el.price} <BiDollar/> </div>
                              <div style={{marginTop:"7%",fontSize:"25px",color:"yellow"}} className="rading_store">
                              {el &&  parseFloat(
                                el.reviews.reduce((t, al) => {
                                  return t + al.review;
                                }, 0) / el.reviews.length
                              ).toFixed(2)}<IoIosStar />
                              </div>
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
