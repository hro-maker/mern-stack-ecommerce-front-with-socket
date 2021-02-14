import { chatroomConstans } from "../actions/constans";

const initialstate={
    loading:false,
        chatrooms:[],
        error:null
}
const chatroomreducer=(state=initialstate,action)=>{
    switch (action.type) {
        case chatroomConstans.GETT_ALL_CHATROOMS_REQUEST:
            return state ={
                ...state,
                loading:true
            }
          
            case chatroomConstans.GETT_ALL_CHATROOMS_SUCCES:
                return state ={
                    ...state,
                    loading:false,
                    chatrooms:action.payload
                }
              
                case chatroomConstans.GETT_ALL_CHATROOMS_FAILURE:
                    return state ={
                        ...state,
                        loading:false,
                        error:action.payload
                    }
                      
        default:
           return state
    }
}
export default chatroomreducer