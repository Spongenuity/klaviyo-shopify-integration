import {jsonToBase64} from './helper_functions'
import fetch from 'node-fetch' //opted to use fetch instead of axios simply because it's a lighter module and we are only calling the klaviyo endpoint once

//This function converts the payload into base64, then it sends the base64 in the URL via a GET request to klaviyo, I moved into a separate file for clarity

const sendPayloadToKlaviyo = async (payload) => {
const base64 = jsonToBase64(payload);
const result = fetch(`https://a.klaviyo.com/api/track?data=${base64}`)
.catch((error) => console.log(`error: ${error}`));
  return true;
};

export default sendPayloadToKlaviyo;

