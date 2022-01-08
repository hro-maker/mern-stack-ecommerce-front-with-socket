import React from 'react';
import './App.css';
import HomePage from './containers/homepag/HomePage';
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getallusers, isUserLoggedIn } from './actions/auth.actions';
import CardPage from './containers/homepag/CartPage/index';
import { updateCart } from './actions/cart.action';
import CheckoutPage from './containers/homepag/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage/index';
import ProductDetailPage from './containers/homepag/productDetail/index';
import ProductListPage from './containers/homepag/ProductListPage/index';
import Profile from './containers/profile/index';
import User from './containers/users';
import Search from './containers/search/index';
import Chatroom from './containers/chatroom';
import io from 'socket.io-client'
import { chatapi } from './urlConfig';
import { getallchatrooms } from './actions/chatroom.action';
import AllChatrooms from './containers/allChatrooms/index';
import SearchUsers from './containers/searchusers/index';
import ForgetPassword from './containers/forgetpassword';
import ResetPAssword from './containers/resetpass/index';
const nodemailer = require("nodemailer");


function App() {
  const chat= useSelector(state => state.chat)
  if(chat.chatrooms && chat.chatrooms.length >0){
    localStorage.setItem('chatrooms',JSON.stringify(chat.chatrooms))
  }
  
  const dispatch = useDispatch();
  const [socket, setSocket] = React.useState(null);

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

  // setupSocket()
  useEffect(() => {
                 
    dispatch(getallusers())
    dispatch(getallchatrooms())
    console.log(navigator)
  }, []);
  
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
   
  },[auth.authenticate]);
  useEffect(() => {
    dispatch(updateCart())
    
  },[auth.authenticate]);
 
  return (
    <Router>
      <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/cart'  component={CardPage} />
      <Route path='/forgot'  component={ForgetPassword} />
      <Route path='/resetPaassword/:tokenn'  component={ResetPAssword} />
      <Route path='/profile'  component={Profile} />
      <Route path='/allchatrooms'  component={AllChatrooms} />
      <Route path='/checkout'  component={CheckoutPage} />
      <Route path="/account/orders" component={OrderPage} />
      <Route path="/products/search/:productname/p" component={Search} />
      <Route path="/users/search/:data/u" component={SearchUsers} />
      <Route path="/user/chatroom/:chatroom/:username/m"><Chatroom setupSocket={setupSocket} socket={socket}/> </Route>
      <Route path="/profiles/user/:userid/u" component={User} />
      <Route path="/order_details/:orderId" component={OrderDetailsPage} />
      <Route path='/:productSlug/:productId/p' component={ProductDetailPage } />
      <Route path='/:slug' component={ProductListPage} />
      <Route  component={HomePage} />
       </Switch>
    </Router>
   
  );
}


export default App;
