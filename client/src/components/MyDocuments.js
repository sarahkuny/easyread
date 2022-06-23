//Header - go to converter, sign out
//Documents
//each row: document title, share (email popup), delete

import axios from "axios";
import React, { useState, useEffect } from "react";

import Header from "./Header";
import { Link } from "react-router-dom";
import EmailButton from "./EmailButton";

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [updatedDocumentsList, setUpdatedDocumentsList] = useState([]);

  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async () => {
    let token = localStorage.getItem("token");
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

  const deleteDocument = async () => {
    let token = localStorage.getItem("token");
    try {
      let token = localStorage.getItem("token");
      const { data } = await axios("/api/media/${documents.id}", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments([...documents]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = (event) => {
    console.log("share button clicked!!");
  };

  const handleDelete = (event) => {
    console.log("delete button clicked!!");
    deleteDocument();
  };

  return (
    <>
      <Header
        buttonOne="Converter"
        buttonTwo="Sign Out"
        linkOne="/convert"
        linkTwo="/"
      />
      <div className="bg-slate-50 w-full  h-screen">
        <div className=" bg-slate-50 font-bold  text-xl ">
          <div className="text-center">
            <h1 className="text-2xl font-bold 5 p-3 bg-slate-50">
              Saved Documents
            </h1>
          </div>
          <div className="m-3 p-3 border flex flex-col">
            <h1 className="text-xl ">Document Title</h1>
            <div className=" text-l flex w-full list-decimal   w-full flex justify-between">
              <p className="px-4 py-2 flex  items-center">DOC 1 </p>
              <div>
                <EmailButton />
                <button className="rounded-lg items-center hover:bg-sky-300  bg-black text-white text-l py-1 px-2 m-2">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
