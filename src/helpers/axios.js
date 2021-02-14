import axios from 'axios'
import store from '../store';
import { api } from './../urlConfig';

const token= window.localStorage.getItem('token')
const axioss= axios.create({
   baseURL:api,
   headers:{
     'Authorization':token?`Bearer ${token}`:''

   }
})

axioss.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});
export default axioss