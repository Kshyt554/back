module.exports = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.headers['x-user-role'];
      if (userRole !== requiredRole) {
        return res.status(403).json({
          uuAppErrorMap: { errorCode: 'Forbidden', message: 'Access denied.' }
        });
      }
      next();
    };
  };
  