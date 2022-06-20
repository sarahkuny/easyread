//Header - go to converter, sign out
//Documents
//each row: document title, share (email popup), delete

import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function MyDocuments() {
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
            <div className=" text-l flex w-full list-decimal   w-full flex justify-between">
                <p className="px-4 py-2 flex  items-center">
                  DOC 1 </p>
                  <div>
                  <button className=" rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2">
                    Share
                  </button>
                  <button className="rounded-lg items-center hover:bg-sky-300  bg-black text-white text-l py-1 px-2 m-2">
                    Delete
                  </button>
                  </div>
                
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
