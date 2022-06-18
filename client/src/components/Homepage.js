//Homepage Header
//Banner

import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./assets/banner-pic.jpg";

export default function Homepage() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="bg-black basis-1/2 bg-black h-screen">
          <div className="grid grid-cols-1 place-items-center h-screen">
            <div>
              <h1 className="text-5xl font-bold text-white text-center my-6">
                Reading, made easy.
              </h1>
              <p className="text-white text-center my-6 text-lg">
                For teachers, students, life-long learners.<br></br> We've
                created a tool to make <br></br>reading as easy and enjoyable as{" "}
                <br></br>
                possible.
              </p>
              <div className="flex justify-center">
                <button className="bg-white py-2 px-2 rounded-lg my-6 w-60 hover:bg-sky-300 text-2xl">
                  <Link to="/about">Learn More</Link>
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="basis-1/2 h-screen">
          <div className="bg-cover h-screen bg-right-bottom bg-[url('./assets/banner-pic.jpg')]">
            <div className="grid grid-cols-1 place-items-center h-screen">
              <div>
                <div className="flex justify-center">
                  <button className="bg-white pt-2 pb-2 pl-2 pr-2 rounded-lg mt-6 mb-0 w-60 text-2xl hover:bg-sky-300">
                    <Link to="/convert">
                      <b>Start reading</b>
                    </Link>
                  </button>
                </div>{" "}
                <p className="text-white bg-black/25 text-sm text-center rounded-lg px-2 py-2">
                  <i>
                    <b>
                      To save converted documents <br></br>or send to others,
                      <Link to="/signUp">
                        <u>Sign Up</u>
                      </Link>{" "}
                      here
                    </b>
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
