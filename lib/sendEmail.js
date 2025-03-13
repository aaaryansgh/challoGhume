const nodemailer=require('nodemailer');

export const sendEmail=async(to,text)=>{
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
            to,
            subject:"Welcome",
            text,
        };
        await transporter.sendMail(mailOption);
    } catch(error){
        console.error("Error sending email:",error)
    }
};

