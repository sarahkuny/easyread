
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header"; 
export default function Homepage() {
  
  return (
    <div>
     <Header  />
      <div className="flex flex-col lg:flex-row">
        {/* left content */}
        <div className="bg-black basis-1/2 h-screen">
          <div className="grid grid-cols-1 place-items-center h-screen">
            <div>
              <h1 className="text-5xl font-bold text-white text-center mb-2">
                Reading, made easy.
              </h1>
              <p className="text-white italic text-md text-center">For teachers, students, life-long learners.</p>
             
              <div className="flex justify-center">
                <Link to="/about">
                  <button className="bg-white py-2 px-2 rounded-lg my-6 w-60 hover:bg-blue-300 text-2xl">
                    Learn More
                  </button>
                </Link>
              </div>{" "}
            </div>
          </div>
        </div>
        {/* right-content */}
        <div className="basis-1/2 h-screen">
          <div className="bg-cover h-screen bg-right-bottom bg-homepage">
            <div className="grid grid-cols-1 place-items-center h-screen">
              <div>
                <div className="flex justify-center">
                  <Link to="/convert">
                    <button className="bg-white pt-2 pb-2 pl-2 pr-2 rounded-lg mt-6 mb-0 w-60 text-2xl hover:bg-blue-300 ">
                      <b>Start reading</b>
                    </button>
                  </Link>
                </div>{" "}
                <p className="text-white bg-black/25 text-sm text-center rounded-lg px-2 py-2">
                  <i>
                      To save converted documents <br></br>or send to others, {" "}
                      <Link to="/signUp">
                        <u>Sign Up</u>
                      </Link>
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
