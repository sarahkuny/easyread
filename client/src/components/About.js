//Homepage Header
//About section
//text explaining website
//link to resources/research
//link to about bionic reading
//example image of converted text
import React, { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function About() {
  return (
    <>
      <Link to="/">
        <h1 className="text-5xl ml-3 my-6 font-louisgeorge">
          easy<b>Read</b>
        </h1>
      </Link>
      <div className="bg-zinc-900">
        <div className="flex flex-col md:flex-row m-auto lg:w-5/6 h-screen bg-zinc-900">
          <div className="w-100 m-auto flex flex-col text-white">
            <p className="text-center text-4xl">
              What is easy<b>Read</b>?{" "}
            </p>
            {/* can't figure out how to center it and set max width so that it doesn't
      expanded into on line across entire */}
            <div className="text-center pt-2 text-2xl">
              <p>
                Reading is an enjoyable pastime for many, but for some, it can
                be an unpleasant or even frustrating experience. Our goal with
                this platform is to help aid those with learning difficulties,
                such as Dyslexia, to read with greater ease.
              </p>
              <div>
                <h2 className="mt-20 font-semibold">
                  Example of Converted Text
                </h2>
                {/* <img src="converted-text-example.png" alt="converted text" /> */}
                <h2 className="mt-20 font-semibold">Resources</h2>
                <ul class="list-none">
                  {/* <li>
                    <link href="https://bionic-reading.com/about/">
                      About Bionic Reading
                    </link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
