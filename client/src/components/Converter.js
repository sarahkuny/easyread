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
    const [fontSize, setFontSize] = useState(14);
    const [fontColor, setFontColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#FFFDD0");
    const [fixation, setFixation] = useState(1);
    const [saccade, setSaccade] = useState(10);
    const [lineSpacing, setLineSpacing] = useState(1.5)

    return(
        <>
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            <div className="w-5/6 h-screen bg-slate-50 m-auto ">
               
               {/* upload form */}
                <form className="bg-white w-full flex justify-evenly py-2 border">
                    <label className="w-1/6 py-2">Attach Document</label>
                    <input className="w-3/6 border rounded-md border-black"></input>
                    <button className="bg-black rounded-md text-white px-4 py-2">Convert</button>
                </form>

                {/* Settings */}
                <div className="w-full h-12 flex bg-black rounded-md justify-evenly items-center">
                    <h4 className="font-bold text-2xl text-white">Settings</h4>
                    <div>
                        <label className="m-2 text-white">Font Color</label>
                        <input 
                            className="w-10 outline-none border-transparent text-black"
                            value={fontColor}
                            type="color"
                        />
                    </div>
                    <div className="">
                        <label className="m-2 text-white">Background Color</label>
                        <input 
                            className="w-10"
                            value={bgColor}
                            type="color" 
                        />
                    </div>
                    <div>
                        <label className="m-2 text-white">Font Size</label>
                        <input 
                            className="w-10"
                            value={fontSize}
                            min="1"
                            type="number"
                            />
                    </div>
                    <div>
                        <label className="m-2 text-white">Line Spacing</label>
                        <input 
                            className="w-10"
                            value={lineSpacing}
                            min="1"
                            type="number"
                            />
                    </div>
                    <div>
                        <label className="m-2 text-white">Fixation</label>
                        <input 
                            className="w-10"
                            value={fixation}
                            type="number"
                        />
                    </div>
                    <div>
                        <label className="m-2 text-white">Saccade</label>
                        <input 
                            className="w-10"
                            value={saccade}
                            type="number"
                        />
                    </div>
                </div>

                {/* converted text */}


                <details>
                    <summary>Need help?</summary>
                    <p>Upload a .txt file to load text into the converter. You can adjust your 
                        text settings using the settings bar found just above the text.
                    </p>
                </details>
            </div>
           
        </>
    )
}