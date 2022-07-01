import React from "react";
import Header from "./Header";
import sarah from "../assets/sarah.jpeg"
import shannon from "../assets/shannon.jpg"
import bionicExample from "../assets/bionic-example.png"
export default function About() {
    return (
    <>
      <Header />
      {/* Banner */}
      <div className="snap-y">
        <div className=" bg-zinc-900 h-min-content flex flex-col items-center">
                <div className="bg-aboutBanner bg-cover h-[966px] w-[1440px] flex flex-col justify-center">
                <h2 className="text-white text-center text-7xl ">ABOUT</h2>
                </div>
        </div>
        {/* Mission */}
        <div className="snap-center bg-zinc-900 flex items-center justify-center">
            <div className="w-[720px] flex justify-center">
                <img src={sarah} alt="Sarah Kuny" className="rounded-full h-[200px] w-[200px] mr-10"/>
                <img src={shannon} alt="Shannon Williams" className="rounded-full h-[200px] w-[200px]"/>
            </div>
            <div className="w-[720px] text-center pt-10 h-screen text-white flex flex-col items-center justify-center">
                <h3 className="text-7xl font-louisgeorge mb-10">Our Mission</h3>
                <p className="w-4/6 text-xl">
                    easyRead originated as a final project for a coding bootcamp. The team behind the app 
                    consisted of two teachers, and an occupational therapist who worked with stroke victims. 
                    They all saw a need for a tool that could transform the reading process - making it accessible 
                    for all. easyRead accesses the Bionic Reading API and leverages user interface elements 
                    to create a responsive reading experience that fits the needs of many users.  </p>
            </div>
        </div>
        
        {/* What is Bionic Reading */}
        <div className="snap-center bg-zinc-900 flex items-center justify-center">
            <div className="w-[720px] text-center pt-10 h-screen text-white flex flex-col items-center justify-center">
                <h3 className="text-7xl font-louisgeorge mb-10">What is Bionic Reading?</h3>
                <p className="w-4/6 text-xl">
                One of the tools easyRead provides to help improve users' reading experience 
                is the Bionic Reading button. When the button is pressed, artificial 
                fixation points are created in the text by bolding the initial letters. 
                This allows the reader to center and complete words, creating a shallow form of reading. 
                As a result, readers have more bandwith to focus on text comprehension.</p>
            </div>
            <div className="w-[720px] flex justify-center mr-20">
                <img src={bionicExample} alt="bionic reading text example" className="rounded" />
            </div>
        </div>
        
            
      </div>
      
    </>
)}
