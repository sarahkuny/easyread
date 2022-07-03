import axios from "axios";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import SuccessModal from "./SuccessModal";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";

export default function EmailButton({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [recipientName, setRecipientName] = useState();
  const [recipientEmail, setRecipientEmail] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const fetchDocument = async () => {
    try {
      let token = localStorage.getItem("token");
      const { data } = await axios(`/api/emailConvert/${id}`, {
        //check on syntax for id
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const sendEmail = async (content) => {
    const emailObj = {
      recipientName: recipientName,
      recipientEmail: recipientEmail,
      user: user,
      convertedDocument: content,
    };

    //sending the email
    console.log("the email object is", emailObj);
    emailjs
      .send(
        "service_au002tq",
        "template_irzod5n",
        emailObj,
        "OPTb-EeRcr0hB7QYT"
      )
      .then(
        function (response) {
          setLoading(false);
          setSuccess(true);
        },
        function (error) {
          setErrorMessage({
            title: "Cannot Send Email",
            message:
              "Please make sure you've entered a valid email or try again later.",
          });
          setLoading(false);
          setError(true);
        }
      );
  };

  const handleSendEmail = async () => {
    setShowModal(false);
    setLoading(true);
    let content = await fetchDocument();
    await sendEmail(content);
    // create template params object for the email
  };

  return (
    <>
      {loading ? <LoadingModal /> : ""}
      {error ? (
        <ErrorModal
          closeError={() => setError(false)}
          message={errorMessage.message}
          title={errorMessage.title}
        />
      ) : (
        ""
      )}
      {success ? (
        <SuccessModal
          closeMessage={() => setSuccess(false)}
          title="Success!"
          message="Email has been sent to the recipient's provided email address."
        />
      ) : (
        ""
      )}
      <button
        onClick={() => setShowModal(true)}
        className=" shadow  hover:shadow-lg  active:bg-sky-400 rounded-lg hover:bg-sky-300 bg-black text-white text-l py-1 px-2 m-2"
      >
        <div className=" items-center flex text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <div className="p-1 hidden md:inline">Share</div>
        </div>
      </button>
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div>
                  <button type="button" onClick={() => setShowModal(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7 m-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#ef4444"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="selection:flex items-start justify-between px-4 pb-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Share your document
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                  <label className="absolute left-10  ">Your Name*</label>
                  <br></br>
                  <input
                    type="text"
                    className=" m-3 p-1 justify-items-center w-64 font-normal outline-4 outline-black shadow-lg rounded border-solid bg-slate-200 mx-3 my-3"
                    onChange={handleUserName}
                    value={user}
                  />
                  <br></br>
                  <label className="absolute left-10">Recipient's Name*</label>
                  <br></br>
                  <input
                    type="text"
                    className="m-3 p-1 justify-items-center w-64 font-normal outline-4 outline-black shadow-lg rounded border-solid bg-slate-200 my-3"
                    required
                    onChange={handleRecipientName}
                    value={recipientName}
                  />
                  <br></br>
                  <label className="absolute left-10">Recipient's Email*</label>
                  <br></br>
                  <input
                    type="text"
                    className=" m-3 p-1 justify-items-center w-64 font-normal outline-4 outline-black shadow-lg rounded border-solid bg-slate-200 mx-3 my-3"
                    required
                    onChange={handleRecipientEmail}
                    value={recipientEmail}
                  />
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"> */}
                <div className=" flex justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className=" flex items-center hover:bg-sky-200 text-black active:bg-sky-400 active:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSendEmail}
                  >
                    Send
                  </button>{" "}
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button> */}
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
