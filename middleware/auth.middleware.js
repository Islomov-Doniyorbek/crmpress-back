const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "asd";

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token yo'q" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    console.log(decoded);
    
    next();
  } catch (err) {
    if(err.name === 'TokenExpiredError'){
      return res.status(401).json({ message: "Token muddati tugadi" });

    }
    return res.status(403).json({ message: "Token noto'g'ri yoki expired"+err });
  }
};