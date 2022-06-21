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
import ReactTooltip from 'react-tooltip';


export default function Converter(){
    const [settings, setSettings] = useState({
    });
    const [fileText, setFileText] = useState("");
    const [displayText, setDisplayText] = useState();

    //load user settings upon page loading
    // useEffect(() => {
    //      getSettings();
    // }, [])

    

    const getSettings = async () => {
        try{
            let token = localStorage.getItem("token");
            const {data} = await axios('/api/defaultSettings',{
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                },
            })
        setSettings(data);
        
        } catch (err){
            console.log(err)
        }
    }

    // const putSettings = async () => {

    // }



    

    const fetchConvertedText = async (e) => {
        e.preventDefault();
        
        try{
            const { data } = await axios('/api/convert', {
                method: "POST",
                data: {
                    fixation: 1,
                    saccade: 10,
                    content: `${fileText}`
                }
            })
            console.log(data);
            const parsed = parse(data);
            setDisplayText(parsed)
        } catch (err){
            console.log(err)
        }
    }

{/*Handle Changes*/}

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSettings({...settings, [name]: value})
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            setFileText(e.target.result);
            console.log(e.target.result)
        };
        reader.readAsText(file);
    }

    return(
        <>
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            <div className="w-5/6 h-full bg-slate-50 m-auto shadow-2xl">
               {/* upload form */}
                <form className="bg-white w-full flex justify-center py-2 border">
                    <label className=" p-2">Attach Document (must be .txt)
                        <input onChange={handleFileChange} accept=".txt" className="border rounded-md border-black mx-2" type="file"/>
                    </label>
                    <button onClick={fetchConvertedText} className="bg-black rounded-md text-white px-4 py-2">Convert</button>
                </form>

                {/* Settings */}
                <div className="w-full h-12 flex bg-black rounded-md justify-evenly items-center px-2">
                    <h4 className="font-bold text-1xl text-white">Settings</h4>
                    <div>
                        <label className="text-white">Font Color
                            <input 
                                onChange={handleInputChange}
                                className="w-10 ml-2"
                                name="font_color"
                                value={settings.font_color}
                                type="color"
                            />
                        </label>
                    </div>
                    <div className="">
                        <label className="m-2 text-white">Background Color
                            <input 
                                onChange={handleInputChange}
                                className="w-10 ml-2"
                                name="background_color"
                                value={settings.background_color}
                                type="color" 
                            />
                        </label>
                    </div>
                    <div>
                        <label className="m-2 text-white">Font Size
                            <input 
                                onChange={handleInputChange}
                                className="w-10 ml-2"
                                name="font_size"
                                value={settings.font_size}
                                min="1"
                                type="number"
                                />
                        </label>
                    </div>
                    <div>
                        <label className="m-2 text-white">Line Spacing
                            <input 
                                onChange={handleInputChange}
                                className="w-10 m-2"
                                name="line_spacing"
                                value={settings.line_spacing}
                                min="1"
                                type="number"
                                />
                        </label>
                    </div>
                    <div>
                    <a data-tip="Choose a value between 1 - 5.">
                        <label className="m-2 text-white">Fixation
                    <ReactTooltip place="top" type="dark" effect="float"/>
                            <input 
                                onChange={handleInputChange}
                                className="w-10 ml-2"
                                name="fixation"
                                value={settings.fixation}
                                type="number"
                                min="1"
                                max="5"
                            />
                        </label>
                    </a>
                    </div>
                    <div>
                        <label className="m-2 text-white">Saccade
                            <input 
                                onChange={handleInputChange}
                                className="w-10"
                                name="saccade"
                                value={settings.saccade}
                                type="number"
                            />
                        </label>
                    </div>
                </div>

                {/* converted text */}
                <div className="w-5/6 h-screen m-auto bg-yellow-50 overflow-scroll">
                    <p className='my-5'>{displayText}</p>
                </div>
                {/* Save Document Form */}
                <form className="bg-white w-full flex justify-evenly py-2 border">
                    <label className="w-1/6 py-2">Document Name</label>
                    <input className="w-3/6 border rounded-md border-black"></input>
                    <button className="bg-black rounded-md text-white px-4 py-2">Save Document</button>
                </form>
                <div className="bg-zinc-900 text-white rounded-md">
                    <details>
                        <summary>Need help?</summary>
                        <p>Upload a .txt file to load text into the converter. You can adjust your 
                            text settings using the settings bar found just above the text. To save a document to My Documents, enter a name and click "Save Document."
                        </p>
                    </details>
                </div>
               
            </div>
           
        </>
    )
}

