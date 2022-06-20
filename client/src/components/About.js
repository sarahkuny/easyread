//text explaining website
//link to resources/research
//link to about bionic reading
//example image of converted text
import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import convertedText from "../assets/converted-text-example.png";

export default function About() {
  return (
    <>
      <Header
        buttonOne="Converter"
        buttonTwo="Sign Out"
        linkOne="/converter"
        linkTwo="/"
      />
      <div class="bg-gradient-to-br from-zinc-900 via-slate-900 to-sky-500 min-h-screen flex items-center justify-center px-16">
        <div class="relative w-full max-w-xl">
          <div class="m-8 relative space-y-4">
            <h2
              className="text-2xl
            
            
            w-50 pt-6 font-bold text-white text-center"
            >
              Who are we?
            </h2>
            <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8 text-center">
              <p className="pt-2 text-xl">
                Reading is an enjoyable pastime for many, but for some, it can
                be an unpleasant or even frustrating experience. Our goal with
                easy
                <b>Read</b> is to help aid those with learning difficulties, as
                well as teachers, students, anyone who may benefit reading in a
                non-traditional way.
              </p>
            </div>
            <h2 className="w-50  pt-6 text-2xl font-bold text-white text-center">
              What is Bionic Reading?
            </h2>
            <div
              class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8 text-center
            "
            >
              <p className=" pt-2 text-xl mb-3">
                easy<b>Read</b> helps improve its readers' comprehension and
                focus by using the Bionic Reading method, which creates
                artificial fixation points within the coverted text. Initial
                letters of each word are bolded, so the reader is only focused
                on the highlighted letters. The reader's brain is able to center
                complete each word, creating a more shallow form of reading. As
                a result, readers are able to experience a deeper understanding
                of the text.
              </p>
            </div>
            <h2 className="w-50  pt-6 text-2xl font-bold text-white text-center">
              What does converted text look like?
            </h2>
            <div
              class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8 text-center
            "
            >
              <p className=" pt-2 text-xl mb-3">
                "<b>Thi</b>s <b>i</b>s a <b>sho</b>rt <b>examp</b>le <b>o</b>f{" "}
                <b>tex</b>t <b>convert</b>ed <b>o</b>n <b>easyR</b>
                ead <b>usi</b>ng <b>th</b>e <b>Bion</b>ic <b>Readi</b>ng{" "}
                <b>meth</b>
                od. <b>Tr</b>y <b>i</b>t <b>ou</b>t <b>fo</b>r <b>yourse</b>lf{" "}
                <b>an</b>d <b>experien</b>ce <b>bett</b>er <b>readi</b>ng{" "}
                <b>foc</b>
                us <b>an</b>d <b>comprehens</b>ion."
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button className="items-center py-2 px-2 bg-white text-black  rounded-lg my-6 w-60 hover:bg-sky-300 text-2xl">
                <a
                  href="https://bionic-reading.com/about/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn More
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
