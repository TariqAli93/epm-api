import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] !== undefined ? req.headers.authorization.split(" ")[1] : "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    const errors = {
      "jwt malformed": "رمز الوصول غير صالح",
      "jwt expired": "انتهت صلاحية الجلسة يرجى تسجيل الدخول مرة اخرى",
      "invalid token": "رمز الوصول غير صالح",
      "jwt must be provided": "لم يتم العثور على رمز الوصول",
    };
    const TransError = errors[error.message];
    return res.status(401).send(TransError);
  }
};

export default checkAuth;
