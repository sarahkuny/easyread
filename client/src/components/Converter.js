//Header - go to documents, sign out button
//Document upload form
//Settings
//Converted Text
//Save Document Form
//Help button with popup
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import Header from './Header';


export default function Converter(){

    return(
        <>
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            <div className="w-5/6 h-screen bg-slate-50 m-auto">
                <form className="bg-slate-100 w-full flex justify-evenly py-2 border">
                    <label className="w-1/6 py-2">Attach Document</label>
                    <input className="w-3/6"></input>
                    <button className="bg-black rounded-md text-white px-4 py-2">Convert</button>
                </form>
            </div>
        </>
    )
}