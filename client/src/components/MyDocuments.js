//Header - go to converter, sign out
//Documents
//each row: document title, share (email popup), delete

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Header from "./Header";
import ReactTooltip from "react-tooltip";

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async () => {
    try {
      let token = localStorage.getItem("token");
      const { data } = await axios("/api/media", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setDocuments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = (event) => {
    console.log("share button clicked!!");
  };

  const handleDelete = (event) => {
    console.log("delete button clicked!!");
  };

  return (
    <>
      <Header
        buttonOne="Converter"
        buttonTwo="Sign Out"
        linkOne="/converter"
        linkTwo="/"
      />
      <body className="w-auto bg-slate-50 m-auto h-screen shadow-2xl flex justify-center items-center">
        <div className="flex-col h-full m-auto shadow-2xl w-5/6	">
          <div className="bg-slate-900 text-white font-bold flex justify-start p-4 text-xl rounded-t">
            Document Name
          </div>
          <div className="m-3 p-3 border flex flex-col">
            <h1 className="text-xl ">Document Title</h1>
            <div className=" text-l flex w-full list-decimal  justify-between">
              <p className="px-4 py-2 flex  items-center">
                {documents.map((document) => {
                  return document.name;
                })}
              </p>

              <div>
                <button
                  onClick={handleShare}
                  className=" rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2"
                >
                  Share
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-lg items-center hover:bg-sky-300  bg-black text-white text-l py-1 px-2 m-2"
                >
                  Delete
                </button>
              </div>
            </div>
            {/* <div className=" text-l flex w-full list-decimal  justify-between">
              <p className="px-4 py-2 flex  items-center">DOC 1 </p>

              <div>
                <button
                  onClick={handleShare}
                  className=" rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2"
                >
                  Share
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-lg items-center hover:bg-sky-300  bg-black text-white text-l py-1 px-2 m-2"
                >
                  Delete
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </body>
    </>
  );
}
