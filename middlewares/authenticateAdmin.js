const jwt = require('jsonwebtoken');

const authenticateAdmin = (request, response, next) => {
    const token = request.cookies.token;
  
    if (!token) {
      return response.redirect('/');
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return response.redirect('/');
      }
  
      if (decoded.role !== 'admin') {
        return response.redirect('/');
      }
  
      next();
    });
  };

module.exports = authenticateAdmin;