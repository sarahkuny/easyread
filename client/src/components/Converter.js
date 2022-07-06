import axios from "axios";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Header from "./Header";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import Footer from "./Footer";
import TextForm from "./TextForm";
import SaveDocForm from "./SaveDocForm";
import DisplayedText from "./DisplayedText";
import SettingsPanel from "./SettingsPanel";

export default function Converter() {
  const [settings, setSettings] = useState({
    font_size: "",
    font_color: "",
    background_color: "",
    line_spacing: "",
  });
  const [displayText, setdisplayText] = useState("");
  const [convertedText, setConvertedText] = useState();
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

  

  const fetchConvertedText = async (e) => {
    setLoading(true);
    try {
      const { data } = await axios("/api/convert", {
        method: "POST",
        data: {
          fixation: 1,
          saccade: 10,
          content: `${displayText}`,
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

  

  const toggleText = async (e) => {
    e.preventDefault();
    if (!convertedText) await fetchConvertedText();
    setToggle(!toggle);
  };



  const handleError =  (message) => {
    setErrorMessage(message);
    setError(true);
  }
  const handleSuccess = () => {
    setSuccess(true);
  }

  const setText = (e) => {
    setdisplayText(e.target.result);
  }

 

  const toggleMode = () => {
    setDarkMode(!darkMode)
  }
  

  return (
    
      <div style = {(darkMode ? darkStyles : lightStyles)}>
      <Header darkMode={darkMode} />
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
        <TextForm 
          darkMode={darkMode} 
          handleError={(message) => handleError(message)} 
          handleSetText={(e) => setText(e)}
          toggleText={(e) => toggleText(e)}
          toggle={toggle}/>

        <SettingsPanel 
          darkMode={darkMode}
          settings={settings}
          setSettings={(newSettings) => setSettings(newSettings)}
          toggleMode={toggleMode}
          />

        <DisplayedText 
          settings={settings}
          toggle={toggle}
          displayText={displayText}
          convertedText={convertedText} />

      </div>

        <SaveDocForm 
          darkMode={darkMode} 
          displayText={displayText}
          handleError={(message) => handleError(message)}
          handleSuccess={handleSuccess}/>

       <Footer />
      </div>
    
  );
}
