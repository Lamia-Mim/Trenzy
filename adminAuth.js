import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    // Header  token  (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Role check
    if (decoded.role !== 'admin' || decoded.sub !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Admin info req attach
    req.admin = { email: decoded.sub };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default adminAuth;
