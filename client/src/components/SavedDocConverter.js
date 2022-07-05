
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import Header from './Header';
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';
import Toggle from './Toggle';
import { Icon } from '@iconify/react';
import Footer from './Footer';

export default function SavedDocConverter( ){
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
    const [darkMode, setDarkMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false)

  const darkStyles = {
    backgroundColor: "#18181b",
    color: 'white',
    boxShadow: '0 0 50px -12px rgb(200 200 200 / 0.25)'
  }
  const lightStyles = {
    backgroundColor: "#f8fafc",
    color: 'black',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  }
  
  const formStyles = {
    dark: {
      backgroundColor: "#18181b",
      color: 'white',
      border: 'grey'
    },
    light: {
      backgroundColor: "#f8fafc",
      color: 'black',
    },
    button: {
      dark:{
        backgroundColor: "white",
        color: "black"
      },
      light:{
        backgroundColor: "black",
        color:"white"
      }
    }
  }

  const settingsStyles = {
    dark: {
      backgroundColor: "#3f3f46"
    },
    light: {
      backgroundColor: "black"
    }
  }
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
    const toggleMode = () => {
        setDarkMode(!darkMode)
      }

    return(
        <div style={(darkMode ? darkStyles : lightStyles)}>
            <Header darkMode={darkMode} />
            {loading ? <LoadingModal /> : ""}
            {error ? <ErrorModal closeError={() => setError(false)} message={errorMessage.message} title={errorMessage.title} />: ""}

            <div className="w-5/6 h-full m-auto mb-2"
                style={(darkMode ? darkStyles : lightStyles)}
            >           
                <form className=" w-full flex flex-col  lg:flex-row justify-center py-2 border rounded"
                      style={(darkMode ? formStyles.dark : formStyles.light)}
                >
                    <button onClick={() => navigate('/convert')} 
                            className="rounded-md mb-2 lg:mb-0  px-4 py-2 hover:bg-sky-500"
                            style={(darkMode ? formStyles.button.dark : formStyles.button.light)}
                    >
                        Upload a Different Document
                    </button>
                    <button onClick={toggleText} 
                            className=" rounded-md mb-2 px-4 py-2  lg:mb-0 lg:ml-2 hover:bg-sky-500"
                            style={(darkMode ? formStyles.button.dark : formStyles.button.light)}
                    >
                        {toggle ? "Turn off Bionic Reading" : "Turn on Bionic Reading"}
                    </button>
                </form>
                    {/* Settings */}
        <div className="w-full lg:h-12 flex rounded-md justify-evenly items-center px-2"
             style={(darkMode ? settingsStyles.dark : settingsStyles.light)}
        >
          <h4 className={showSettings ? " text-white font-bold":"font-bold text-xl text-white text-center flex flex-col items-center justify-center"}
              onClick={() => setShowSettings(!showSettings)}
          >{showSettings ? <Icon  icon="fa-solid:chevron-up" color="white" />:""}Settings{showSettings ? "":<Icon icon="fa-solid:chevron-down" color="white" />}</h4>
          <div className={showSettings ? "flex flex-col md:flex-row justify-evenly md:items-center text-sm mt-1": "hidden"}>
            <div>
            <label className="m-2 text-white">
              Font Color
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
            <label className="m-2 text-white">
              Background Color
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
            <label className="m-2 text-white">
              Font Size
              <input
                onChange={handleInputChange}
                className="md:w-14 w-12 my-1 md:my-0 ml-1 text-black px-1 "
                name="font_size"
                value={settings.font_size}
                min="1"
                type="number"
              />
            </label>
          </div>
          <div>
            <label className="m-2 text-white">
              Line Spacing
              <input
                onChange={handleInputChange}
                className="md:w-14 w-12 ml-1 text-black px-1 "
                name="line_spacing"
                value={settings.line_spacing}
                min="1"
                type="number"
              />
            </label>
          </div>
          <div className="flex items-center">
            <label className="m-2 text-white">
              Dark Mode
            </label>
            <Toggle toggleDarkMode={toggleMode}/>
          </div>
          </div>
        </div>

                {/* converted text */}
                <div 
                className={"w-5/6 h-screen m-auto overflow-scroll" }
                >
                    <p style={{ backgroundColor: `${settings.background_color}`, color: `${settings.font_color}`, fontSize: `${settings.font_size}px`, lineHeight: `${settings.line_spacing}` }}>{toggle ? convertedText : location.state.content}</p>
                </div>
               
                
                
               
            </div>
            <Footer />
        </div>
    )
}

