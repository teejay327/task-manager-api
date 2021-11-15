const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    // Pass name of header we are trying to give accesss to
    const token = req.header('Authorization').replace('Bearer ', '');
    // secret string from models/user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // create new user
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      // we don't need to provide error message, catch will take care of it
      throw new Error();
    }
    // allows us to store the token for that particular session so other route handlers can use it.
    req.token = token;
    // give route handler access to user from database
    req.user = user
    // makes sure route handler runs since it has been proven
    next();
  } catch(e) {
    res.status('401').send({ error: "please authenticate" });
  }
}

module.exports = auth;