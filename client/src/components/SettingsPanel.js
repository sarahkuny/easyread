import { useState } from "react";
import axios from "axios";
import Toggle from "./Toggle";
import { Icon } from '@iconify/react';
import BionicReadingToggle from "./BionicReadingToggle";

export default function SettingsPanel({darkMode, settings, setSettings, toggleMode, toggleText, toggle}) {
    const [showSettings, setShowSettings] = useState(false);

    const settingsStyles = {
        dark: {
          backgroundColor: "#3f3f46"
        },
        light: {
          backgroundColor: "black"
        }
      }

    const handleInputChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        await saveSettings(e);
        setSettings({ ...settings, [name]: value });
    
    };

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

  

    return (
        <div className="w-full lg:h-14 flex rounded-md justify-evenly items-center px-2"
             style={(darkMode ? settingsStyles.dark : settingsStyles.light)}
        >
          <h4 className={showSettings ? 
              "text-white font-bold flex flex-col items-center"
              :
              "font-bold  text-white text-center flex flex-col items-center justify-center"}
              onClick={() => setShowSettings(!showSettings)}>
            {showSettings ? <Icon icon="fa-solid:chevron-up" color="white" />:""}
            Settings
            {showSettings ? "":<Icon icon="fa-solid:chevron-down" color="white" />}</h4>
{/*           
          <div className={showSettings ? "flex flex-col md:flex-row md:items-center justify-evenly text-xs lg:text-sm mt-1": "hidden"}> */}
          <div className={showSettings ? "grid grid-cols-4 md:justify-between md:grid-cols-12 items-center text-xs md:text-sm  md:w-5/6" : "hidden"}>
            <label className="text-white">
              Font Color
            </label>
            <input
                onChange={handleInputChange}
                className="w-10  align-middle"
                name="font_color"
                value={settings.font_color}
                type="color"
              />
            <label className="text-white">
              Page Color
            </label>
            <input
                onChange={handleInputChange}
                className="w-10 align-middle  mt-1"
                name="background_color"
                value={settings.background_color}
                type="color"
              />
            <label className="text-white">
              Font Size
             
            </label>
            <input
                onChange={handleInputChange}
                className="w-10 text-black px-1  h-7 mt-1"
                name="font_size"
                value={settings.font_size}
                min="1"
                type="number"
              />
            <label className="text-white">
              Line Spacing
              
            </label>
            <input
                onChange={handleInputChange}
                className="w-10 text-black px-1 h-7 mt-1"
                name="line_spacing"
                value={settings.line_spacing}
                min="1"
                type="number"
              />
            <label className="text-white my-1">
              Bionic Reading
            </label>
            <BionicReadingToggle darkMode={darkMode} toggleText={(e) => toggleText(e)}/>
          
            <label className="text-white my-1 ml-1">
              Dark Mode
            </label>
            <Toggle toggleDarkMode={toggleMode}/>
          
          </div>
        </div>
    )
}