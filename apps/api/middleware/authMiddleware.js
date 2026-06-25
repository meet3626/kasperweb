const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (permission) => {
  return (req, res, next) => {
    if (req.admin && req.admin.permissions[permission]) {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized for this action' });
    }
  };
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (req.admin && roles.includes(req.admin.role)) {
      next();
    } else {
      res.status(403).json({ message: `Role (${req.admin ? req.admin.role : 'none'}) is not allowed to access this resource` });
    }
  };
};

module.exports = { protect, authorize, authorizeRoles };
