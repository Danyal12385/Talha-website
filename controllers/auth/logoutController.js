const User = require('../../models/userModel');

const logout = (request, response) => {
    response.clearCookie('token');

    return response.redirect('/');
};

module.exports = { logout };