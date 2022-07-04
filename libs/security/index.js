const jwt = require('jsonwebtoken');
const expiresIn = parseInt(process.env.JWT_AGE_SECONDS) * 1000;
const expiresIn2 = parseInt(process.env.JWT_AGE_SECONDS_Reset_Password) * 1000;
module.exports = { 
  jwtSign : async (payload)=>jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn}
  ),
  jwtSignResetPassword : async (payload)=>jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn: expiresIn2}
  ),
  jwtVerify: async (token)=>jwt.verify(token, process.env.JWT_SECRET)
}
