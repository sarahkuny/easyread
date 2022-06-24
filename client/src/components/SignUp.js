//Header
//Sign Up Form
//link to login component (send to parent)
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import img from "../assets/bionic-reading-signup.png"; 
import ErrorModal from "./ErrorModal";

export default function SignUp() {
    const [credentials, setCredentials] = useState({ first_name:"", last_name:"", username:"", password: ""});
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({...credentials, [name]:value})
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const username = credentials.username;
        const password = credentials.password;
        try{
            await axios("/api/users", {
                method: "POST",
                data: credentials
            });
            const { data } = await axios("/api/users/login", {
                method: "POST",
                data: {username: username, password: password}
            });
            localStorage.setItem("token", data);
            await addDefaultSettings();
            navigate('/convert');
        } catch (err){
            setError(true);
        }
    }

    const addDefaultSettings = async () => {
        let token = localStorage.getItem("token");
        try {
            await axios("/api/defaultSettings", {
                headers: {
                    authorization: `Bearer ${token}`
                },
                method: "POST",
                data: {
                    font_size: "16",
                    font_color: "#000000",
                    background_color: "#fdfbdd",
                    line_spacing: 1.5
                }
            })
        } catch (err) {
            console.log(error)
        }
    }
    
    return (
        <>
            {error ? <ErrorModal  closeError={() => setError(false)} 
                                  title="Account Creation Failed" 
                                  message="Please choose a different username." /> : ""}
            <Link to="/"><h1 className="text-5xl ml-3 my-6 font-louisgeorge">easy<b>Read</b></h1></Link>
            <div className="bg-zinc-900">     
            <div className="flex flex-col md:flex-row space-between lg:w-5/6 m-auto h-screen bg-zinc-900">
                <div className="w-96 h-3/6 m-auto flex flex-col justify-center text-white text-2xl">
                    <img src={img} alt="Dyslexia is thought to affect 1 in 5 people. Bionic Reading makes text accessible for all. The eye is guided through text by emphasizing the most concise parts of the word." />
                </div>
                <div className="shadow-lg p-5 m-auto bg-slate-100 rounded-md flex flex-col justify-between content-center max-h-380 min-h-content">
                    <h3 className="font-bold">Fill in your personal details below to create your account.</h3>
                    <form onSubmit={handleSignUp} className="flex flex-col">
                        {/* First Name */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">First Name</label>
                            <input 
                                onChange={handleInputChange}
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={credentials.first_name}
                                className="rounded-md px-2"
                                required />
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Last Name</label>
                            <input 
                                onChange={handleInputChange}
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={credentials.last_name}
                                className="rounded-md px-2"
                                required />
                        </div>
                        
                        {/* Username input */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Username</label>
                            <input 
                                onChange={handleInputChange}
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                className="rounded-md px-2"
                                required />
                        </div>
                        {/* Password input */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Password</label>
                            <input 
                                onChange={handleInputChange}
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                className="rounded-md px-2"
                                required />
                        </div> 
                        <button className="bg-black text-white text-xl p-2 rounded-md">Create Account</button>
                    </form>   
                    <h6 className="italic text-xs mt-3 px-3">Already have an account? <Link to="/login"><b>Log In</b></Link> </h6>
                </div>
            </div>  
            </div> 
        </>
    )
}
