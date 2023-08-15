const jwt = require('jsonwebtoken');

const secretKey = 'qwertyuiojjjfdddds'; // Change this to your actual secret key

exports.generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
