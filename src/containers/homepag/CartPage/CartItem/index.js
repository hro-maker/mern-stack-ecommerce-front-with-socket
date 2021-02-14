import React from 'react'

import { useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import './style.scss'
/**
* @author
* @function CartItem
**/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cart_Container_item">
      <div className="fl">
        <div className="cartProImgContainer">
          <img src={img} alt={""} />
        </div>
        <div className="detail">
          <div>
            <p>{name}</p>
            <p>Rs. {price} <BiDollar style={{color:'yellow'}}/> </p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        className="quantityControl_top"
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
      
        <div className="quantityControl">
          <button  onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button  onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtnn for_n">save for later</button>
        <button
          className="cartActionBtnn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;