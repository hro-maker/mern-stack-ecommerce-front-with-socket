import React, { useEffect } from 'react'
import Header from '../index'
import Menuheader from '../meniuHeader'
import  './style.scss'
import { useSelector } from 'react-redux';
import Loaderr from './../UI/loaderr';
import { ToastContainer, toast } from 'react-toastify';
/**
* @author
* @function Layout
**/

const Layout = (props) => {
  const notify = (el) => toast.info(`${el}`);

 const auth= useSelector(state => state.auth)

 useEffect(() => {
   if(auth.error != null){
    notify("autenticating failure")
   }
 
}, [auth.error]);
 if(auth.authenticating || auth.loading ){
   return <Loaderr/>
 }

  return(
    
   <>
   <Header/>
   <ToastContainer/>
   <Menuheader/>
   <div className="for_bcc"></div>
   <div className="homepagee"></div>
   {props.children}
   </>
   )

 }

export default Layout