require('dotenv').config();


module.exports = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    sessionSecret: process.env.SESSION_SECRET
};