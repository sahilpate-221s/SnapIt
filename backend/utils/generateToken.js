import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      maxAge: 3 * 60 * 60 * 24 * 1000, // 3 days
      httpOnly: true,
      sameSite: "Strict",
    //   secure: process.env.NODE_ENV === "production", // Only set secure flag in production
    });

    // console.log(token);
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default generateToken;