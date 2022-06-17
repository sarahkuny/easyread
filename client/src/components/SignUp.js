//Header
//Sign Up Form
//link to login component (send to parent)
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function SignUp() {
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [readingFact, setReadingFact] = useState(
    "Dyslexia is thought to affect 1 in 5 people. Bionic Reading makes text accessible for all. The eye is guided through text by emphasizing the most concise parts of the word. "
  );

  useEffect(() => {
    const fetchConvertedText = async () => {
      try {
        const { data } = await axios("/api/convert", {
          method: "POST",
          data: {
            fixation: 1,
            saccade: 10,
            content: `Dyslexia is thought to affect 1 in 5 people. Bionic Reading makes text accessible for all. The eye is guided through text by emphasizing the most concise parts of the word.`,
          },
        });
        const parsed = parse(data);
        setReadingFact(parsed);
      } catch (err) {
        console.log(err);
      }
    };
    fetchConvertedText();
  }, []);

  return (
    <>
      <h1 className="text-5xl ml-3 my-3 font-louisgeorge">
        easy<b>Read</b>
      </h1>
      <div className="flex space-between">
        <div className="">
          <p>{readingFact}</p>
        </div>
        <div className="">
          <h3>Fill in your personal details below to create your account.</h3>
          <form className="flex flex-col">
            {/* Name */}
            <label>Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={fullName}
              className=""
              required
            />
            {/* Username input */}
            <label>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className=""
              required
            />
            {/* Password input */}
            <label>Full Name</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className=""
              required
            />
          </form>
          <h6 className="italic">
            Already have an account?{" "}
            <Link to="/login">
              <b>Log In</b>
            </Link>{" "}
          </h6>
        </div>
      </div>
    </>
  );
}
