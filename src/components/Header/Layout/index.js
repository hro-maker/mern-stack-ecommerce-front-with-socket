import React from 'react'
import Header from '../index'
import Menuheader from '../meniuHeader'
import  './style.scss'
/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
   <>
   <Header/>
   <Menuheader/>
   <div className="for_bcc"></div>
   <div className="homepagee"></div>
   {props.children}
   </>
   )

 }

export default Layout