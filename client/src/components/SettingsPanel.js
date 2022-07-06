import { useState } from "react";
import axios from "axios";
import Toggle from "./Toggle";
import { Icon } from '@iconify/react';

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
          backgroundColor: "#3f3f46",
          color: "white"
        },
        light:{
          backgroundColor: "black",
          color:"white"
        }
      },
      save: {
        dark: {
          backgroundColor: "#18181b",
          color: 'white',
          border: 'grey'
        },
        light: {
          backgroundColor: "#f8fafc",
          color: 'black',
        },
      }
    }

    return (
        <div className="w-full lg:h-12 flex rounded-md justify-evenly items-center px-2"
             style={(darkMode ? settingsStyles.dark : settingsStyles.light)}
        >
          <h4 className={showSettings ? " text-white font-bold":"font-bold  text-white text-center flex flex-col items-center justify-center"}
              onClick={() => setShowSettings(!showSettings)}
          >{showSettings ? <Icon icon="fa-solid:chevron-up" color="white" />:""}Settings{showSettings ? "":<Icon icon="fa-solid:chevron-down" color="white" />}</h4>
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
                className="md:w-14 w-12 ml-1 text-black px-1"
                name="line_spacing"
                value={settings.line_spacing}
                min="1"
                type="number"
              />
            </label>
          </div>
          <div
              onClick={toggleText}
              className="rounded-md m-2  text-sm   hover:bg-blue-300 hover:text-black"
              style={(darkMode ? formStyles.button.dark : formStyles.button.light)}
            >
              {toggle ? "Turn on Bionic Reading" : "Turn off Bionic Reading"}
            </div>
          <div className="flex items-center">
            <label className="m-2 text-white">
              Dark Mode
            </label>
            <Toggle toggleDarkMode={toggleMode}/>
          </div>
          </div>
        </div>
    )
}