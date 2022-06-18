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
    const [fontSize, setFontSize] = useState(14);
    const [fontColor, setFontColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#FFFDD0");
    const [fixation, setFixation] = useState(1);
    const [saccade, setSaccade] = useState(10);
    const [lineSpacing, setLineSpacing] = useState(1.5);
    const [displayText, setDisplayText] = useState();

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
            setDisplayText(parsed)
        } catch (err){
            console.log(err)
        }
    }

    return(
        <>
        
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            <div className="w-5/6 h-full bg-slate-50 m-auto shadow-2xl">
               {/* upload form */}
                <form className="bg-white w-full flex justify-evenly py-2 border">
                    <label className="w-1/6 py-2">Attach Document</label>
                    <input className="w-3/6 border rounded-md border-black"></input>
                    <button onClick={fetchConvertedText()} className="bg-black rounded-md text-white px-4 py-2">Convert</button>
                </form>

                {/* Settings */}
                <div className="w-full h-12 flex bg-black rounded-md justify-evenly items-center px-2">
                    <h4 className="font-bold text-1xl text-white">Settings</h4>
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
                    <a data-tip="Choose a value between 1 - 5.">
                        <label className="m-2 text-white">Fixation</label>
                    </a>
                    <ReactTooltip place="top" type="dark" effect="float"/>
                            <input 
                            className="w-10"
                            value={fixation}
                            type="number"
                            min="1"
                            max="5"
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
                <div className="w-5/6 h-screen m-auto bg-yellow-50 overflow-scroll">
                    {displayText}
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