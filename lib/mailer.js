const nodemailer=require('nodemailer');

export const verifyEmail=async(email,token)=>{
    const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;
    console.log(email);
    
    try{
        const transporter= nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
        });
        const mailOption={
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Welcome",
            html:`<h2>Welcome to TravelPlanner! 🌍</h2>
                    <p>Please click the link below to verify your email:</p>
                    <a href="${verificationLink}">Verify Email</a>`
        };
        await transporter.sendMail(mailOption);
    } catch(error){
        console.error("Error sending email:",error)
    }
};
