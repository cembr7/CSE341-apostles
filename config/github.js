require('dotenv').config();

const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl =  isProduction 
    ? process.env.BASE_URL || `https://${process.env.RENDER_EXTERNAL_HOSTNAME || 'cse341-apostles.onrender.com'}`
  : `http://localhost:${port}`;

module.exports = {
    port: process.env.PORT || 8080,
    sessionSecret: process.env.SESSION_SECRET,
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        sessionSecret: process.env.SESSION_SECRET,
        callbackURL: `${baseUrl}/auth/github/callback`,
        scope: ['read:user', 'user:email'],
    },    
};