const nodemailer = require('nodemailer');
const fs = require('fs');

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
      from: `"KAID-B1 Support" <support@elkaid.com>`,
      replyTo: process.env.EMAIL_USER,
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
      from: `"KAID-B1 Support" <support@elkaid.com>`,
      replyTo: process.env.EMAIL_USER,
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

// Send contact form confirmation email
async function sendContactConfirmationEmail(contactData) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Email credentials not configured. Skipping email send.');
      console.warn('   Please set EMAIL_USER and EMAIL_PASS in your .env file');
      return { success: false, error: 'Email not configured' };
    }

    // Ensure we're using the email from .env file, not a hardcoded value
    const authEmail = process.env.EMAIL_USER;
    if (!authEmail) {
      throw new Error('EMAIL_USER is not set in .env file. Please set EMAIL_USER=idris@elkaid.com');
    }

    console.log(`📧 Attempting to send email to: ${contactData.email}`);
    console.log(`📧 Authenticating with: ${authEmail} (from .env file)`);
    console.log(`📧 Sending from: support@elkaid.com (alias/group)`);

    // IMPORTANT: For Google Workspace to show support@elkaid.com (not idris@elkaid.com):
    // You MUST configure "Send mail as" in Gmail settings:
    // 1. Go to: https://mail.google.com/mail/u/0/#settings/general
    // 2. Click "Accounts and Import" tab
    // 3. Under "Send mail as", click "Add another email address"
    // 4. Add: support@elkaid.com
    // 5. Verify it (Google will send a verification email)
    // 6. Make it default or select it when sending
    // Without this, Gmail will show idris@elkaid.com in the "from" field

    if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@elkaid.com')) {
      console.log('✅ Using Google Workspace');
      if (authEmail !== 'support@elkaid.com') {
        console.log('⚠️  IMPORTANT: Configure "Send mail as" in Gmail for support@elkaid.com');
        console.log('   Otherwise emails will show from:', authEmail, 'instead of support@elkaid.com');
      }
    }

    // Try multiple Gmail configurations for better compatibility
    // Create transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      requireTLS: true,
      auth: {
        // Authenticate with the email from .env file (should be idris@elkaid.com)
        // We'll send from support@elkaid.com (alias/group) in the mailOptions
        user: authEmail, // Uses EMAIL_USER from .env file
        pass: process.env.EMAIL_PASS, // App Password for the account in EMAIL_USER
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      debug: process.env.NODE_ENV === 'development', // Enable debug in development
      logger: process.env.NODE_ENV === 'development'
    });

    // Google Workspace Configuration:
    // - Authenticate with: idris@elkaid.com (real account) via EMAIL_USER
    // - Send from: support@elkaid.com (alias/group)
    // - Customers will see: support@elkaid.com (not idris@elkaid.com)
    const mailOptions = {
      from: `"EL KAID Support" <support@elkaid.com>`,
      replyTo: 'support@elkaid.com', // Replies go to support@elkaid.com
      to: contactData.email,
      // Use envelope to set the actual sender address
      // This helps Google Workspace recognize the alias
      envelope: {
        from: 'support@elkaid.com',
        to: contactData.email
      },
      subject: `Thank you for contacting EL KAID - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #667eea; margin: 0; font-size: 28px; font-weight: bold;">EL KAID</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Thank You for Contacting Us</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <p style="color: #374151; font-size: 16px; margin: 0 0 10px 0;"><strong>Hi ${contactData.name},</strong></p>
              <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.6;">
                Thank you for reaching out to EL KAID! We've received your inquiry and our team will get back to you as soon as possible.
              </p>
            </div>

            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Your Inquiry Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Subject:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Inquiry Type:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.inquiryType}</td>
                </tr>
                ${contactData.company ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Company:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.company}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Message:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.message}</td>
                </tr>
              </table>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                ⏰ Expected Response Time: ${contactData.estimatedResponseTime || '< 2 hours'}
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0; line-height: 1.6;">
              If you have any urgent questions, please don't hesitate to reach out to us directly.
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2025 EL KAID. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Verify transporter connection first
    try {
      await transporter.verify();
      console.log('✅ Email server connection verified');
    } catch (verifyError) {
      console.error('❌ Email server verification failed:', verifyError.message);
      console.error('');
      console.error('   🔍 DIAGNOSIS:');
      if (verifyError.message.includes('535') || verifyError.message.includes('BadCredentials')) {
        console.error('   Authentication failed. Possible reasons:');
        console.error('   1. ❌ EMAIL_USER does not exist as a Google account');
        console.error('      → If using support@elkaid.com, it must be a Google Workspace account');
        console.error('      → If it\'s not Google Workspace, use a Gmail account instead');
        console.error('   2. ❌ Wrong App Password');
        console.error('      → Make sure you generated an App Password (not regular password)');
        console.error('      → App Password must be for the same account as EMAIL_USER');
        console.error('   3. ❌ 2-Step Verification not enabled');
        console.error('      → App Passwords require 2-Step Verification');
        console.error('');
        console.error('   💡 SOLUTION:');
        console.error('   Option A: Use your Google Workspace account (idris@elkaid.com)');
        console.error('      → Set EMAIL_USER=idris@elkaid.com');
        console.error('      → Generate App Password for idris@elkaid.com');
        console.error('      → Emails will be sent FROM support@elkaid.com (alias)');
        console.error('      → This is the recommended setup for your case');
        console.error('');
        console.error('   Option B: Use support@elkaid.com directly (if it\'s a real account)');
        console.error('      → Set EMAIL_USER=support@elkaid.com');
        console.error('      → Generate App Password for support@elkaid.com');
        console.error('      → Only works if support@elkaid.com is a real account, not just an alias');
      } else {
        console.error('   This usually means:');
        console.error('   1. Wrong email/password');
        console.error('   2. Gmail requires App Password (not regular password)');
        console.error('   3. 2-Step Verification must be enabled');
      }
      throw verifyError;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Contact confirmation email sent successfully!`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   To: ${contactData.email}`);
    console.log(`   From: ${process.env.EMAIL_USER}`);
    console.log(`   Subject: ${mailOptions.subject}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending contact confirmation email:');
    console.error('   Error message:', error.message);
    console.error('   Error code:', error.code);
    console.error('   Error responseCode:', error.responseCode);
    console.error('   Error response:', error.response);

    // Provide helpful error messages
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      console.error('');
      console.error('   ⚠️ AUTHENTICATION FAILED!');
      console.error('   Common causes:');
      console.error('   1. Using regular Gmail password instead of App Password');
      console.error('   2. App Password is incorrect');
      console.error('   3. 2-Step Verification not enabled');
      console.error('');
      console.error('   📝 How to fix:');
      console.error('   1. Go to: https://myaccount.google.com/security');
      console.error('   2. Enable 2-Step Verification');
      console.error('   3. Go to: https://myaccount.google.com/apppasswords');
      console.error('   4. Generate an App Password for "Mail"');
      console.error('   5. Use that 16-character password in EMAIL_PASS');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('   ⚠️ Connection failed. Check internet connection and firewall settings.');
    } else if (error.response) {
      console.error('   ⚠️ Email service error:', error.response);
    } else if (error.code === 'EENVELOPE') {
      console.error('   ⚠️ Invalid email address format.');
    }

    return { success: false, error: error.message };
  }
}

// Send inquiry notification to support@elkaid.com
async function sendInquiryNotificationToSupport(contactData) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Email credentials not configured. Skipping support notification.');
      return { success: false, error: 'Email not configured' };
    }

    const authEmail = process.env.EMAIL_USER;
    if (!authEmail) {
      throw new Error('EMAIL_USER is not set in .env file');
    }

    console.log(`📧 Sending inquiry notification to: support@elkaid.com`);
    console.log(`📧 From customer: ${contactData.email}`);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: authEmail,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    });

    const mailOptions = {
      from: `"EL KAID Support" <support@elkaid.com>`,
      replyTo: contactData.email, // Replies go directly to the customer
      to: 'support@elkaid.com',
      subject: `New Contact Inquiry: ${contactData.subject}`,
      envelope: {
        from: 'support@elkaid.com',
        to: 'support@elkaid.com'
      },
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 20px;">
              <h1 style="color: #667eea; margin: 0; font-size: 28px; font-weight: bold;">EL KAID</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">New Contact Inquiry Received</p>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                🔔 New inquiry received from website contact form
              </p>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 20px;">Customer Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 150px;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;"><a href="mailto:${contactData.email}" style="color: #667eea;">${contactData.email}</a></td>
                </tr>
                ${contactData.company ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Company:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.company}</td>
                </tr>
                ` : ''}
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${contactData.phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Inquiry Type:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; text-transform: capitalize;">${contactData.inquiryType}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Inquiry Details</h3>
              <div style="margin-bottom: 15px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;"><strong>Subject:</strong></p>
                <p style="color: #374151; font-size: 14px; margin: 0; padding: 10px; background: #f9fafb; border-radius: 5px;">${contactData.subject}</p>
              </div>
              <div>
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;"><strong>Message:</strong></p>
                <div style="color: #374151; font-size: 14px; padding: 15px; background: #f9fafb; border-radius: 5px; white-space: pre-wrap; line-height: 1.6;">${contactData.message}</div>
              </div>
            </div>

            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
              <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 600;">
                💡 Quick Actions:
              </p>
              <p style="color: #1e40af; font-size: 13px; margin: 5px 0 0 0;">
                • Reply directly to this email to respond to ${contactData.name}<br>
                • Expected response time: ${contactData.estimatedResponseTime || '< 2 hours'}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This is an automated notification from the EL KAID contact form.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Verify and send
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('❌ Email server verification failed for support notification:', verifyError.message);
      throw verifyError;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Inquiry notification sent to support@elkaid.com`);
    console.log(`   Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending inquiry notification to support:', error.message);
    return { success: false, error: error.message };
  }
}

async function sendJobApplicationNotification(applicationData) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Email credentials not configured. Skipping job application notification.');
      return { success: false, error: 'Email not configured' };
    }

    const authEmail = process.env.EMAIL_USER;
    if (!authEmail) {
      throw new Error('EMAIL_USER is not set in .env file');
    }

    console.log(`📧 Sending job application notification to: hello@elkaid.com`);
    console.log(`📧 From applicant: ${applicationData.email}`);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: authEmail,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    });

    // Prepare attachments if resume exists
    const attachments = [];
    if (applicationData.resumePath && fs.existsSync(applicationData.resumePath)) {
      attachments.push({
        filename: applicationData.resumeFileName || 'resume.pdf',
        path: applicationData.resumePath
      });
    }

    const mailOptions = {
      from: `"EL KAID Careers" <support@elkaid.com>`,
      replyTo: applicationData.email,
      to: 'hello@elkaid.com',
      subject: `New Job Application: ${applicationData.name}`,
      envelope: {
        from: 'support@elkaid.com',
        to: 'hello@elkaid.com'
      },
      attachments: attachments,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-center; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 20px;">
              <h1 style="color: #667eea; margin: 0; font-size: 28px; font-weight: bold;">EL KAID</h1>
              <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">New Job Application Received</p>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                🎯 New job application received from careers page
              </p>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 20px;">Applicant Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 150px;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;"><a href="mailto:${applicationData.email}" style="color: #667eea;">${applicationData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;"><a href="tel:${applicationData.phone}" style="color: #667eea;">${applicationData.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Address:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.address}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Country:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.country}</td>
                </tr>
              </table>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 20px;">Professional Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                ${applicationData.yearsOfExperience ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 200px;"><strong>Experience:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.yearsOfExperience}</td>
                </tr>
                ` : ''}
                ${applicationData.currentCompany ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Current Company:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.currentCompany}</td>
                </tr>
                ` : ''}
                ${applicationData.noticePeriod ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Notice Period:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.noticePeriod}</td>
                </tr>
                ` : ''}
                ${applicationData.expectedSalary ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Expected Salary:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.expectedSalary}</td>
                </tr>
                ` : ''}
                ${applicationData.availabilityDate ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Availability Date:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;">${applicationData.availabilityDate}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            ${applicationData.linkedIn || applicationData.portfolio ? `
            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 20px;">Additional Links</h2>
              <table style="width: 100%; border-collapse: collapse;">
                ${applicationData.linkedIn ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 150px;"><strong>LinkedIn:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;"><a href="${applicationData.linkedIn}" target="_blank" style="color: #667eea;">${applicationData.linkedIn}</a></td>
                </tr>
                ` : ''}
                ${applicationData.portfolio ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Portfolio:</strong></td>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px;"><a href="${applicationData.portfolio}" target="_blank" style="color: #667eea;">${applicationData.portfolio}</a></td>
                </tr>
                ` : ''}
              </table>
            </div>
            ` : ''}

            ${applicationData.motivation ? `
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Cover Letter / Motivation</h3>
              <div style="color: #374151; font-size: 14px; padding: 15px; background: #f9fafb; border-radius: 5px; white-space: pre-wrap; line-height: 1.6;">${applicationData.motivation}</div>
            </div>
            ` : ''}

            ${applicationData.resumeFileName ? `
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
              <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 600;">
                📎 Resume Attached: ${applicationData.resumeFileName}
              </p>
              <p style="color: #1e40af; font-size: 13px; margin: 5px 0 0 0;">
                The resume has been attached to this email.
              </p>
            </div>
            ` : ''}

            ${applicationData.pancard ? `
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;"><strong>PAN Card:</strong> ${applicationData.pancard}</p>
            </div>
            ` : ''}

            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
              <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 600;">
                💡 Quick Actions:
              </p>
              <p style="color: #1e40af; font-size: 13px; margin: 5px 0 0 0;">
                • Reply directly to this email to contact ${applicationData.name}<br>
                • Application ID: ${applicationData.applicationId}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This is an automated notification from the EL KAID careers page.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Verify and send
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('❌ Email server verification failed for job application notification:', verifyError.message);
      throw verifyError;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Job application notification sent to hello@elkaid.com`);
    console.log(`   Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending job application notification:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendOtpToUser,
  sendWelcomeEmail,
  sendContactConfirmationEmail,
  sendInquiryNotificationToSupport,
  sendJobApplicationNotification
};
