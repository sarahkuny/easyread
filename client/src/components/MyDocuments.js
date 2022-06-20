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
      <body className="w-auto	 bg-slate-50 m-auto h-screen shadow-2xl flex justify-center items-center">
        <div className="flex-col h-full m-auto shadow-2xl w-5/6	">
          <div className="bg-slate-900 text-white font-bold flex justify-start p-4 text-lg">
            Document Name
          </div>
          <div>Document Title</div>
          <div className="flex items-center justify-center">
            <ol>
              <li>DOC 1</li>
              <li>DOC 1</li>
              <li>DOC 3</li>
            </ol>
          </div>
        </div>

        {/* <button className="items-center py-2 px-2 text-black  rounded-lg my-6 w-60 hover:bg-sky-300 text-2xl">
          <a
            href="https://bionic-reading.com/about/"
            target="_blank"
            rel="noreferrer"
          >
            Learn More
          </a>
        </button> */}
      </body>
    </>
  );
}
