import { hash, compare } from "bcryptjs";
import { User } from "../../../models/user";
import { connectToDB } from "../../../lib/mongodb";
import { sendEmail } from "../../../lib/sendEmail";
import { verifyEmail } from "../../../lib/mailer";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    await connectToDB();
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10); // Use hash function directly here
    try {
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error:"User already exist!"})
        }
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        //generate token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        try{
            await verifyEmail(email,token);            
        }catch(error){
            res.status(500).json({ message: "Email verification failed" });
            console.log(error);
            
        }
        await sendEmail(email, `Welcome ${name}!\n\nThanks for signing up with challo ghume\n\nHappy travels!`);
        res.status(201).json({ message: "User created successfully" });
       
       
    } catch (error) {
        res.status(500).json({ message: "User creation failed" });
    }
}
