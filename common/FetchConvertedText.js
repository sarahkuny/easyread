const axios = require("axios");
require('dotenv').config();

async function  fetchConvertedText (req){
    const { content, fixation, saccade } = req.body;
    let results = "";
    arrayContent = content.split(" ");
    
    while(arrayContent.length){
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
      method: 'POST',
      url: 'https://bionic-reading1.p.rapidapi.com/convert',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com'
      },
      data: encodedParams
    };
    
    try{
      let response = await axios.request(options);
      results+=(response.data);
    }
    
    catch (error) {
        return(error);
    }
  };
    
    return(results)

};

module.exports = fetchConvertedText;