import { useEffect, useState } from 'react';

export default function TextForm({darkMode, handleError, handleSetText, toggleText, toggle}) {
    const [inputToggle, setInputToggle] = useState(true);
    const [textInput, setTextInput] = useState("")
    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //   if (window.innerWidth < 821){
    //     setIsMobile(true);
    //   } else {
    //     setIsMobile(false)
    //   }
    // }, [])

    // const updateMedia = () => {
    //   if (window.innerWidth < 821){
    //     setIsMobile(true)
    //   } else {
    //     setIsMobile(false)
    //   }
    // }
    // window.addEventListener("resize", updateMedia)

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
        <form className="w-full flex flex-col lg:flex-row justify-center items-center py-2 border rounded "
              style={(darkMode ? formStyles.dark : formStyles.light)}>
            {inputToggle ? 
            <div className="ml-2 mb-2 border border-solid rounded">
              <label className="pl-1 text-zinc-800 text-sm">Upload form</label>
              <input
                onChange={handleFileChange}
                accept=".txt"
                className="rounded-md border w-full bg-white h-8 "
                type="file"
                require
              /> 
              </div>
              : 
              <textarea 
                     className=" 
                     w-full
                     m-2
                     lg:w-5/6
                     resize
                     px-1
                     py-1.5
                     text-base
                     font-normal
                     text-gray-700
                     bg-white bg-clip-padding
                     border border-solid border-gray-300
                     rounded
                     transition
                     ease-in-out
                     
                     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                     rows="3"
      placeholder="Enter text here"/>
            }
            
              <button className="text-center p-2 mx-2 bg-black text-white rounded text-sm lg:text-md"
                    onClick={toggleInput}>
              {inputToggle ? "Enter Text Manually":"Attach Text Document"}</button>
            
       
           
        </form>
    )
}