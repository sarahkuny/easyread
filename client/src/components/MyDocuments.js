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

      <div className="bg-black h-screen bas"></div>
    </>
  );
}
