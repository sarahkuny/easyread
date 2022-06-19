//Homepage Header
//About section
//text explaining website
//link to resources/research
//link to about bionic reading
//example image of converted text
import React, { useState } from "react";
import Header from "./Header";

export default function About() {
  return (
    <>
      <Header
        buttonOne="Converter"
        buttonTwo="Sign Out"
        linkOne="/converter"
        linkTwo="/"
      />
      <div className="flex flex-auto bg-zinc-900 h-screen mx-64">
        <div className=" bg-zinc-900 flex flex-col text-white text-center mx-64">
          <h2 className="w-50 text-center pt-2 text-2xl font-bold">
            Who are we?
          </h2>
          <p className="text-center pt-2 text-xl">
            Reading is an enjoyable pastime for many, but for some, it can be an
            unpleasant or even frustrating experience. Our goal with easy
            <b>Read</b> is to help aid those with learning difficulties, as well
            as teachers, students, anyone who may benefit reading in a
            non-traditional way.
          </p>

          <h2 className="w-50 text-center pt-2 text-2xl font-bold">
            What is Bionic Reading?
          </h2>
          <p className="text-center pt-2 text-xl">
            easy<b>Read</b> helps improve its readers' comprehension and focus
            by using the Bionic Reading method, which creates artificial
            fixation points within the coverted text. Initial letters of each
            word are bolded, so the reader is only focused on the highlighted
            letters. The reader's brain is able to center complete each word,
            creating a more shallow form of reading. As a result, readers are
            able to experience a deeper understanding of the text.
          </p>
          {/* <img src="converted-text-example.png" alt="converted text" /> */}
          <h2 className="w-50 text-center pt-2 text-2xl font-bold">
            Resources
          </h2>
          <ul class="list-none">
            {/* <li>
                    <link href="https://bionic-reading.com/about/">
                      About Bionic Reading
                    </link>
                  </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
