import React from 'react'
import Layout from '../../components/Header/Layout'
import './forget.scss'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions/auth.actions';
import { useHistory } from 'react-router';
import Loaderr from '../../components/Header/UI/loaderr';
/**
* @author
* @function ForgetPassword
**/

const ForgetPassword = (props) => {
  // forgotPassword
  let history = useHistory();
  const [email,setEmail]=useState('')
  const [loading,setloading]=useState(false)
  const dispatch= useDispatch()
  const notify = (el) => toast.info(`${el}`);
  const resetPassword=(e)=>{
     e.preventDefault();
        if(!email.includes('@')|| email.length < 5){
         return notify('valid email required')
        }
        notify("check your email")
        setloading(true)
        dispatch(forgotPassword({email}))
        setloading(false)
        
        history.push("/")

  }
  if(loading){
    return <Loaderr/>
  }
  return(
    <Layout>
      <ToastContainer/>
        <div className="forget_passwordpage">
                    <div className="container">
                        <form onSubmit={resetPassword} className="forg_wraper_inp">
                          <div style={{fontSize:'20px'}}> enter your email for reset</div>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="forget_input" type="text"/>
                        <button type="submit" className="forgot_pass_btn">reset password</button>
                        <div style={{fontSize:'20px'}}> after sent check your email</div>
                        </form> 
                       </div>
        </div>
    </Layout>
   )

 }

export default ForgetPassword