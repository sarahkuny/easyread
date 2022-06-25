//Header - go to documents, sign out button
//Document upload form
//Settings
//Converted Text
//Save Document Form
//Help button with popup

import axios from 'axios';
import React, {useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Header from './Header';
import LoadingModal from './LoadingModal';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';

export default function Converter(){
    const [settings, setSettings] = useState({font_size: "16",
                                              font_color: "#000000",
                                              background_color: "#fdfbdd",
                                              line_spacing: 1.5});
    const [fileText, setFileText] = useState("");
    const [convertedText, setConvertedText] = useState();
    const [documentName, setDocumentName] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [toggle, setToggle] = useState(true);

//load user settings upon page loading
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token !== null){
            getSettings();
        };
       
    }, [])
    
    
    

    const getSettings = async () => {
        try{
            let token = localStorage.getItem("token");
            const {data} = await axios('/api/defaultSettings',{
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                },
            })
        setSettings(data[0]);
        
        } catch (err){
            console.log(err)
        }
    }

    // const putSettings = async () => {

    // }

    


    const fetchConvertedText = async (e) => {
        setLoading(true);
        try{
            const { data } = await axios('/api/convert', {
                method: "POST",
                data: {
                    fixation: 1,
                    saccade: 10,
                    content: `${fileText}`
                }
            })
            const parsed = parse(data);
            setConvertedText(parsed);
            setLoading(false);
        } catch (err){
            setLoading(false);
            setErrorMessage({title: "Cannot Convert Document",
                             message: "Please make sure you've attached a document or try again later."});
            setError(true);
        }
    }

    const saveDocument = async (e) => {
        e.preventDefault();
        //if no text uploaded, set error
        let token = localStorage.getItem("token");
        if (!token){
            setErrorMessage({title: "Cannot Save Document",
                             message: "You must be logged in to save documents."})
            setError(true);
        }
        try{
            await axios('/api/media',{
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                data: {
                    name: `${documentName}`,
                    content: `${fileText}`
                }
            });
            setDocumentName("");
            setSuccess(true)
        } catch(err) {
            setErrorMessage({title: "Cannot Save Document",
                             message: "Please check your connection or try again later."})
            setError(true);
        }
    }

    const toggleText = async (e) =>{
        e.preventDefault();
        if (!convertedText) await fetchConvertedText();
        setToggle(!toggle)
    }

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSettings({...settings, [name]: value})
    }

    const handleFileChange =async (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            setFileText(e.target.result);
            console.log("set")
        };
        reader.readAsText(file);
        
    }

    const handleDocumentNameChange = (e) => {
        const name = e.target.value;
        setDocumentName(name)
    }

    return(
        <>
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            {loading ? <LoadingModal /> : ""}
            <div className="w-5/6 h-full bg-slate-50 m-auto shadow-2xl">
            {error ? <ErrorModal closeError={() => setError(false)} message={errorMessage.message} title={errorMessage.title} />: ""}
            {success  ? <SuccessModal closeMessage={() => setSuccess(false)} title="Success!" message="Document saved successfully."/> : ""}
               {/* upload form */}
                <form className="bg-white w-full flex justify-center py-2 border">
                    <label className=" p-2">Attach Document (must be .txt)
                        <input onChange={handleFileChange} accept=".txt" className="border rounded-md border-black mx-2" type="file" require/>
                    </label>
                    <button onClick={toggleText} className="bg-black rounded-md text-white px-4 py-2 mx-2 hover:bg-sky-500">{toggle ? "Turn on Bionic Reading" : "Turn off Bionic Reading"}</button>
                </form>
                
                {/* Settings */}
                <div className="w-full h-12 flex bg-black rounded-md justify-evenly items-center px-2">
                    <h4 className="font-bold text-1xl text-white">Settings</h4>
                    <div>
                        <label className="text-white">Font Color
                            <input 
                                onChange={handleInputChange}
                                className="w-14 ml-2"
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
                                className="w-14 ml-2"
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
                                className="w-14 ml-2 text-black px-1"
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
                                className="w-14 m-2 text-black px-1"
                                name="line_spacing"
                                value={settings.line_spacing}
                                min="1"
                                type="number"
                                />
                        </label>
                    </div>
                    
                </div>

                {/* converted text */}
                <div 
                className={"w-5/6 h-screen m-auto bg-yellow-50 overflow-scroll" }
                >
                    <p style={{ backgroundColor: `${settings.background_color}`, color: `${settings.font_color}`, fontSize: `${settings.font_size}px`, lineHeight: `${settings.line_spacing}` }}>{toggle ? fileText : convertedText}</p>
                </div>
                {/* Save Document Form */}
                <form onSubmit={saveDocument} className="bg-white w-full flex justify-center py-2 border">
                    <label className="py-2 ">Document Title</label>
                        <input 
                            onChange={handleDocumentNameChange} 
                            className="mx-4 px-2 w-3/6 border rounded-md border-black"
                            value={documentName}
                            required />

                    <button className="bg-black text-xl rounded-md text-white mx-5 p-2 hover:bg-sky-500">Save Document</button>
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

