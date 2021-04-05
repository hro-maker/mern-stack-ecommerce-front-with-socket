import React, {useEffect } from "react";
import Layout from "../../../components/Header/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetailById,
  addcoment as _addcoment,
  adreting
} from "./../../../actions/product.action";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import "./style.scss";
import { MaterialButton } from "../../../components/Header/MaterialUi";
import { addToCart } from "./../../../actions/cart.action";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Loaderr from "../../../components/Header/UI/loaderr";
import ComentsPagination from "../../../components/pagination";
import PaginateComentt from './../../../components/paginateComent/index';

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [coment, setcoment] = useState("");
  const auth = useSelector((state) => state.auth);
  const [slideIndex, setslideIndex] = useState(0);
  
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true)
    const { productId } = props.match.params;
    
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailById(payload)).then(()=>{
      setloading(false)
    })
    
  }, []);
 
  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  const addcoment = (event) => {
    event.preventDefault();
    
    if (!auth.authenticate) {
      notify("please sign in")
      return;
    }
    if(!coment.length){
      notify("please write something")
      return 
    }
    setloading(true);
    const { productId } = props.match.params;
    const payload = {
      _id: productId,
      coment,
      userName: auth.user.fullName,
      userPicture: auth.user.profilePicture,
    };
    dispatch(_addcoment(payload)).then(() => {
      const { productId } = props.match.params;
     
      const payload = {
        params: {
          productId,
        },
      };
      dispatch(getProductDetailById(payload));
      setloading(false);
    });
    setcoment("");
  };

 
  const ratingChanged = (newRating) => {
    if (!auth.authenticate) {
      notify("please sign in")
      return;
    }
    const { productId } = props.match.params;
    const payload = {
      _id: productId,
      retinc:newRating
    };
    dispatch(adreting(payload)).then(() => {
      const { productId } = props.match.params;
      const payload = {
        params: {
          productId,
        },
      };
      dispatch(getProductDetailById(payload));
      setloading(false);
    });
  };
  const notify = (el) => toast.info(`${el}`);
let sum=0,rating=0
  if(product.productDetails.reviews.length){
     sum=product.productDetails.reviews.reduce((t,el)=>{
          return  t=t+el.review
    },0)
  }else{
    sum=0;
    rating=0
  }
  rating= sum/product.productDetails.reviews.length
  
 const floorrading= parseFloat(rating).toFixed(2)
 if (loading ) {
  return (
    <Loaderr/>
  );
}

const getproduct=()=>{
  const { productId } = props.match.params;
      
      const payload = {
        params: {
          productId,
        },
      };
      dispatch(getProductDetailById(payload));
}

  return (
    <Layout>
      <ToastContainer />
      <Helmet>
        <title> {product.productDetails.name} </title>
             </Helmet> 
      <div className="productDescriptionContainer for_back_descr">
       <div className="product_subcontainer_for_bc">
       <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div className="thumbnail" onClick={() => setslideIndex(index)}>
                <img src={thumb.img} alt={thumb.img} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <Zoom>
                <img
                  className="zoomi_image"
                  src={
                    product.productDetails.productPictures[slideIndex].img
                  }
                  alt={`${product.productDetails.productPictures[slideIndex].img}`}
                  width="100%"
                  height="100%"
                />
              </Zoom>
            </div>

            
            <div className="flexRow">
              <div className="mbm">
              <MaterialButton
                
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                marginRight="40px"
                style={{
                  marginRight: "40px",
                  width:"400px"
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              />
              </div>
              <div className="mbm">
              
              </div>
            </div>
          </div>
        </div>
        <div>
         
          <div className="breed">
            <ul>
              <li>
                <Link to="/">Home</Link>
                <IoIosArrowForward />
              </li>
             
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
        
          <div className="productDetails">
            <p style={{ color: "white" }} className="productTitle">
              {product.productDetails.name}
            </p>
            <div>
              <span className="ratingCount">
                {floorrading} <IoIosStar />
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
              </span>
              <span className="ratingNumbersReviews">
                 {product.productDetails.reviews.length} Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiDollar />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiDollar />
                {product.productDetails.price}
              </span>
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p className="flex_colum" style={{ display: "flex" }}>
                <span
                className="prod_describtion"
                  style={{
                    width: "100px",
                    fontSize: "18px",
                    color: "black",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description:
                </span>
                <span
                className="prod_descr"
                  style={{
                    fontSize: "20px",
                    color:"black"
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
              <form className="comments_form" onSubmit={addcoment}>
                <input
                  value={coment}
                  onChange={(e) => setcoment(e.target.value)}
                  className="comment_input"
                  placeholder="comment"
                  type="text"
                />
                <button className="coment_btn" type="submit">
                  Add
                </button>
              </form>
              <h4 style={{ textAlign: "center",fontSize:30 }}>Coments</h4>
              <div
                className="coments_wraper"
                style={{
                  fontSize: "12px",
                  marginTop: "15px",
                }}
              >
                {product.productDetails.coments && <PaginateComentt getproduct={getproduct} productId={props.match.params.productId} coments={product.productDetails.coments}/>}
              </div>
            </div>
          </div>
        </div>
       </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
