import { autConstants } from "./../actions/constans";
const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    pofilePicture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  users: [],
  signup: null,
  load:false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case autConstants.LOGIN_REQUEST:
      return (state = {
        ...state,
        authenticating: true,
      });

    case autConstants.LOGIN_FAILURE:
      return (state = {
        ...state,
        authenticating: false,
        message:"login failure",
        error: action.payload.error.message,
      });
    case autConstants.LOGIN_SUCCES:
      return (state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        message: "login succes",
      });
    case autConstants.LOGOUT_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case autConstants.LOGOUT_SUCCESS:
      return (state = {
        ...initialState,
        loading:false,
        message: "logout success",
      });
    case autConstants.LOGOUT_FAILURE:
      return (state = {
        ...state,
        error: action.payload.error,
        loading: false,
      });
    case autConstants.GETT_ALL_USERS_SUCESS:
      return (state = {
        ...state,
        users: action.payload,
      });
    case autConstants.SIGNUP_REQUEST:
      return (state = {
        ...state,
        load:true
      });
    case autConstants.SIGNUP_SUCCESS:
      return (state = {
        ...state,
        signup: true,
        message: "signup success",
        load:false
      });
    case autConstants.SIGNUP_SETBOOLEAN:
      return (state = {
        ...state,
        signup: false,
      });
    case autConstants.SIGNUP_FAILURE:
      return (state = {
        ...state,
        error: action.payload.error,
        signup: false,
        message: "signup falure",
        load:false
      });

    default:
      return state;
  }
};
export default authReducer;
