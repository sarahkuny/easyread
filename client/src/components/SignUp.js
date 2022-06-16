//Header
//Sign Up Form
//link to login component (send to parent)
import React, {useState} from 'react';

export default function SignUp(){
    const [fullName, setFullName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <>
            <h1 className="text-5xl ml-3 my-3 font-louisgeorge">easy<b>Read</b></h1>      
            <div className="">
                <h3>Fill in your personal details below to create your account.</h3>
                <form className="flex flex-col">
                    {/* Name */}
                    <label>Full Name</label>
                    <input 
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={fullName}
                        className=""
                        required />
                    {/* Username input */}
                    <label>Username</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        className=""
                        required />
                    {/* Password input */}
                    <label>Full Name</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        className=""
                        required />
                </form>
                <h6 className="italic">Already have an account? <b><a>Log In</a></b></h6>
            </div>  
        </>
    )
}