import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

export const initEmail = () => {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
  }
};

export const sendWelcomeEmail = async (userData) => {
  try {
    const templateParams = {
      user_name: userData.name,
      user_email: userData.email,
      message: 'Welcome to PetCare Pro! We are excited to help you care for your companions.',
      admin_note: `New user registered: ${userData.name} (${userData.email})`
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Welcome email and admin notification sent!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
};

export const sendLoginNotification = async (userData) => {
  try {
    const templateParams = {
      user_email: userData.email,
      message: `A new login was detected for your account: ${userData.email}`,
      admin_note: `User logged in: ${userData.email}`
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('Login notification sent!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('Failed to send login notification:', error);
    throw error;
  }
};
