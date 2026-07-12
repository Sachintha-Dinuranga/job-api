import dotenv from "dotenv";
dotenv.config();

import NodeGeocoder from "node-geocoder";

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

// console.log("Provider:", process.env.GEOCODER_PROVIDER);
// console.log("API Key:", process.env.GEOCODER_API_KEY);

const geocoder = NodeGeocoder(options);

export default geocoder;
