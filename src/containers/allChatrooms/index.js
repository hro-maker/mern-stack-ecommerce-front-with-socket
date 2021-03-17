import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Header/Layout'
import { useState, useEffect } from 'react';
import plac from './plac.png'
import './style.scss'
import { Link, Redirect } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import {Helmet} from "react-helmet";


/**
* @author
* @function AllChatrooms
**/


const AllChatrooms = (props) => {
    const [usersearch, setusersearch] = useState("");
    const chat = useSelector(state => state.chat)
    const auth = useSelector(state => state.auth)
    // const [use, setUse] = useState([]);
    const chatrooms=chat.chatrooms.filter(el => el.name.includes(auth.user._id))
    console.log("chatroom",chatrooms)
  
    const tokennnn= localStorage.getItem('token')
        if(!tokennnn || tokennnn.length === 0){
          return  (<Redirect to="/"/>)
        }
        if(chatrooms.length===0){
            return (
                <Layout>
                    <div className="errorrrrr">
                    <div style={{marginBottom:"30px"}} className="search_people">
                        <input value={usersearch} onChange={(e)=>setusersearch(e.target.value)} className="inputtttt" placeholder="search users" type="text"/>
                  
                        <Link className="search_people_loop" to={`/users/search/${usersearch}/u`}> <IoIosSearch /> </Link>
                    
                    </div>
                        <span  >you don't have any chat</span>
                    </div>
                </Layout>
            )
        }
        const difchatrom = chatrooms.map(element => {
            return element.name.replace(auth.user._id,"")
        })
     
      const use= difchatrom.map(ai => {
            return ai= auth.users.find(u => u._id == ai)
        })
       
        setTimeout(() => {
            console.log("h")
        }, 1);
        
        if(!use.length || use[0]===undefined){
            return (
                <Layout>
                    <div style={{color:"white",textAlign:"center"}} className="errorrr">
                  
                        you dont have ani chat
                     
                    </div>
                </Layout>
            )
        }
    
         console.log(use,"useeeeee")
  return(
      <Layout>
            <Helmet>
        <title>Chatrooms</title>
             </Helmet> 
          <div className="chatrommcontain">
                    <div className="search_people">
                        <input value={usersearch} onChange={(e)=>setusersearch(e.target.value)} className="inputtttt" placeholder="search users" type="text"/>
                  
                        <Link className="search_people_loop" to={usersearch.length>0 ?`/users/search/${usersearch}/u` : `#`}> <IoIosSearch /> </Link>
                    
                    </div>

                      <div style={{color:"#ffffff"}} className="title">  All Chats</div>
              <div className="chatroom_subcontainer">
              {
                 use.reverse().map((el,index )=>
                 
                 <Link 
                 key={index}
                 to={`/user/chatroom/${el && el._id}${auth.user._id && auth.user._id}/${el && el.firstName}/m`}
                 style={{textDecoration:"none"}}>
                    <div key={index} className="single_room_cont"> 
                        
                        {el &&  <div className="user_img">
                          {el && el.profilePicture && <img className="comentpicter_wraper" src={el && el.profilePicture} alt=""/> }
                      </div> }
                      {el && !el.profilePicture && <div className="user_img">
                      <img className="comentpicter_wraper" src={plac}alt="" />
                      </div>}
                      
                      
                      <div className="user_descr">
                              <div className="user_fullname"> {el && el.firstName} {el && el.lastName } </div>
                              <div className="user_maill"> {el && el.email} </div>
                      </div>
                        
                      
                  </div> 
                  </Link>
                    )
             }
              </div>
                    
                   
          </div>
             
      </Layout>
   
   )

 }

export default AllChatrooms