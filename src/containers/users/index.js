import React from 'react'
import Layout from '../../components/Header/Layout'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useSelector } from 'react-redux';
import plac from './plac.png'
import './style.scss'
import { Link, Redirect } from 'react-router-dom';
import { AiFillMessage, AiOutlineArrowRight} from "react-icons/ai";
/**
* @author
* @function User
**/

const User = (props) => {
    const auth= useSelector(state => state.auth)
    // console.log(props.match.params.userid)
    // console.log(auth.users)
    
   const user= auth.users.find(user => user._id == props.match.params.userid)
   if(user){
    if(user._id == auth.user._id){
      return  <Redirect to={`/profile`}/>
     }
   }
   
   console.log(user);
  return(
    <Layout>
    <div style={{color:"white",fontSize:"20px"}} className=" user_backgrount">
        {user ? <div className="df dfv">
           {user && user.profilePicture ? <Zoom>
              <img
              className="before-zoom"
              alt="that wanaka tree"
              src={`${user.profilePicture}`}
              width="200"
              />
               </Zoom> : <div> <img className="placeholderimage" src={plac} alt=""/>  </div>}
           

           <div className="user_information">
               <div className="name_last">
             
              <div className="user_name">  <span>Name: </span>  <br/>  {user && user.firstName} </div>
                  
              <div className="user_lastname"> <span>lastname:</span>  <br/> {user && user.lastName}</div>
              <div className="user_lastname"><span> email:</span> <br/> {user && user.email}</div>
              </div>
              </div>
              {auth.authenticate && <div className="user_lastname chat_linkkk">chat <AiOutlineArrowRight/><Link className="menuheater_link"
                                  to={`/user/chatroom/${user._id}${auth.user._id}/${user.firstName}/m`}
                                >
                                   <AiFillMessage/>
                                </Link></div> }
              

              </div>  : <div className="dont_fount" >user not found</div> }

            
               </div>
  </Layout>
   )

 }

export default User