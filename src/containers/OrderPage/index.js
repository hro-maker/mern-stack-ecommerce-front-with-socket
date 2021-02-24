import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { BiDollar } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import {getOrders} from '../../actions/user.action'
import "./style.scss";
import Card from './../../components/Header/UI/Card';
import Layout from './../../components/Header/Layout/index';
import { Breed } from "../../components/Header/MaterialUi";
import { Helmet } from 'react-helmet';

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);
    if(!user.orders.length){
          return (
            <Layout>
                <div className="error">
                you don't have any order
                </div>
            </Layout>
          )
    }
    
  return (
    <Layout>
       <Helmet>
        <title> All orders </title>
             </Helmet> 
      <div className="all_orders_wraper" >
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/profile" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders && user.orders.map((order) => {
          console.log(order.items)
          return  order.items.map((item) => (
            <div className="cart_container">
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
               
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={item.productId.productPictures[0].img}
                    alt=""
                  />
                </div>
                <div className="orderRow order-fond">
                  <div className="orderName order-fond">{item.productId.name}</div>
                  <div className="orderPrice order-fond">
                    <BiDollar />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
               
                
              </Link>
            </Card>
            </div>
          )) 
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
