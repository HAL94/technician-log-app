const jwt = require('jsonwebtoken');

// a middleware function to check authentication
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTKEY);
    // console.log('user data', decoded);
    req.userData = decoded;
    // console.log(req);
    next();
  } catch(error) {
    // console.log(error);
    res.status(401).json({
      message: 'authentication failed'
    })
  }
};
