import React from 'react'
import { MdClear } from 'react-icons/md';
import { useState } from 'react';
import { getProductDetailById, likeComment } from '../../actions/product.action';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loaderr from '../Header/UI/loaderr';
import { removecomentbyid } from './../../actions/product.action';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import panda from "./p.jpg";
import { useEffect } from 'react';
import './pagin.scss';
/**
* @author
* @function Pagination
**/

const ComentsPagination = ({coments,productId,getproduct}) => {
    const [loadingcom, setloadingcom] = useState(false);
    const [loadingf, setloadingf] = useState(false);
    const dispatch= useDispatch();
    const auth = useSelector((state) => state.auth);
    const notify = (el) => toast.info(`${el}`);
    const [dispComents,setDispCom]=useState([])
    const [forpag,setforpag]=useState(null)
    const paginationn=(qty=0)=>{
            const arrforret=[];
            const a=qty*5;
            if(coments.length >= a+5){
                for(let i=a;i<=a+4;i++){
                       arrforret.push(coments[i]) 
                }
            }else{
                const a=qty*5;
                const lenn=coments.length -a;
                const first=coments.length-lenn;
                for(let i=first;i<first+lenn;i++){
                    arrforret.push(coments[i]) 
                }
            }
     
           setDispCom(arrforret)
           return arrforret;
    } 
    const likeComent =(comentId)=>{


     
        if(auth.authenticate){
          setloadingcom(true)
        
      
        const el={comentId,_id:productId}
    
          dispatch(likeComment (el)).then(()=>{
            const payload = {
              params: {
                productId,
              },
            };
            dispatch(getProductDetailById(payload));
            
            setloadingcom(false)

          }).then(()=>{
              if(coments.length > 5){
                if(coments.findIndex((art)=>art._id == comentId) <5 ){
                    paginationn(1)
                }else{
                    paginationn()
                }
                
              }
            
          })
        }else{
          notify("please sign in")
        }
        
          
      }
      const removeComent = (comentId)=>{
        const idx= coments.findIndex((ar)=>ar._id == comentId)
        console.log(idx)
        setloadingcom(true)
        const el={comentId,_id:productId}
          dispatch(removecomentbyid(el)).then(()=>{
                getproduct()
               
            setloadingcom(false)
          }).then(()=>{
              if(coments.length > 5){
                  if(idx <4){
                    paginationn(1)
                  }else{
                    paginationn()
                  }
              }
           
          })
         
      }
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
      useEffect(() => {
          setloadingf(true)
          const counters=[]
         for (let j=0;j < Math.ceil(coments.length/5); j++) {
       
            counters.push(j)
         }
        
         setforpag(counters)
         paginationn()
         setloadingf(false)
            }, []);
      if (loadingcom || loadingf) {
        return (
          <Loaderr/>
        );
      }
    
        if(coments.length > 5){
            return (
                <>
                    <nav aria-label="Page ">
                    <ul class="pagination ">
                                {forpag && forpag.map((ak)=>
                                        <li onClick={()=>{
                                            paginationn(ak)
                                        }} className={Math.floor(coments.findIndex(uyt=>uyt._id==dispComents[0]._id)/5) === ak ? "item_pa activeclasss" : "item_pa"}>{ak + 1}</li>         
                            )}
                    </ul>
                    </nav>
                    {/* "item_pa" */}
                {
                dispComents.length >0 &&   dispComents.map((element) => (
                    <div
                      className="coment_wraper"
                      style={{
                        fontSize: "12px",
                        marginTop: "15px",
                        marginLeft:"50px"
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
                          <img
                            className="comentpicter_wraper"
                            src={panda}
                            alt=""
                          />
                        </div>
                      )}
                      <div >
                        {element.userName && (
                          <div className="coment_descr">
                            <Link className="menuheater_linkkk"
                                  to={`/profiles/user/${element.userId}/u`}
                                >
                                   {element.userName}
                                </Link>
                           
                            <span>
                              date  {yearformatDate(element.date)}
                            </span>
                          </div>
                        )}
                        {
                          <div className="coment_descr">
                            {element.coment}{" "}
                            <span>time {formatDate(element.date)}</span>
                            {auth.authenticate && auth.user._id === element.userId && 
                              <div onClick={()=>removeComent(element._id)}>
                              <MdClear className="delete_coment" />
                              </div>
                            
                            }
                            <div onClick={()=>likeComent(element._id)}>
                                  <FaHeart className="like_coment"/>
                                  <div className="likes_count">
                                  {element.likes.length} 
                                  </div>
                            </div>
                            
                            
                            
                          </div>
        
                        }
                      </div>
                    </div>
            ))
                    }</>)
        }
     
  return(
      <>
      <ToastContainer/>
    {
    coments.length >0 ?    coments.map((element) => (
            <div
              className="coment_wraper"
              style={{
                fontSize: "12px",
                marginTop: "15px",
                marginLeft:"50px"
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
                  <img
                    className="comentpicter_wraper"
                    src={panda}
                    alt=""
                  />
                </div>
              )}
              <div >
                {element.userName && (
                  <div className="coment_descr">
                    <Link className="menuheater_linkkk"
                          to={`/profiles/user/${element.userId}/u`}
                        >
                           {element.userName}
                        </Link>
                   
                    <span>
                      date  {yearformatDate(element.date)}
                    </span>
                  </div>
                )}
                {
                  <div className="coment_descr">
                    {element.coment}{" "}
                    <span>time {formatDate(element.date)}</span>
                    {auth.authenticate && auth.user._id === element.userId && 
                      <div onClick={()=>removeComent(element._id)}>
                      <MdClear className="delete_coment" />
                      </div>
                    
                    }
                    <div onClick={()=>likeComent(element._id)}>
                          <FaHeart className="like_coment"/>
                          <div className="likes_count">
                          {element.likes.length} 
                          </div>
                    </div>
                    
                    
                    
                  </div>

                }
              </div>
            </div>
          )) : (<div className="errorrrrr" style={{color:"white"}}>for this product dont found coments</div>)
    }
    </>
   )

 }

export default ComentsPagination