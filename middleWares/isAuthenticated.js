const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (token){
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, function (err, user) {
      if(err){
        res.status(401).json({
          message: 'Invalid token'
        })
      } else {
        req.user = user;
        next()
      }
    })
  } else {
    res.status(401).json({
      message: 'Invalid token'
    })
  }
};

module.exports = isAuthenticated;
