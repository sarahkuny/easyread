//Header
//Sign Up Form
//link to login component (send to parent)
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';

export default function SignUp(){
    const [fullName, setFullName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [readingFact, setReadingFact] = useState("Dyslexia is though to affect 1 in 5 people. Bionic Reading makes text accessible for all. The eye is guided through text by emphasizing the most concise parts of the word. ");

    useEffect(() => {
        const fetchConvertedText = async () => {
            try{
                const { data } = await axios('/api/convert', {
                    method: "POST",
                    data: {
                        fixation: 1,
                        saccade: 10,
                        content: `Dyslexia is thought to affect 1 in 5 people. Bionic Reading makes text accessible for all. The eye is guided through text by emphasizing the most concise parts of the word.`
                    }
                })
                const parsed = parse(data);
                setReadingFact(parsed)
            } catch (err){
                console.log(err)
            }
        }
        fetchConvertedText();
    }, [])

    return (
        <>
            <h1 className="text-5xl ml-3 my-3 font-louisgeorge">easy<b>Read</b></h1>
            <div className="bg-zinc-900">     
            <div className="flex flex-col md:flex-row space-between w-4/6 m-auto h-screen bg-zinc-900">
                <div className="w-80 h-3/6 px-4 m-auto flex flex-col justify-center text-white">
                    <p>{readingFact}</p>
                </div>
                <div className="shadow-lg p-5 m-auto bg-slate-100 rounded-md flex flex-col justify-between content-center max-h-380 min-h-content">
                    <h3 className="font-bold">Fill in your personal details below to create your account.</h3>
                    <form>
                        {/* Name */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Full Name</label>
                            <input 
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={fullName}
                                className="rounded-md"
                                required />
                        </div>
                        
                        {/* Username input */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Username</label>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                className="rounded-md"
                                required />
                        </div>
                        {/* Password input */}
                        <div className="flex flex-col p-3">
                            <label className="text-s">Password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                className="rounded-md"
                                required />
                        </div> 
                    </form>   
                    <h6 className="italic text-xs pl-3">Already have an account? <Link to="/login"><b>Log In</b></Link> </h6>
                </div>
            </div>  
            </div> 
        </>
    )
}