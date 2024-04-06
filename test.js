const crypto = require("crypto");

const publicKey = "04141f94-1995-4514-9c5b-84399ff667c5";
const privateKey = "cfba6fb7-b735-4444-ba60-f6f4924c96de";
const httpMethod = "GET";
const apiEndpoint = "https://api.mettl.com/v2/assessments";
const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp in seconds

// Creating a String-to-Sign
const stringToSign = `${httpMethod}${apiEndpoint}\n${publicKey}\n${timestamp}`;
console.log("String-To-Sign:", stringToSign);

// Generating Signature
const signature = crypto.createHmac("SHA256", privateKey)
                        .update(stringToSign)
                        .digest("base64");
const encodedSignature = encodeURIComponent(signature);
console.log("Signature:", encodedSignature);

// Constructing the request URL
const url = `${apiEndpoint}?ak=${publicKey}&ts=${timestamp}&asgn=${encodedSignature}`;
console.log("URL to Hit:", url);