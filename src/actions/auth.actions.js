import { autConstants, cartConstants } from "./constans";
import axioss from "./../helpers/axios";
export const login = (user) => {
  
  return async (dispatch) => {
    dispatch({ type: autConstants.LOGIN_REQUEST });
    try {
      const res = await axioss.post("/signin", {
        ...user,
      });
      console.log("resss",res)
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: autConstants.LOGIN_SUCCES,
          payload: {
            token,
            user,
          },
        });
        return res;
      }
       if (res.status === 400) {
          console.log("failure")
          dispatch({
            type: autConstants.LOGIN_FAILURE,
            payload: { error: res.data.error },
          });
          return res;
        }
      
    } catch (error) {
      console.log(error.message)
      dispatch({
        type: autConstants.LOGIN_FAILURE,
        payload: { error},
      });
      return error
    }
    
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: autConstants.LOGIN_SUCCES,
        payload: {
          token,
          user,
        },
      });
    } else {
      console.log("error")
      // dispatch({
      //   type: autConstants.LOGIN_FAILURE,
      //   payload: { error: "Failed to login" },
      // });
    }
  };
};
export const signout = () => {
  return async (dispatch) => {
   
    dispatch({type:autConstants.LOGOUT_REQUEST})
    // localStorage.removeItem('user')
    // localStorage.removeItem('token')
    localStorage.clear()
    dispatch({
      type: autConstants.LOGOUT_SUCCESS,
    });
    dispatch({
      type: cartConstants.RESET_CART
    });
    // const res = await axioss.post("/signout");
    // if (res.status === 200) {
      
    // } else {
    //   dispatch({
    //     type: autConstants.LOGOUT_FAILURE,
    //     payload:{error:res.data.error}
    //   });
    // }
  };
};
export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
     
      dispatch({ type: autConstants.SIGNUP_REQUEST});
      res = await axioss.post(`/signup`, user);
     
      if (res.status === 201) {
        dispatch({ type: autConstants.SIGNUP_SUCCESS });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: autConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        return true
      } else {
        const { error } = res.data;
       
        dispatch({ type: autConstants.SIGNUP_FAILURE, payload: { error } });
        return false
      }
    } catch (error) {
      dispatch({ type: autConstants.SIGNUP_FAILURE, payload: { error } });
      return false
    }
  };
};
export const getallusers=()=>{
      return async (dispatch)=>{
        const allusers= await axioss.get('/getalluser')
        const all=allusers.data.allusers
        dispatch({
          type:autConstants.GETT_ALL_USERS_SUCESS,
          payload:all
        })
      }
}
export const forgotPassword=(data)=>{
  return async dispatch=> {
   const res= axioss.post('/forget',{...data})
   return res
  }
}
export const ResetPassword=(data)=>{
  return async dispatch=> {
   const res=await axioss.post('/reset',{...data})
   return res
  }
}