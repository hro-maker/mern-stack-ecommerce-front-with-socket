import React from "react";
import "./style.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "./../../../actions/category.action";
import { Link } from 'react-router-dom';
/**
 * @author
 * @function Menuheader
 **/

const Menuheader = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
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
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default Menuheader;
