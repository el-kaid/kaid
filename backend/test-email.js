require('dotenv').config();
const { sendContactConfirmationEmail } = require('./utils/sendMail');

// Test email configuration
async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Check if credentials are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ EMAIL_USER or EMAIL_PASS not set in .env file');
    console.log('\n📝 Please add to your backend/.env file:');
    console.log('   EMAIL_USER=your-email@gmail.com');
    console.log('   EMAIL_PASS=your-app-password');
    process.exit(1);
  }

  console.log(`📧 Email User: ${process.env.EMAIL_USER}`);
  console.log(`🔑 Email Pass: ${process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET'}\n`);

  // Get test email from command line or use EMAIL_USER
  const testEmail = process.argv[2] || process.env.EMAIL_USER;
  
  console.log(`📨 Sending test email to: ${testEmail}\n`);

  try {
    const result = await sendContactConfirmationEmail({
      name: 'Test User',
      email: testEmail,
      subject: 'Test Email from EL KAID',
      message: 'This is a test email to verify your email configuration is working correctly. If you receive this, your email setup is successful!',
      inquiryType: 'general',
      company: 'Test Company',
      estimatedResponseTime: '< 2 hours'
    });

    if (result.success) {
      console.log('\n✅ SUCCESS! Test email sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`   Please check your inbox (and spam folder) at: ${testEmail}`);
    } else {
      console.log('\n❌ FAILED to send test email');
      console.log(`   Error: ${result.error}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
}

testEmail();


