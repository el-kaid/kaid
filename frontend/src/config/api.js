const API_BASE_URL = process.env.REACT_APP_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    UPDATE_CONSULTANCY: `${API_BASE_URL}/api/auth/update-consultancy`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
    VERIFY_USER_DETAILS: `${API_BASE_URL}/api/auth/verify-user-details`,
    RESET_PASSWORD_WITH_OTP: `${API_BASE_URL}/api/auth/reset-password-with-otp`,
  },
  CONTACT: `${API_BASE_URL}/api/contact`,
  SELLERS: `${API_BASE_URL}/api/sellers`,
  HEALTH: `${API_BASE_URL}/health`,
};

export { API_BASE_URL };