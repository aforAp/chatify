import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
  //
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    //bit more secure prevent xxs attacks: cors site scripting
    sameSite: "strict", //CSRF attacks
    secure:   process.env.NODE_ENV === 'development' ? false: true
  })
return token;
}
//if wre are in development it was false prod it was true
//http://localhost
//https://dsmakmk.com