import jwt from "jsonwebtoken";

// user Authentication middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized Login Again",
      });
    } 
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenData.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
