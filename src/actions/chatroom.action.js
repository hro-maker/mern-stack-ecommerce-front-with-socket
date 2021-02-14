import axioss from './../helpers/axios';
import { chatroomConstans } from './constans';
 const getallchatrooms =()=>{

    return async dispatch =>{
        try {
            dispatch({type: chatroomConstans.GETT_ALL_CHATROOMS_REQUEST})
                const res= await axioss.get('/getAllchatrooms')
                
                    dispatch({type: chatroomConstans.GETT_ALL_CHATROOMS_SUCCES,payload:res.data})
             
                
        } catch (error) {
            dispatch({type: chatroomConstans.GETT_ALL_CHATROOMS_FAILURE,payload:error})
        }
       
    }
}
export const addChatroom =(data)=>{

    return async dispatch =>{
        const res= await axioss.post('/createchatroom/chat',{...data})
        dispatch(getallchatrooms())
        return res
    }
}
export {getallchatrooms}