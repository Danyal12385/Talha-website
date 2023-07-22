const jwt = require('jsonwebtoken');

const authenticateRegionalAdmin = (request, response, next) => {
    const token = request.cookies.token;
  
    if (!token) {
      return response.redirect('/');
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return response.redirect('/');
      }

      if (decoded.role !== 'ra') {
        return response.redirect('/');
      }
  
      next();
    });
  };

module.exports = authenticateRegionalAdmin;