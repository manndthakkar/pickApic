// Middleware is something that happens between the beginning of the 
// response and the sending of the response.
const User = require("../models/users");
const jsonwebtoken = require("jsonwebtoken");


exports.auth = async(req, res, next) => {
   try {

      // Get Token from cookies
      const {token} = req.cookies;
      if(!token) {return res.status(400).json({message: "You are not logged in"})};
      // Get decoded data with object, {_id: this._id}
      const dec = await jsonwebtoken.verify(token, process.env.JWT_SEC);
      // Now all req.user will have user's id, i.e, req.user = {_id: "id_of_user"};
      req.user = await User.findById(dec._id);
      next();
   } catch (error) {
    res.status(409).json({message: error.message})
   }
}