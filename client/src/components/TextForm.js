import { useEffect, useState } from 'react';

export default function TextForm({darkMode, handleError, handleSetText, handleSetTextInput}) {
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

    const handleTextSubmit = (e) => {
      e.preventDefault();
      handleSetTextInput(textInput);
      
    }
    const handleTextChange = (e) => {
      setTextInput(e.target.value)
    }

    return(
        <div className="w-full flex flex-col lg:flex-row justify-center items-center py-2 border rounded "
              style={(darkMode ? formStyles.dark : formStyles.light)}>
            {inputToggle ? 
            <div className=" mb-2 border border-grey-300 bg-white rounded w-full">
             
              <input
                onChange={handleFileChange}
                accept=".txt"
                className="rounded-md border w-full bg-white h-8 "
                type="file"
                require
              /> 
              </div>
              : 
              <form className="w-full m-2 lg:w-5/6 border border-grey-300 bg-white"
                    onSubmit={handleTextSubmit}
             >
              <div className="flex flex-col items-center">
                <textarea 
                    onChange={handleTextChange}
                    className=" 
                    w-full
                    resize
                    px-1
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-50
                    rounded
                    transition
                    ease-in-out
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                rows="3"
                placeholder="Enter text here"
                value={textInput}/>
              <button  className="text-center py-1 my-1 mx-2 bg-black text-white rounded w-2/6">Submit</button>
              </div>
              </form>
              
            }
            
              <button className="text-center p-2 mx-2 bg-blue-400 text-white rounded text-sm lg:text-md"
                    onClick={toggleInput}>
              {inputToggle ? "Enter Text Manually":"Attach Text Document"}</button>
            
       
           
        </div>
    )
}