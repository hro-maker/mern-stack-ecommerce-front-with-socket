import React from "react";
import { MdClear } from "react-icons/md";
import { useState } from "react";
import {
  getProductDetailById,
  likeComment,
} from "../../actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loaderr from "../Header/UI/loaderr";
import { removecomentbyid } from "./../../actions/product.action";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import panda from "./p.jpg";
import ReactPaginate from "react-paginate";
import _ from 'lodash';
 /**
 * @author
 * @function PaginateComentt
 **/

const PaginateComentt = ({ coments, productId, getproduct }) => {
  const [loadingcom, setloadingcom] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [loadingf, setloadingf] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notify = (el) => toast.info(`${el}`);
  const likeComent = (comentId) => {
    if (auth.authenticate) {
      setloadingcom(true);

      const el = { comentId, _id: productId };

      dispatch(likeComment(el)).then(() => {
        const payload = {
          params: {
            productId,
          },
        };
        dispatch(getProductDetailById(payload));

        setloadingcom(false);
      });
    } else {
      notify("please sign in");
    }
  };

  const removeComent = (comentId) => {
    const idx = coments.findIndex((ar) => ar._id == comentId);
    console.log(idx);
    setloadingcom(true);
    const el = { comentId, _id: productId };
    dispatch(removecomentbyid(el)).then(() => {
      getproduct();

      setloadingcom(false);
    });
  };
  const yearformatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}y - ${d.getMonth() + 1}m - ${d.getDate()}d`;
    }
    return "";
  };
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()} : ${
        d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
      } :${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}s`;
    }
    return "";
  };

  if (loadingcom || loadingf) {
    return <Loaderr />;
  }
  const handlePageClick = (el) => {
    setcurrentPage(el.selected)
  };
  if(coments.length === 0){
      return <div className="dont_fount">for this product coments dont found</div>
  }
const displaydata=_.chunk(coments, 5)[currentPage]
    if(coments.length > 0 && coments.length < 5){
        return (
            <>
            <ToastContainer />
            {coments.length > 0 &&
              coments.map((element) => (
                <div
                  className="coment_wraper"
                  style={{
                    fontSize: "12px",
                    marginTop: "15px",
                    marginLeft: "50px",
                  }}
                >
                  {element.userPicture ? (
                    <div>
                      <img
                        className="comentpicter_wraper"
                        src={element.userPicture}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div>
                      <img className="comentpicter_wraper" src={panda} alt="" />
                    </div>
                  )}
                  <div>
                    {element.userName && (
                      <div className="coment_descr">
                        <Link
                          className="menuheater_linkkk"
                          to={`/profiles/user/${element.userId}/u`}
                        >
                          {element.userName}
                        </Link>
      
                        <span>date {yearformatDate(element.date)}</span>
                      </div>
                    )}
                    {
                      <div className="coment_descr">
                        {element.coment} <span>time {formatDate(element.date)}</span>
                        {auth.authenticate && auth.user._id === element.userId && (
                          <div onClick={() => removeComent(element._id)}>
                            <MdClear className="delete_coment" />
                          </div>
                        )}
                        <div onClick={() => likeComent(element._id)}>
                          <FaHeart className="like_coment" />
                          <div className="likes_count">{element.likes.length}</div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              ))}
          </>
       
        )
    }


  return (
    <>
      <ToastContainer />
      {displaydata && displaydata.length > 0 &&
        displaydata.map((element) => (
          <div
            className="coment_wraper"
            style={{
              fontSize: "12px",
              marginTop: "15px",
              marginLeft: "50px",
            }}
          >
            {element.userPicture ? (
              <div>
                <img
                  className="comentpicter_wraper"
                  src={element.userPicture}
                  alt=""
                />
              </div>
            ) : (
              <div>
                <img className="comentpicter_wraper" src={panda} alt="" />
              </div>
            )}
            <div>
              {element.userName && (
                <div className="coment_descr">
                  <Link
                    className="menuheater_linkkk"
                    to={`/profiles/user/${element.userId}/u`}
                  >
                    {element.userName}
                  </Link>

                  <span>date {yearformatDate(element.date)}</span>
                </div>
              )}
              {
                <div className="coment_descr">
                  {element.coment} <span>time {formatDate(element.date)}</span>
                  {auth.authenticate && auth.user._id === element.userId && (
                    <div onClick={() => removeComent(element._id)}>
                      <MdClear className="delete_coment" />
                    </div>
                  )}
                  <div onClick={() => likeComent(element._id)}>
                    <FaHeart className="like_coment" />
                    <div className="likes_count">{element.likes.length}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        ))}
     
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(coments.length/5)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"activeclasss"}
          pageClassName='item_pa'
          previousClassName='item_pa'
          nextClassName='item_pa'
        />
      
    </>
  );
};

export default PaginateComentt;
