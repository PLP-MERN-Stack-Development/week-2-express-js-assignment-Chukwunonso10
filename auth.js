// middleware/auth.js
const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'my-secret-key') {
    next(); // allow access
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
};
    
module.exports = auth;





