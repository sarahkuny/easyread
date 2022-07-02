
import axios from "axios";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Header from "./Header";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import Toggle from "./Toggle";

export default function Converter() {
  const [settings, setSettings] = useState({
    font_size: "",
    font_color: "",
    background_color: "",
    line_spacing: "",
  });
  const [fileText, setFileText] = useState("");
  const [convertedText, setConvertedText] = useState();
  const [documentName, setDocumentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
  }, []);


  const getSettings = async () => {
    try {
      let token = localStorage.getItem("token");
      const { data } = await axios("/api/defaultSettings", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSettings(data[0]);
    } catch (err) {
      setSettings({
        font_size: "16",
        font_color: "#000000",
        background_color: "#fdfbdd",
        line_spacing: 1.5
      })
    }
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

  const fetchConvertedText = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios("/api/convert", {
        method: "POST",
        data: {
          fixation: 1,
          saccade: 10,
          content: `${fileText}`,
        },
      });
      const parsed = parse(data);
      setConvertedText(parsed);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMessage({
        title: "Cannot Convert Document",
        message:
          "Please make sure you've attached a document or try again later.",
      });
      setError(true);
    }
  };

  const saveDocument = async (e) => {
    e.preventDefault();
    //if no text uploaded, set error
    let token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage({
        title: "Cannot Save Document",
        message: "You must be logged in to save documents.",
      });
      setError(true);
    }
    try {
      await axios("/api/media", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          name: `${documentName}`,
          content: `${fileText}`,
        },
      });
      setDocumentName("");
      setSuccess(true);
    } catch (err) {
      setErrorMessage({
        title: "Cannot Save Document",
        message: "Please log in or try again later.",
      });
      setError(true);
    }
  };

  const toggleText = async (e) => {
    e.preventDefault();
    if (!convertedText) await fetchConvertedText();
    setToggle(!toggle);
  };

  const handleInputChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    await saveSettings(e);
    setSettings({ ...settings, [name]: value });
    
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      if (!e.target.result){
        setErrorMessage({
          title: "Document Empty",
          message: "Your file does not contain any text. Please try again with a different file."
        });
        setError(true);
      }
      setFileText(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleDocumentNameChange = (e) => {
    const name = e.target.value;
    setDocumentName(name);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    
      <div style = {(darkMode ? darkStyles : lightStyles)}>
      <Header darkMode={darkMode}/>
      {loading ? <LoadingModal /> : ""}
      <div className="w-5/6 h-full bg-zinc-900  m-auto "
      style={(darkMode ? darkStyles : lightStyles)}
      >
        {error ? (
          <ErrorModal
            closeError={() => setError(false)}
            message={errorMessage.message}
            title={errorMessage.title}
          />
        ) : (
          ""
        )}
        {success ? (
          <SuccessModal
            closeMessage={() => setSuccess(false)}
            title="Success!"
            message="Document saved successfully."
          />
        ) : (
          ""
        )}
        {/* upload form */}
        <form className="w-full flex justify-center py-2 border rounded "
              style={(darkMode ? formStyles.dark : formStyles.light)}>
          <label className=" p-2">
            Attach Document (must be .txt)
            <input
              onChange={handleFileChange}
              accept=".txt"
              className="border rounded-md border mx-2"
              type="file"
              require
            />
          </label>
          <button
            onClick={toggleText}
            className=" rounded-md  px-4 py-2 mx-2 hover:bg-blue-300 hover:text-black"
            style={(darkMode ? formStyles.button.dark : formStyles.button.light)}
          >
            {toggle ? "Turn on Bionic Reading" : "Turn off Bionic Reading"}
          </button>
        </form>

        {/* Settings */}
        <div className="w-full h-12 flex  rounded-md justify-evenly items-center px-2"
             style={(darkMode ? settingsStyles.dark : settingsStyles.light)}
        >
          <h4 className="font-bold text-1xl text-white">Settings</h4>
          <div>
            <label className="text-white">
              Font Color
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
            <label className="m-2 text-white">
              Background Color
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
            <label className="m-2 text-white">
              Font Size
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
            <label className="m-2 text-white">
              Line Spacing
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
          <div className="flex items-center">
            <label className="m-2 text-white">
              Dark Mode
            </label>
            <Toggle toggleDarkMode={toggleMode}/>
          </div>
        </div>

        {/* converted text */}
        <div className={"w-5/6 h-screen m-auto overflow-scroll"}
        style={{
          backgroundColor: `${settings.background_color}`,
          color: `${settings.font_color}`,
          fontSize: `${settings.font_size}px`,
          lineHeight: `${settings.line_spacing}`,
          padding: "0 5rem",
          textAlign: "justify"
        }}>
          <p>
            {toggle ? fileText : convertedText}
          </p>
        </div>
        {/* Save Document Form */}
        <form
          onSubmit={saveDocument}
          className="bg-white w-full flex justify-center py-2 border"
          style={(darkMode ? formStyles.dark : formStyles.light)}
        >
          <label className="py-2 ">Document Title</label>
          <input
            onChange={handleDocumentNameChange}
            className="mx-4 px-2 w-3/6 border rounded-md border-black"
            value={documentName}
            required
          />

          <button className="bg-black text-xl rounded-md text-white mx-5 p-2 hover:bg-sky-500">
            Save Document
          </button>
        </form>
        {/* Need Help */}
        <div className="bg-zinc-900 text-white rounded-md">
          <details>
            <summary>Need help?</summary>
            <p>
              Upload a .txt file to load text into the converter. You can adjust
              your text settings using the settings bar found just above the
              text. To save a document to My Documents, enter a name and click
              "Save Document."
            </p>
          </details>
        </div>
      </div>
      </div>
    
  );
}
