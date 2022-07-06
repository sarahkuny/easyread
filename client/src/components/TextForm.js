import { useState } from 'react';

export default function TextForm({darkMode, handleError, handleSetText, toggleText, toggle}) {
    const [inputToggle, setInputToggle] = useState(true);
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          if (!e.target.result){
            handleError({
              title: "Document Empty",
              message: "Your file does not contain any text. Please try again with a different file."
            });
          }
          handleSetText(e)
        };
        reader.readAsText(file);
      };

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

    const toggleInput = (e) => {
    e.preventDefault();
    setInputToggle(!inputToggle)
    }
    return(
        <form className="w-full flex flex-col lg:flex-row justify-center py-2 border rounded "
              style={(darkMode ? formStyles.dark : formStyles.light)}>
            {inputToggle ? 
              <input
                onChange={handleFileChange}
                accept=".txt"
                className="rounded-md border bg-white max-w-[300px] md:max-w-none lg:mx-2"
                type="file"
                require
              /> : 
              <textarea 
                     className=" 
                     
                     resize
                     px-3
                     py-1.5
                     text-base
                     font-normal
                     text-gray-700
                     bg-white bg-clip-padding
                     border border-solid border-gray-300
                     rounded
                     transition
                     ease-in-out
                     m-1
                     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                     rows="3"
      placeholder="Enter text here"/>
            }
            <button className="text-center p-2 bg-black text-white rounded h-12"
                  onClick={toggleInput}>
            {inputToggle ? "Click Here to Enter Text Manually":"Click Here to Attach Text Document"}</button>
          <button
            onClick={toggleText}
            className=" rounded-md h-12 px-4 py-2 mx-2 hover:bg-blue-300 hover:text-black"
            style={(darkMode ? formStyles.button.dark : formStyles.button.light)}
          >
            {toggle ? "Turn on Bionic Reading" : "Turn off Bionic Reading"}
          </button>
        </form>
    )
}