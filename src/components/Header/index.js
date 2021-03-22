import React, { useEffect, useState } from "react";
import "./style.css";
import shlyans from "./2.svg";
import goldenStar from "./images/star.png";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../Header/MaterialUi";
import { useDispatch } from "react-redux";
import {
  login,
  signout,
  signup as _signup,
} from "./../../actions/auth.actions";
import { useSelector } from "react-redux";
import Cart from "./UI/cart";
import { FcBusinessman } from "react-icons/fc";
import "./style.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiMessengerFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { BiDollar } from 'react-icons/bi';
import { getallchatrooms } from "../../actions/chatroom.action";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [forburg, setforburg] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setprofileImage] = useState("");
  const [search, setsearch] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const burger=["meniu__icon"];
  const burgerr=["meniu__icon activeee"];
 
  const cart = useSelector((state) => state.cart);
  const notify = (el) => toast.info(`${el}`);
  const userSignup = () => {
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("email", email);
    form.append("password", password);
    form.append("profilePicture", profilePicture);
    if(!email.includes('@')){
      notify("valid email required")
      return;
    }
    if(firstName === "" || firstName.length < 5){
      notify("firstName minimal length is 5")
      return;
    }
    if(lastName === "" || lastName.length < 5){
      notify("lastName minimal length is 5")
      return;
    }
    if(email === "" || email.length < 5){
      notify("email required")
      return;
    }
    if(password === "" || password.length < 5){
      notify("password minimal length is 6")
      return;
    }
  
        dispatch(_signup(form))
    //     .then(()=>{
             
      
    // //  if(auth.message.length > 0){
    // //       notify(auth.message)
    // //  }
      
 
    // })
  };

  const userLogin = async () => {
    if (signup) {
      userSignup();
    } else {
      if(!email.includes('@')){
        notify("valid email required")
        return;
      }
      if(email === "" || email.length < 5){
        notify("email required")
        return;
      }
      if(password === "" || password.length < 5){
        notify("password minimal length is 6")
        return;
      }
     await dispatch(login({ email, password })).then(()=>{
       dispatch(getallchatrooms())
     })
     
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      // notify("signin succes")
      setLoginModal(false);
    }
  }, [auth.authenticate]);


  const renderLoggedInMenu = () => {
    return (
      <div className="for_css for_css_headerr">
            <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
      <Link className="header_profile_link" to="/profile"> my profile</Link>
      </div>
      
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <>
      {/* <Link style={{color:"white",textDecoration:'none',marginRight:"10px"}} to='/forgot'>forgot password ?</Link> */}
      <div className="for_css">
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span style={{fontSize:"16px"}}>New Customer?</span>
            <Link className="signup_"
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              
            >
              Sign Up
            </Link>
          </div>
        }
      />
      </div>
      </>
    );
  };
  const hendlprofileImage = (e) => {
    setprofileImage(e.target.files[0]);
  };

useEffect(() => {
  if(auth.signup){
    notify('signup succes')
  
  }

}, [auth.signup]);
 
  return (
    <div className="header">
          {auth.authenticate && <div style={ forburg?{transform: `translateX(${-100}%)`}:{transform: `translateX(${0}%)`}} className="burgermenu">
                <div className="burgermenuwraper">
                  <Link to="/">
                  <img className="logoo" src={shlyans} alt=""/>
                  </Link>
                  
                  <div className="navv_listttt">
                   
                    <div className="df burger_search">
                      <input
                        value={search}
                        onChange={(e)=>setsearch(e.target.value)}
                        className="burger_input header_input_se"
                        placeholder={"search for products, brands and more"}
                      />
                      <div className="">
                        <Link
                          className="menuheater_linkkkkk"
                          to={`/products/search/${search}/p`}
                        >
                          <IoIosSearch
                            style={{
                              marginTop:"10px",
                              color: "#2874f0",
                            }}
                          />
                        </Link>
                      </div>
                    </div>    
                    <div className="nav_linkkkkkkk"  style={{listStyle:"none"}} onClick={logout} >
                    <Link  className="nav_linkkk">
                    logout  <IoMdLogOut/>
                    </Link>
                    </div>
                      <div className="nav_linkkkkkkk"  style={{listStyle:"none"}}>
                      <Link  className="nav_linkkk" to="/profile">
                      My profile <FcBusinessman/>
                      </Link>
                      </div>
                      <div className="nav_linkkkkkkk" style={{listStyle:"none"}} >
                      <Link className="nav_linkkk" to="/allchatrooms">
                      Messages <RiMessengerFill/>
                      </Link>
                      </div>
                  </div>
                </div>
          </div>}
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {/* {auth.error && notify(auth.error)} */}
                {signup && (
                  <input
                    className="signin_first_name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <input
                  className="signin_first_name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}
                {signup && <div style={{textAlign:"center"}} className="profile_picture_signup">profile picture</div>}
                {signup && (
                  <input
                  className="signin_first_name signin_first_name_file"
                    type="file"
                    name="profileImage"
                    onChange={hendlprofileImage}
                  />
                )}

                <input
                className="signin_first_name"
                  type="text"
                  placeholder="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                className="signin_first_name"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  
                  style={{
                    margin: "40px 0 20px 0",
                    width:"100%"
                  }}
                  onClick={userLogin}
                />
                
            
              </div>
              <BiDollar className="animated_dolar"/>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
      <div className="subHeader">
      
        <div className="logoo">
          <Link to="/">
            <img src={shlyans} className="logooo" alt="" />
          </Link>
          
        </div>
       
       {!auth.authenticate &&  <div className="logood">
          <Link to="/">
            <img src={shlyans} className="logoooo" alt="" />
          </Link>
          
        </div>}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              value={search}
              onChange={(e)=>setsearch(e.target.value)}
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <Link
                className="menuheater_link"
                to={ search.length > 0 ? `/products/search/${search}/p` : `#`}
              >
                <IoIosSearch
                  style={{
                    color: "#2874f0",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
        {!auth.authenticate && <>
          
          <button onClick={() => {
              setSignup(false);
              setLoginModal(true)
            }} className="cartActionBtnn for_nonnt"> Sign in </button>
            <button
            onClick={() => {
              setLoginModal(true);
              setSignup(true);
            }}
            className="cartActionBtnn for_nonnt"> Sign up</button></>}
            

      
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
            <div>
           {!auth.authenticate &&  <Link className="forgot_password_head" style={{color:"white",textDecoration:'none',marginRight:"10px"}} to='/forgot'>forgot password ?</Link>}
            </div>
          <div> 
          
            <Link to={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </Link>
          </div>
          {auth.authenticate && <Link className="all_chatrooms_s" style={{color:"white",fontSize:"20px"}} to="/allchatrooms"> <RiMessengerFill className="messages_kofo"/> </Link>}
          {auth.authenticate && <div className={forburg?burger:burgerr}
            onClick={()=>setforburg(!forburg)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>}
        </div>
       
      </div>
    </div>
  );
};

export default Header;
