import { useState } from "react";
import axios from "axios";

export default function SaveDocForm({darkMode, displayText, handleError, handleSuccess}) {
    const [documentName, setDocumentName] = useState();

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

    const saveDocument = async (e) => {
        e.preventDefault();
        try {
          let token=localStorage.getItem("token");
          await axios("/api/media", {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
            },
            data: {
              name: `${documentName}`,
              content: `${displayText}`,
            },
          });
          setDocumentName("");
          handleSuccess();
        } catch (err) {
           handleError({
            title: "Cannot Save Document",
            message: "Please log in or try again later."
          });
        
        }
      };

      const handleDocumentNameChange = (e) => {
        const name = e.target.value;
        setDocumentName(name);
      };

    return (
        <form
          onSubmit={saveDocument}
          className="w-5/6 m-auto flex flex-col lg:flex-row justify-center py-2 border rounded mb-2"
          style={(darkMode ? formStyles.dark : formStyles.light)}
        >
            <label className="text-center py-2">Document Title</label>
            <input
                onChange={handleDocumentNameChange}
                className="border-black rounded-md border h-10 pl-1 lg:w-3/6 lg:mx-2 text-black"
                value={documentName}
                required
              />
            <button className="rounded-md bg-black text-white px-4 py-2 m-2 lg:my-0 hover:bg-blue-300 hover:text-black">
              Save Document
            </button>
        </form>
    )
}