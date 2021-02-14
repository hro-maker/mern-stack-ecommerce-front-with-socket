import { cartConstants } from './../actions/constans';

const initState = {
    cartItems: {
        
    },
    updatingCart:false,
    error:null
};

const cartReducer= (state = initState, action) => {
    switch(action.type){
        
        case cartConstants.ADD_TO_CART_REQUEST:
         return   state = {
                ...state,
                updatingCart: true
            }
           
        case cartConstants.ADD_TO_CART_SUCCESS:
            return    state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
        case cartConstants.ADD_TO_CART_FAILURE:
         return   state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            
        case cartConstants.RESET_CART:
          return  state = {
                ...initState
            }

            default:
                return state
    }
}
export default cartReducer