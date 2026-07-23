const jwt = require('jsonwebtoken');


function attachUser(req, res, next) {
  const token = req.cookies.token;
  req.user = null;
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      req.user = null;
    }
  }
  res.locals.user = req.user; 
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) return res.redirect('/login');
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
}

module.exports = { attachUser, requireAuth, requireRole };
