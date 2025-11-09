require('dotenv').config();

const port = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

module.exports = {
    port: process.env.PORT || 8080,
    sessionSecret: process.env.SESSION_SECRET,
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${baseUrl}/auth/github/callback`,
        //callbackURL: `${process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`}/auth/github/callback`,
        //callbackURL: `${process.env.BASE_URL || 'http://localhost:${process.env.PORT || 8080'}/auth/github/callback`,
        scope: ['read:user', 'user:email'],
    },    
};