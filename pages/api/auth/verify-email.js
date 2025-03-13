import jwt from "jsonwebtoken";
import { connectToDB } from "../../../lib/mongodb";
import {User} from "../../../models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  await connectToDB();

  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Invalid or missing token" });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Find and update user
    const user = await User.findOneAndUpdate({ email }, { verified: true }, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.send("<h2>Email verified successfully! 🎉 You can now log in.</h2>");
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
}
