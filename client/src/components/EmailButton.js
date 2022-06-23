import axios from "axios";
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function EmailButton() {
  const [showModal, setShowModal] = useState(false);
  const [recipientName, setRecipientName] = useState();
  const [recipientEmail, setRecipientEmail] = useState();
  const [user, setUser] = useState();
  const [convertedDocument, setConvertedDocument] = useState();

  const handleUserName = (event) => {
    setUser(event.target.value);
  };
  const handleRecipientName = (event) => {
    setRecipientName(event.target.value);
  };
  const handleRecipientEmail = (event) => {
    setRecipientEmail(event.target.value);
    console.log(recipientEmail);
  };

  const handleSendEmail = async () => {
    setShowModal(false);

    // Fetch converted document
    try {
      const { data } = await axios("/api/converter/", {
        method: "POST",
      });
      setConvertedDocument(data);
    } catch (err) {
      console.log(err);
    }

    // create template params object for the email
    const emailObj = {
      recipientName: recipientName,
      recipientEmail: recipientEmail,
      user: user,
      convertedDocument: convertedDocument,
    };

    //sending the email

    emailjs.send("service_au002tq", "YOUR_TEMPLATE_ID", emailObj).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };

  return (
    <>
      <button
        className="bg-black rounded-lg items-center text-white hover:bg-sky-300 text-l py-1 px-2 m-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Share
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Share your document
                  </h3>
                  <button className=" rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    onClick={() => setShowModal(false)}
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label className="mx-3" required>
                    Your Name*
                  </label>
                  <br></br>
                  <input
                    type="text"
                    className="outline-4 outline-black shadow-lg rounded border-solid bg-slate-200 mx-3 my-3"
                    onChange={handleUserName}
                    value={user}
                  />
                  <br></br>
                  <label className="mx-3">Recipient's Name*</label>
                  <br></br>
                  <input
                    type="text"
                    className="outline-4 outline-black shadow-lg rounded border-solid bg-slate-200 mx-3 my-3"
                    required
                    onChange={handleRecipientName}
                    value={recipientName}
                  />
                  <br></br>
                  <label className="mx-3">Recipient's Email*</label>
                  <br></br>
                  <input
                    type="text"
                    className="outline-4 outline-black shadow-lg rounded border-solid bg-slate-200 mx-3 my-3"
                    required
                    onChange={handleRecipientEmail}
                    value={recipientEmail}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSendEmail}
                  >
                    Send
                  </button>{" "}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
