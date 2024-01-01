import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => { 
  const[credentials,setCredentials] =useState({email:"",password:""});

  const navigate= useNavigate();

  const onSubmit= async (e)=>{
    e.preventDefault();
    console.log("onSubmit"+credentials.email+" "+credentials.password);
    const url="http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json(); 
    if(json.success){
        localStorage.setItem('token',json.authToken);
        navigate('/');
        props.switchAlert('Logged in Successfully','success');
    }else{
        props.switchAlert('Invalid Credentials','danger')
    }
  }

  const onChange=(e)=>{
    setCredentials({...credentials ,[e.target.name] : e.target.value})
  }

  return (
    <div className='container mt-5'>
        <h2>Login to continue to iNotebook</h2>
        <form onSubmit={onSubmit}>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" defaultValue={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" defaultValue={credentials.password} onChange={onChange} className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
