import React from "react";
import Header from "./Header";
import sarah from "../assets/sarah.jpeg";
import shannon from "../assets/shannon.jpg";
import hannah from "../assets/hannah.JPG";
import bionicExample from "../assets/bionic-example.png"
import Footer from "./Footer";

export default function About() {
    return (
    <>
      <Header />
      {/* Banner */}
      <div className="snap-y">
        <div className=" bg-zinc-900 flex flex-col items-center h-screen">
                <div className="bg-aboutBanner bg-cover bg-center flex flex-col justify-center items-center h-screen w-full   ">
                <h2 className="text-white text-center text-7xl ">ABOUT</h2>
                </div>
        </div>
        {/* Mission */}
        <div className="snap-center bg-zinc-900 flex flex-col-reverse lg:flex-row items-center justify-center h-screen">
            <div>
                <div className="lg:w-[720px] flex justify-center">
                    <img src={sarah} alt="Sarah Kuny" className="rounded-full h-[100px] w-[100px] md:h-[200px] md:w-[200px] mr-10"/>
                    <img src={shannon} alt="Shannon Williams" className="rounded-full h-[100px] w-[100px] md:h-[200px] md:w-[200px]"/>
                </div>
                <div className="flex justify-center">
                    <img src={hannah} alt="Hannah Willows" className="rounded-full h-[100px] w-[100px] md:h-[200px] md:w-[200px]"/>
                </div>
                <div className="text-white italic text-center px-1 md:pt-10 font-louisgeorge">Creators Sarah Kuny, Shannon Williams, and Hannah Willows</div>
            </div>
            <div className="lg:w-[720px] text-center pt-10  text-white flex flex-col items-center justify-center">
                <h3 className="text-4xl md:text-7xl font-louisgeorge ">Our Mission</h3>
                <p className="lg:w-4/6  text-sm md:text-xl pb-10">
                    easyRead originated as a final project for a coding bootcamp. The team behind the app 
                    consisted of two teachers, and an occupational therapist who worked with stroke victims. 
                    They all saw a need for a tool that could transform the reading process - making it accessible 
                    for all. easyRead accesses the Bionic Reading API and leverages user interface elements 
                    to create a responsive reading experience that fits the needs of many users.  </p>
            </div>
        </div>
        
        {/* What is Bionic Reading */}
        <div className="snap-center bg-zinc-900 flex flex-col-reverse lg:flex-row items-center justify-center h-screen">
            <div className="lg:w-[720px] text-center pt-10  text-white flex flex-col items-center justify-center">
                <h3 className="text-4xl md:text-7xl font-louisgeorge mb-10">What is Bionic Reading?</h3>
                <p className="lg:w-4/6 text-sm px-1 md:text-xl">
                One of the tools easyRead provides to help improve users' reading experience 
                is the Bionic Reading button. When the button is pressed, artificial 
                fixation points are created in the text by bolding the initial letters. 
                This allows the reader to center and complete words, creating a shallow form of reading. 
                As a result, readers have more bandwith to focus on text comprehension.</p>
            </div>
            <div className="flex justify-center px-5 lg:w-[720px] lg:mr-20">
                <img src={bionicExample} alt="bionic reading text example" className="rounded" />
            </div>
        </div>
        
            
      </div>
      <Footer />
    </>
)}
