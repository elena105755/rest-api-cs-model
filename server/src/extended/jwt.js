const crypto = require('crypto');
const b64url = require('base64url');
const atob = require('atob');

exports.jwtoken = (secret, payload) =>{
    //this.secret = secret;

    algorithm = {
        alg: "HS256",
        typ: "JWT"
    };
    payload = {id:payload};

    const headToString = stringify(algorithm); //make head string
    const payloadToString = stringify(payload);
    const sign = makeSign(b64url(headToString), b64url(payloadToString),secret);
        
    return (b64url(headToString) + "." + b64url(payloadToString) + "." + sign);
}; 
    
exports.encoder = (jwtString, secret) => {
    let encode = "";
    let header = encodeB64(stringify(algorithm));
    console.log(header);

    encode = encode + header + ".";
    let body = encodeB64(stringify(jwtString));
    console.log(body);

    encode = encode + body + ".";
    let sign = makeSign(header, body, secret);
    encode = encode + sign;
    return encode;
};

    //check if correct jwt
exports.verifyAuth = (req, secret) => {
    try{
        const jwtString = req.header('Authorization');
        console.log(jwtString)
        if(jwtString === undefined){
            return false;
        } else {
            const bearer = jwtString.split(" ")[1];

            let jwtArray = bearer.split(".");
            const head = jwtArray[0]; //header
            const body = jwtArray[1]; //payload, data
            const hash = jwtArray[2]; //signature
                
            let checkSign = makeSign(head, body, secret);
                
            if(hash === checkSign) {
                console.log("jwt header: " + head);
                console.log("hwt payload: " + body);
                console.log("hash signature/gen: " + hash);
                console.log('Successful JWT authentication');
                return jwtString; //valid double sign
            }
            else{
                console.log('JWT unsuccessful');
                console.log("jwt head: " + head);
                console.log("hwt payload: " + body);
                console.log("hash signature/gen: " + hash);
                return false; //invalid double sign
            }
        }
    }
    catch(error) {
        console.error(error);
    }
};

//Takes head and payload and computes the signature.  
//Compares if both signatures are equal => yes:return payload
const makeSign = (head, body, secret) => {
    const toSign = head + "." + body;
    const signString = crypto
        .createHmac("sha256", secret)
        .update(toSign)
        .digest()
        // .replace(/=/g, "")                      
        // .replace(/\+/g, "-")                               
        // .replace(/\//g, "_");
    return b64url(signString);
}
    
function encodeB64(val){
    return new Buffer(val).toString('base64').toString("utf-8");
}

function decodeB64(val) {
    return new Buffer(val, 'base64').toString("utf-8");
}

function stringify(val) {
    return JSON.stringify(val);
}

exports.getID = (req) => {
    const jwtString = req.header("Authorization"); 

    const jwtArray = jwtString.split(" ");
    const token = jwtArray[1];
    const tokenArray = token.split(".");
    const id = tokenArray[1];

    return JSON.parse(atob(id)).id;
}