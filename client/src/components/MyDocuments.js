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
      <div>
        <div>
          <div>
            <h2>Document Name</h2>
            <div className="border">
              <ol>Document Title</ol>
              <li>
                EXAMPLE DOCUMENT
                <button className="border">Share</button>
                <button className="border">Delete</button>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
