//text explaining website
//link to resources/research
//link to about bionic reading
//example image of converted text
import React from "react";
import Header from "./Header";
import settingsDemonstrationGif from "../assets/settings_gif.gif";
import bionicReadingGif from "../assets/bionicReadingGif.gif";

export default function About() {
  return (
    <>
      <Header
        buttonOne="Converter"
        buttonTwo="Sign Up"
        linkOne="/convert"
        linkTwo="/signup"
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
            <div class="p-6 bg-white rounded-lg flex items-center justify-between space-x-8 text-center">
              <p className="pt-2 text-xl">
                Reading is an enjoyable pastime for many, but for some, it can
                be an unpleasant or even frustrating experience. Our goal with
                easy<b>Read</b> is to help aid those with learning difficulties,
                as well as teachers, students, and anyone who may benefit from
                reading in a non-traditional way.
              </p>
            </div>
            <h2
              className="text-2xl
            
            
            w-50 pt-6 font-bold text-white text-center"
            >
              How does easy<b>Read</b> work?
            </h2>
            <div class="p-6 bg-white rounded-lg flex items-center justify-between space-x-8 text-center">
              <p className="pt-2 text-xl">
                Users can upload, convert, and save any .txt document to our
                text converter. They can use the text converter tool to
                customize the text display settings, best fitting their needs.
                Settings options include font color and size, background color,
                line spacing, and 'Bionic Reading.' Users can also save their
                preferred default settings, making all future text conversions
                seamless and effortless.
                <img
                  src={settingsDemonstrationGif}
                  alt="settings demonstration gif"
                />
              </p>
            </div>
            <h2 className="w-50  pt-6 text-2xl font-bold text-white text-center">
              What is Bionic Reading?
            </h2>
            <div
              class="p-6 bg-white rounded-lg flex items-center justify-between space-x-8 text-center
            "
            >
              <p className=" pt-2 text-xl mb-3">
                One of the tools easy<b>Read</b> provides to help improve its
                users' reading focus and comprehension is the 'Bionic Reading'
                button. When a user activates the Bionic Reading button,
                artificial fixation points are within the coverted text. The
                initial letters of each word are bolded. By doing so, the reader
                is only focused on the highlighted letters when reading. Their
                brain can center and complete words, creating a more shallow
                form of reading. As a result, readers can experience a deeper
                understanding of the text.
              </p>
            </div>
            <h2 className="w-50  pt-6 text-2xl font-bold text-white text-center ">
              What does Bionic Reading look like?
            </h2>
            <div
              class="p-6 bg-white rounded-lg flex items-center justify-between space-x-8 text-center
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
                us <b>an</b>d <b>comprehens</b>ion."{" "}
                <img
                  src={bionicReadingGif}
                  alt="bionic reading demonstration gif"
                />
              </p>
            </div>
            <div className="flex items-center justify-center ">
              <button className=" items-center py-2 px-2 bg-white text-black  rounded-lg my-6 w-50 hover:bg-sky-300 text-2xl">
                <a
                  href="https://bionic-reading.com/about/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center"
                >
                  Learn More
                  <div className=" pl-1 animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                  </div>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
