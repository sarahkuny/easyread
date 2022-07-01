
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import Header from './Header';
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';

export default function SavedDocConverter(){
    const [settings, setSettings] = useState({font_size: "16",
                                              font_color: "#000000",
                                              background_color: "#fdfbdd",
                                              line_spacing: 1.5});
    const [convertedText, setConvertedText] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
//load user settings upon page loading
    useEffect(() => {
       getSettings();
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

    const saveSettings = async (e) => {
        try{
          let token = localStorage.getItem("token");
          const name = e.target.name;
          const value = e.target.value;
          await axios("/api/defaultSettings", {
            method: "PUT",
            headers: {
              authorization: `Bearer ${token}`
            },
            data: 
              { ...settings, [name]: value }
            
          })
        } catch (err) {
          console.log(err)
        }    
      }

    const fetchConvertedText = async (e) => {
        setLoading(true);
        try{
            const { data } = await axios('/api/convert', {
                method: "POST",
                data: {
                    fixation: 1,
                    saccade: 10,
                    content: `${location.state.content}`
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

    const toggleText = async (e) =>{
        e.preventDefault();
        if (!convertedText) await fetchConvertedText();
        setToggle(!toggle)
    }

    const handleInputChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        await saveSettings(e);
        setSettings({ ...settings, [name]: value });
    }

    return(
        <>
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            {loading ? <LoadingModal /> : ""}
            {error ? <ErrorModal closeError={() => setError(false)} message={errorMessage.message} title={errorMessage.title} />: ""}

            <div className="w-5/6 h-full bg-slate-50 m-auto shadow-2xl">
            <form className="bg-white w-full flex justify-center py-2 border">
                   
                    <button onClick={() => navigate('/convert')} className="bg-black rounded-md text-white px-4 py-2 hover:bg-sky-500">Upload a Different Document</button>
                    <button onClick={toggleText} className="bg-black rounded-md text-white px-4 py-2 mx-2 hover:bg-sky-500">{toggle ? "Turn off Bionic Reading" : "Turn on Bionic Reading"}</button>
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
                className={"w-5/6 h-screen m-auto overflow-scroll" }
                >
                    <p style={{ backgroundColor: `${settings.background_color}`, color: `${settings.font_color}`, fontSize: `${settings.font_size}px`, lineHeight: `${settings.line_spacing}` }}>{toggle ? convertedText : location.state.content}</p>
                </div>
                {/* Save Document Form */}
                
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

