import jwt from "jsonwebtoken";

// doctor Authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not authorized Login Again",
      });
      console.log(error);
    } 
    const tokenData = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = tokenData.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
