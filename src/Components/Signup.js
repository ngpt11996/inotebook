import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:""});
    
    const onChange= (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }
    const navigate= useNavigate();

    const onSubmit=async (e)=>{
        e.preventDefault();
        const url="https://inotebook-backend-jvz5.onrender.com/api/auth/createuser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json(); 
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate('/');
            props.switchAlert('Signed in Successfully','success');
        }else{
            props.switchAlert('Invalid Credentials','danger');
        }
    }

    return (
        <div className="container mt-5">
            <h2>Signup to use iNotebook</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" defaultValue={credentials.name} onChange={onChange} id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" defaultValue={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input type="password" className="form-control" defaultValue={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" defaultValue={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
