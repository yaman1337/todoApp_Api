require("dotenv").config();
module.exports = {
  JWTSECRET: process.env.JWTSECRET,
  DB_URL: process.env.DB_URL,
  SERVER_PORT: process.env.SERVER_PORT,
};
