import { userConstants } from "../actions/constans";

const initState = {
  address: [],
  orders: [],
  orderDetails: {},
  error: null,
  loading: false,
  orderFetching: false,
  placedOrderId: null,
};

const userReducer=(state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
    return  state = {
        ...state,
        loading: true,
      };
      
    case userConstants.GET_USER_ADDRESS_SUCCESS:
     return state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
     
    case userConstants.GET_USER_ADDRESS_FAILURE:
     return state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      
    case userConstants.ADD_USER_ADDRESS_REQUEST:
    return  state = {
        ...state,
        loading: true,
      };
     
    case userConstants.ADD_USER_ADDRESS_SUCCESS:
    return  state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };

    case userConstants.ADD_USER_ADDRESS_FAILURE:
    return  state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    
    case userConstants.GET_USER_ORDER_REQUEST:
     return  state = {
        ...state,
        orderFetching: true,
      };
      
    case userConstants.GET_USER_ORDER_SUCCESS:
     return state = {
        ...state,
        orders: action.payload.orders,
        orderFetching: false,
      };
     
    case userConstants.GET_USER_ORDER_FAILURE:
     return state = {
        ...state,
        error: action.payload.error,
        orderFetching: false,
      };
    
    case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
      break;
    case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
     return state = {
        ...state,
        orderDetails: action.payload.order,
      };
     
    case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
      break;
    case userConstants.ADD_USER_ORDER_SUCCESS:
     return state = {
        ...state,
        placedOrderId: action.payload.order._id,
      };
     
      default:
        return state
  }

  return state;
};
export default userReducer