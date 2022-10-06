const { expressjwt } = require("express-jwt");
require("dotenv/config");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;

  return expressjwt({
    secret: secret,
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback,
  }).unless({
    path: [
      // backend/public/uploads
      // regular expressions
      // ^(.+)\/([^\/]+)$
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevokedCallback(req, { payload }) {
  if (payload.isAdmin === false) {
    return true;
  }
  return false;
}

module.exports = authJwt;
