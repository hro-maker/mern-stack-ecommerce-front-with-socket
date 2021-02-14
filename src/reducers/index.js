import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import chatroomreducer from './chatroom.reducer';

const rootReducer= combineReducers({
    category:categoryReducer,
    product:productReducer,
    auth:authReducer,
    cart:cartReducer,
    user:userReducer,
    chat:chatroomreducer
})
export default rootReducer