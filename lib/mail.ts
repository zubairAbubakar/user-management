import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Two-Factor Authentication Token',
      html: `<p>Your two-factor authentication token is: <strong>${token}</strong></p>`,
    });
  } catch (error) {
    console.error('💥 Error in sendTwoFactorTokenEmail:', error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const resetLink = `${DOMAIN}/auth/new-password?token=${token}`;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  } catch (error) {
    console.error('💥 Error in sendPasswordResetEmail:', error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    // Validate inputs
    if (!email || !token) {
      console.error('❌ Missing required parameters:', {
        email: !!email,
        token: !!token,
      });
      return;
    }

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not found in environment variables');
      return;
    }

    const confirmationLink = `${DOMAIN}/auth/email-verification?token=${token}`;

    // Use Resend's default domain first for testing
    const fromEmail = 'onboarding@resend.dev'; // Resend's default verified domain

    const emailData = {
      from: fromEmail,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`,
    };

    const response = await resend.emails.send(emailData);

    if (response?.error) {
      console.error('❌ Resend API Error:', response.error);
    } else if (response?.data?.id) {
      console.log('✅ Email sent successfully! ID:', response.data.id);
    } else {
      console.warn('⚠️ Unexpected response format:', response);
    }
  } catch (error) {
    console.error('💥 Error in sendVerificationEmail:', error);

    // Log additional error details
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
};
