import jwt from 'jsonwebtoken';


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email + Password 
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Token create 
      const token = jwt.sign(
        { sub: email, role: 'admin' }, // payload
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // options
      );
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

