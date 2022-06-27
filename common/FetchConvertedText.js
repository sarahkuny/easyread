const axios = require("axios");
require("dotenv").config();
async function FetchConvertedText(req) {
  // const { content, fixation, saccade } = req.body;
  const { content, fixation, saccade } = req;
  let results = "";
  arrayContent = content.split(" ");
  console.log("req.body", req.body);

  while (arrayContent.length) {
    let chunk = arrayContent.splice(0, 400);
    let request = chunk.join(" ");

    const encodedParams = new URLSearchParams();
    encodedParams.append("content", `${request}`);
    encodedParams.append("response_type", "html");
    encodedParams.append("request_type", "html");
    encodedParams.append("fixation", `${fixation}`);
    encodedParams.append("saccade", `${saccade}`);
    const apiKey = process.env.API_KEY;

    const options = {
      method: "POST",
      url: "https://bionic-reading1.p.rapidapi.com/convert",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": `${apiKey}`,
        "X-RapidAPI-Host": "bionic-reading1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      let response = await axios.request(options);
      results += response.data;
    } catch (error) {
      return error;
    }
  }
  console.log("FETCHCONVERTED results", results);
  return results;
}

module.exports = FetchConvertedText;
