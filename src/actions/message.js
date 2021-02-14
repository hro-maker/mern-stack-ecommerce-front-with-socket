import axioss from './../helpers/axios';

export const getmessageBychatroomId = (data)=>{

    return async dispatch =>{
       const res=await axioss.post('/message/get',{...data})
            return res
    }
}