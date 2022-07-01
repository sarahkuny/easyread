
import axios from 'axios';
import React, {useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from "../assets/bionic-reading-signup.png";
import ErrorModal from './ErrorModal';

export default function Login(){
    const [credentials, setCredentials] = useState({ username:"", password: ""});
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({...credentials, [name]: value })
    }

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const { data } = await axios("/api/users/login", {
                method: "POST",
                data: credentials
            });
            localStorage.setItem("token", data);
            navigate('/convert');
        } catch (err){
            setError(true)
        }
    }
    

    return (
        <>
            {error ? <ErrorModal  closeError={() => setError(false)} 
                                  title="Account Login Failed" 
                                  message="Please try a different username or password." /> : ""}
            <Link to="/"><h1 className="text-5xl ml-3 my-6 font-louisgeorge">easy<b>Read</b></h1></Link>
            <div className="bg-zinc-900">     
            <div className="flex flex-col md:flex-row space-between lg:w-5/6 m-auto h-screen bg-zinc-900">
                <div className="w-96 h-3/6 m-auto flex flex-col justify-center text-white text-2xl">
                <img src={img} alt="Dyslexia is thought to affect 1 in 5 people. Bionic Reading makes text accessible for all. The eye is guided through text by emphasizing the most concise parts of the word." />
                </div>
                <div className="shadow-lg p-5 m-auto bg-slate-100 rounded-md flex flex-col justify-between content-center max-h-380 min-h-content">
                    <h3 className="font-bold">Fill in your personal details below to log in to your account.</h3>
                    <form onSubmit={handleLogin} className="flex flex-col">
                        {/* Username input */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Username</label>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                className="rounded-md px-2"
                                required 
                                onChange={handleInputChange}  />
                        </div>
                        {/* Password input */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                className="rounded-md px-2"
                                required
                                onChange={handleInputChange} />
                        </div> 
                        <button className="bg-black text-white text-xl p-2 rounded-md">Log in</button>
                    </form>   
                    <h6 className="italic text-xs mt-3 px-3">Need an account? <Link to="/signup"><b>Sign Up</b></Link> </h6>
                </div>
            </div>  
            </div> 
        </>
    )
}