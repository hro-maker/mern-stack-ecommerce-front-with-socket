import React from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "./../../../actions/category.action";
import { Link } from 'react-router-dom';
import { BiShow,BiHide } from "react-icons/bi";
import ReactTooltip from 'react-tooltip';
import {followCursor} from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import  Tippy  from '@tippyjs/react';

import "./style.scss";
/**
 * @author
 * @function Menuheader
 **/

const Menuheader = (props) => {
  const category = useSelector((state) => state.category);
  const [fortool, setfortool] = useState(false);
  const [fortools, setfortools] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
 const [forcateg, setforcateg] = useState(true);
  const renderCategories = (categoryes) => {
    let categories = [];
    for (let category of categoryes) {
      categories.push(
        <li key={category.name}>
          {category.parentId ? (
            <Link className="menuheater_link"
              to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </Link>
          ) : (
            <span> {category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categories;
  };
  return (
    <div className="menuHeader">
      <ReactTooltip />
      {forcateg && <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>}
      {
        !forcateg ? 
        
        <Tippy followCursor={true} plugins={[followCursor]} visible={fortool}  content={<span style={{color:"white",zIndex:"1111111"}}>Show Category</span>}>
        <BiShow id="test" onMouseEnter={()=>{
          setfortool(true)
        }} onMouseLeave={()=>{
          setfortool(false)
        }} getContent={() => { return null }} onClick={()=>{
          setforcateg(true)
        }} className="categor_show_hide"/>
          </Tippy>
     
        : 
        <Tippy visible={fortools} followCursor={true} plugins={[followCursor]} content={<span  className="for_tooltipsss" style={{color:"white",zIndex:"1111111"}}>Hite Categories</span>}>
        <BiHide
        onMouseEnter={()=>{
          setfortools(true)
        }} onMouseLeave={()=>{
          setfortools(false)
        }}
        onClick={()=>{
          setforcateg(false)
        }} className="categor_show_hide"/>
        </Tippy>
      }
    </div>
  );
};

export default Menuheader;
