import React from "react";
import Layout from "./../../components/Header/Layout/index";
// import { from 'react-b'}
import "./style.scss";
import { Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import plac from './plac.png'
import { Link } from "react-router-dom";
import linnk from './32.png'
import { Helmet } from 'react-helmet';
/**
 * @author
 * @function Profile
 **/

const Profile = (props) => {
    const auth= useSelector((state) => state.auth)
    const user=auth.user
  return (
    <Layout>
       <Helmet>
        <title> {user.firstName}</title>
             </Helmet> 
      <div className="profile_bcc">
           <div className="df dfff">
             {user.profilePicture ? <Zoom>
                <img
                className="before-zoom"
                alt="that wanaka tree"
                src={`${user.profilePicture}`}
                width="200"
                />
                 </Zoom> : <div> <img className="placeholderimage" src={plac} alt=""/>  </div>}
             

             <div className="user_information">
                 <div className="name_last">
               
                <div className="user_name">  <span>Name: </span>  <br/>  {user.firstName} </div>
                    
                <div className="user_lastname"> <span>lastname:</span>  <br/> {user.lastName}</div>
                <div className="user_lastname"><span> email:</span> <br/> {user.email}</div>
                </div>
                </div>
                </div>    

            <div className="orders_link ">
                 My orders
              <Link to="/account/orders">

                <img className="orders_logo" src={linnk} alt=""/>
              </Link>
              </div>     
                 </div>
    </Layout>
  );
};

export default Profile;
