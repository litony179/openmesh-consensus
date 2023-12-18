export const decrypttoken = (jwttoken: any) => {
    const jwt = require("jsonwebtoken");
      // if error console.log the jwt token
    const token = "YOUR_JWTHERE";
    const secretOrPublicKey = "YOUR_SECRET_OR_PUBLIC_KEY";
  
    try {
      const decoded = jwt.verify(token, secretOrPublicKey);
      console.log(decoded);
    } catch (err) {
      console.error("Invalid or expired token");
    }
  };
  