import React from 'react'
import Layout from './../../components/Header/Layout/index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getallproducts } from '../../actions/product.action';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import './style.scss'

import { IoIosSearch, IoIosStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
* @author
* @function Search
**/

const Search = (props) => {
  const dispatch = useDispatch()
  const products=useSelector(state =>state.product)
    useEffect(() => {
      dispatch(getallproducts())
    }, []);

    
  const prod=  products.allproducts.filter(t => t.name.includes(props.match.params.productname) )
    console.log("search",prod)
    if(!prod.length){
      return (
        <Layout>
        <div className="dont_fountt" >dont found <IoIosSearch/> </div>
            </Layout>
      )
    }
  return(
      <Layout>
        <Helmet>
        <title> search page</title>
             </Helmet> 
          <Container>
                  
                        <div className="product_wraperr">
                          <div className="products_list">
                          {
                              prod && prod.map(el =>
                                
                                      <div className="producti_container">
                                        <Link
                                        style={{
                                          display:"flex",
                                          textDecoration:"none"
                                        }}
                                      to={`/${el.slug}/${el._id}/p`}>
                                        <div className="product_img_cont">
                                          <img className="product_img" src={el.productPictures[0].img} alt=""/>
                                        </div>
                                        <div className="prod_descr">
                                        <div className="product_rating">
                                        {parseFloat(
                                          el.reviews.reduce((t, el) => {
                                            return t + el.review;
                                          }, 0) / el.reviews.length
                                        ).toFixed(2)}<IoIosStar />

                                        </div>
                                            <div className="namee">Product name</div>
                                        <div className="product_name">{el.name}</div>
                                          <div className="namee">Product Description</div>
                                        <div className="prod_descr"><span className="prod_descr_span">{el.description}</span></div>
                                        </div>
                                        </Link>
                                      </div>
                                      
                                )
                                }
                          </div>
                        </div>
                      
                  
          </Container>
      </Layout>
    
   )

 }

export default Search