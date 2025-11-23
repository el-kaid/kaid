const nodemailer = require('nodemailer');

async function sendOtpToUser(email, otp) {
  try {
    // Configure your email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"KAID-B1 Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your KAID-B1 Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">KAID-B1</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 14px;">Password Reset Verification</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
              <h2 style="color: #374151; margin: 0 0 20px 0; font-size: 24px;">Your OTP Code</h2>
              <p style="color: #6b7280; font-size: 16px; margin: 0 0 25px 0;">Use the following code to reset your password:</p>
              
              <div style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <div style="font-size: 36px; font-weight: bold; color: white; letter-spacing: 8px;">${otp}</div>
              </div>
              
              <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #ef4444; font-size: 14px; margin: 0; font-weight: 600;">⏰ This code expires in 10 minutes</p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
                If you didn't request this password reset, please ignore this email or contact our support team.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0;">
                © 2025 KAID-B1. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error.message);
    return { success: false, error: error.message };
  }
}

// You can add more email functions here in the future
async function sendWelcomeEmail(email, name) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"KAID-B1 Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to KAID-B1!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h1 style="color: #667eea; text-align: center;">Welcome to KAID-B1!</h1>
            <p>Hi ${name},</p>
            <p>Welcome to KAID-B1! Your account has been successfully created.</p>
            <p>You can now start using our services with enhanced security features.</p>
            <p>Best regards,<br>KAID-B1 Team</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { 
  sendOtpToUser,
  sendWelcomeEmail 
};
