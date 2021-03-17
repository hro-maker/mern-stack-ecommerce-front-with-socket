import React  from 'react'
import Layout from '../../components/Header/Layout'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useState, useEffect } from 'react';
import { ResetPassword } from './../../actions/auth.actions';
import { useDispatch } from 'react-redux';

/**
* @author
* @function ResetPAssword
**/
// password
// token
const ResetPAssword = (props) => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const notify = (el) => toast.info(`${el}`);
    const auth= useSelector(state => state.auth)
    const dispatch=useDispatch()
    useEffect(() => {
      console.log(props.location.pathname.replace('/resetPaassword/',''))
    }, []);
    if(auth.authenticate){
       return  <Redirect to='/'/>
    }
    const reset=(e)=>{
        e.preventDefault();
        if(password.length < 5){
          return  notify('password min length:5')
        }
        if(password!==password2){
          return  notify('different password')
        }
        dispatch(ResetPassword({password:password,token:props.location.pathname.replace('/resetPaassword/','')})).then((ress)=>{
            console.log(ress)
            notify(ress.data.message)
            
        })
  
        
    }
    
  return(
    <Layout>
        <ToastContainer/>
        <div className="reset_password_wraper">
                <form  onSubmit={reset}>
                  <label style={{fontSize:"20px"}} htmlFor="1">password:</label>
                  
                    <input id="1" className="reset_input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
                    <label style={{fontSize:"20px"}} htmlFor="2">repeet password:</label>
                    <input id="2" className="reset_input" value={password2} onChange={(e)=>setPassword2(e.target.value)} type="password"/>
                    <button className="reset_btn" type="submit">cheng</button>
                    </form>    
        </div>
    </Layout>
   )

 }

export default ResetPAssword