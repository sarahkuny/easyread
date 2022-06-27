//Header - go to converter, sign out
//Documents
//each row: document title, share (email popup), delete

import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import EmailButton from "./EmailButton";

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDocuments();
  }, []);

  const getAllDocuments = async () => {
    let token = localStorage.getItem("token");
    try {
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

  const handleDelete = async (id) => {
    console.log("id", id);
    let token = localStorage.getItem("token");
    try {
      const response = await axios(`/api/media/document/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data);
      console.log(documents);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleClick = async (id) => {
    try {
      let token = localStorage.getItem("token");
      const { data } = await axios(`/api/media/document/${id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      let content = data[0].content;
      navigate("/convert/saved", { state: { content: content } });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDelete = (id) => {
  //   let id = event.target.id;
  //   deleteDocument(event);
  // };

  // pull content from media table
  // send content to bionic reading api (abstracted function)
  // get html results
  // email html results
  // const getAllDocuments = async () => {
  //   let token = localStorage.getItem("token");
  //   try {
  //     const { data } = await axios("/api/media", {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setDocuments(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // JSX and TAILWIND
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
          <div className="flex-col h-screen l m-auto w-5/6 shadow-2xl bg-white rounded-t-xl overflow-y-auto max-height-48 ">
            <div className="bg-slate-900 rounded-t-xl">
              <table className="w-full text-white overflow-y-auto  max-height-80">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-3 ">Document Title</th>
                    <th className="text-right py-2 pr-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => {
                    return (
                      <tr className="odd:bg-white even:bg-sky-100 text-black">
                        <td
                          onClick={() => handleTitleClick(document.id)}
                          id={document.id}
                          className="py-2 px-3"
                        >
                          {document.name}
                        </td>
                        <td className="p-3 text-right pr-14 ">
                          {/* <button className=" rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                          </button> */}
                          <EmailButton id={document.id} />
                          <button
                            id={document.id}
                            onClick={() => handleDelete(document.id)}
                            className="rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
