import React from "react";
import Layout from "../../components/Header/Layout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addChatroom } from "./../../actions/chatroom.action";
import { useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useState } from "react";
import "./style.scss";
import plac from './plac.png'
import { getmessageBychatroomId } from "./../../actions/message";
import Picker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";
import io from 'socket.io-client'
import { chatapi } from './../../urlConfig';
import { Helmet } from 'react-helmet';

/**
 * @author
 * @function Chatroom
 **/

const Chatroom = (props) => {
  const [chatrooooom, setchatrooooom] = useState({});
  const [socket, setSocket] = React.useState(null);
  const auth = useSelector((state) => state.auth);
  const chat = useSelector((state) => state.chat);
  const [loading, setloading] = useState(false);
  const [emojipickershow, setemojipickershow] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const messageref = React.useRef();
  const messagelistref = React.useRef();
  const chatroomname = `${auth.user.firstName} ${props.match.params.username}`;
  const [messages, setmessages] = useState([]);
  const dispatch = useDispatch();
  const sendMessage = (e) => {
    e.preventDefault();

    if (socket) {
      const myId=JSON.parse(localStorage.getItem('user'))._id
        const chatromiiii=JSON.parse(localStorage.getItem('chatrooms'));
    const userId = props.match.params.chatroom.replace(myId, "");
    const chatroomms = chatromiiii ?  chatromiiii.filter(
      (el) => el.name.includes(myId) && el.name.includes(userId)
    ) : []
      if (chatroomms[0] && chatroomms[0]._id) {

        socket.emit("chatroomMessage", {
          chatroomId: chatroomms[0]._id,
          message: messageref.current.value,
        });
      }
    }
  };
  const setupSocket = () => {
    const token = localStorage.getItem("token");
    if (token && !socket) {
      const newSocket = io(chatapi, {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("disconect")
      });

      newSocket.on("connect", () => {
        console.log("conected")
      });

      setSocket(newSocket);
      
    }
  };
  useEffect(() => {
    setupSocket()
  }, []);
  useEffect(() => { 
    setloading(true);
    
    const myId=JSON.parse(localStorage.getItem('user'))._id

    
    const chatromiiii=JSON.parse(localStorage.getItem('chatrooms'));
    const userId = props.match.params.chatroom.replace(myId, "");
    const chatroomms = chatromiiii ?  chatromiiii.filter(
      (el) => el.name.includes(myId) && el.name.includes(userId)
    ) : []
    console.log()
    if (socket) {
      if (chatroomms.length > 0) {
        
        setchatrooooom(chatroomms[0]);
          dispatch(
            getmessageBychatroomId({ chatroomId: chatroomms[0]._id })
          ).then((res) => {
            if (res.data.messages) {
              if (res.data.messages.length > 0) {
                const newMessages = [...messages, ...res.data.messages];
                setmessages(newMessages);
              }
            }
          });
          socket.emit("joinRoom", {
            chatroomId: chatroomms[0]._id,
          });
          
        
      } else {
        setTimeout(() => {
          dispatch(
            addChatroom({ name: props.match.params.chatroom, chatroomname })
          ).then((res) => {
            setchatrooooom(res.data.chatrom);
            if(res.data.chatrom){
              if(socket){
                socket.emit("joinRoom", {
                  chatroomId: res.data.chatrom._id,
                });
              }
              
            }
           
          });
        }, 100);
      }
    }
     
    setloading(false);
    props.setupSocket()
    return () => {

        if (socket) {
         if(chatroomms[0]){
          socket.emit("leaveRoom", {
            chatroomId: chatroomms[0]._id,
          });
         } 
        }
     
    };
    // eslint-disable-next-line
  }, [socket]);
 
  useEffect(() => {
    if (messagelistref.current) {
      messagelistref.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  [messages])
  useEffect(() => {
         const myId=JSON.parse(localStorage.getItem('user'))._id
        const chatromiiii=JSON.parse(localStorage.getItem('chatrooms'));
      const userId = props.match.params.chatroom.replace(myId, "");
      const chatroomms = chatromiiii ? chatromiiii.filter(
        (el) => el.name.includes(myId) && el.name.includes(userId)
      ) : []
      if (socket) {
        socket.on("newMessage", (message) => {
            console.log(message)
          const newMessages = [...messages, message];
          setmessages(newMessages);
        });
        messageref.current.value = "";
      }
      if(messages.length === 0 ){
        if(chatroomms[0] && chatroomms[0]._id){
          if(socket){
            socket.emit("joinRoom", {
              chatroomId: chatroomms[0]._id,
            });
          }
          dispatch(
            getmessageBychatroomId({ chatroomId: chatroomms[0]._id })
          ).then((res) => {
            if (res.data.messages) {
              if (res.data.messages.length > 0) {
                const newMessages = [...messages, ...res.data.messages];
                setmessages(newMessages);
              }
            }
          });
        }
       

      }
      
  },[messages,socket])
  useEffect(() => {
    console.log("messages socket 1",socket)
    
  }, [socket]);
 const token= localStorage.getItem('token')
if(!token || token.length === 0){
  return  (<Redirect to="/"/>)
}
if (loading) {
  return (
  <div>loadinggggggggg</div>
    )
}
const formatDate = (date) => {
  if (date) {
    const d = new Date(date);
    return `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()} : ${
      d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
    } `;
  }
  return "";
};
const onEmojiClick = (event, emojiObject) => {
  setChosenEmoji(emojiObject);
  console.log("sdaasd",emojiObject)
  messageref.current.value=messageref.current.value + emojiObject.emoji
};             
 const closeemojipicker=(e)=>{
        if(emojipickershow){
          if(e.target.className ==="chatcontainer_top" || e.target.className ==="chat_wraper" ){
            setemojipickershow(false)
          }
        }
 }
  return (
    <Layout>
     
      <div className="chatcontainer_top" onClick={(e)=> closeemojipicker(e)} >
        
        <div  className="chat_wraper">
       
          {messages && messages.length>0 ?
              
            messages.map((el, index) => (
              <div ref={messagelistref} key={index} className="messages">
                
                {el.userId == auth.user._id ? (
                    
                    <div className="mymesage">
                      
                      <div className="df dffff">
                      <div>
                      <Link className="whiteeee_font" to="/profile">
                        <div>
                          {auth.user.profilePicture ? <img className="comentpicter_wraper comentpicter_wraperr " src={auth.user.profilePicture} alt="" /> : <img className="comentpicter_wraper comentpicter_wraperr " src={plac} alt="" />}
                        </div>
                       
                        {auth.user.firstName}
                        </Link>
                      </div>
                      <div className="worddd">
                      {el.message}
                      
                      </div>
                      <div className="time">
                        {formatDate(el.date)}
                      </div>
                      </div>
                    </div>
                  
                ) : (
                  
                    <div className="yourmesage">
                          <Helmet>
                      <title> chat with {
                        auth.users.find((al) => al._id == el.userId) &&
                         
                        auth.users.find((al) => al._id == el.userId)
                          .firstName
                        
                        }</title>
                          </Helmet> 
                      <div className="df dffff">
                    <div className="he">
                      <div>
                      <Link className="white_font"
                        to={`/profiles/user/${auth.users.find((al) => al._id == el.userId) && auth.users.find((al) => al._id == el.userId)._id}/u`}
                      >
                       
                      {
                         
                      auth.users.find((al) => al._id == el.userId) &&
                      
                        auth.users.find((al) => al._id == el.userId)
                          .profilePicture ? <img  className="comentpicter_wraper comentpicter_wraperr " src={auth.users.find((al) => al._id == el.userId)
                            .profilePicture} alt=""/> : <img  className="comentpicter_wraper comentpicter_wraperr" src={plac} alt=""/>}
                                </Link>
                      </div>
                      { 
                      auth.users.find((al) => al._id == el.userId) && 
                        <Link className="white_font"
                        to={`/profiles/user/${auth.users.find((al) => al._id == el.userId)._id}/u`}
                      >
                        { 
                        auth.users.find((al) => al._id == el.userId) &&
                         
                      auth.users.find((al) => al._id == el.userId)
                        .firstName}{" "}
                      </Link>
                       
                      }
                      
                      
                          
                    </div>
                        <div className="worddd">
                        {el.message}
                        
                        </div>
                        <div className="time">
                        {formatDate(el.date)}
                      </div>
                       </div>
                       
                       </div>
                 
                )}
               
              </div>
            )) : <div className="empty_chat" >chat is empty</div> }                
        </div>
        
        <div className="formchka">
        <button onClick={()=> setemojipickershow(!emojipickershow)} className="buttoonnnnn"> <GrEmoji/> </button>
          <form className="chat_formmm" onSubmit={sendMessage}>
            {
              emojipickershow && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ position:"fixed",bottom:"18%",left:"10px"}} /> 
            }
          
          
            <input
              placeholder="write message"
              ref={messageref}
              type="text"
              className="inputt"
            />
            <button className="chat_btn" type="submit">
              sent
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Chatroom);
