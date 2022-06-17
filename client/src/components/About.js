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
      <h1 className="text-5xl ml-3 my-3 font-louisgeorge">
        easy<b>Read</b>
      </h1>
      <h2 className="text-center text-3xl">
        What is easy<b>Read</b>?{" "}
      </h2>
      {/* can't figure out how to center it and set max width so that it doesn't
      expanded into on line across entire page */}
      <div className="text-center text-1xl shadow-lg pt-3 max-w-prose">
        <p>
          Reading is an enjoyable pastime for many, but for some, it can be an
          unpleasant or even frustrating experience. Our goal with this platform
          is to help aid those learning difficulties, such as Dyslexia,to read
          with with greater ease.
        </p>
      </div>
    </>
  );
}
