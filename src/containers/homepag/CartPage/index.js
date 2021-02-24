import React from "react";
import Layout from "./../../../components/Header/Layout/index";
import Card from "./../../../components/Header/UI/Card";
import "./style.scss";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../../actions/cart.action";
import { MaterialButton } from "../../../components/Header/MaterialUi";
import PriceDetails from './../../../components/Header/PriceDetails/index';
import { Helmet } from 'react-helmet';
/**
 * @author       Hroooo
 * @function CardPage
 **/
const CartPage = (props) => {
  
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
 
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
            onRemoveCartItem={onRemoveCartItem}
          />
        ))}
      </>
    );
  }
  const ordered =()=>{
    props.history.push(`/checkout`)
  }
  return (
    <Layout>
      <Helmet>
        <title>My cart</title>
             </Helmet> 
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{  overflow: "hidden" }}
        >
          
          { Object.keys(cartItems).length >0 ? Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          )): <div className="empty_cart">yor cart is empty</div>}

          <div
            className="cart_footer"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
           {Object.keys(cartItems).length > 0 &&
                      <div style={{ width: "250px" }}>
                      <MaterialButton
                        title="PLACE ORDER"
                        onClick={ordered}
                      />
                    </div>
           } 
          </div>
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CartPage;