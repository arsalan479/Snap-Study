import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from 'react-hot-toast';
import Dashboard from './Dashboard.jsx';

const GooglegithubloginV3Captcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyCaptcha = async (action) => {
    try {
      const token = await executeRecaptcha(action);
      const response = await axiosinstance.post('/auth/verify-captcha-V3', {
        token,
      });

      return response.data?.success;
    } catch (err) {
      console.error('Captcha verification error:', err);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const isHuman = await verifyCaptcha('login_google');

    try {
      
    if (isHuman) {
      window.open('http://localhost:3000/auth/google', '_self');
   
    } else {
      toast.error('reCAPTCHA verification failed. Please try again.')
    }
    } catch (error) {
     toast.error("Network Error Problem Please Try Again") 
    }

  };

  const loginWithGithub = async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const isHuman = await verifyCaptcha('login_github');

    if (isHuman) {
      window.open('http://localhost:3000/auth/github', '_self');
    } else {
      toast.error('reCAPTCHA verification failed. Please try again.')
    }
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <h1 className="text-black">Google Auth</h1>
        <button
          className="cursor-pointer bg-blue-500 px-6 py-3 rounded-sm text-white font-semibold"
          onClick={loginWithGoogle}
        >
          Login with Google
        </button>
      </div>

      <div style={{ padding: 20 }}>
        <h1 className="text-black">Github Auth</h1>
        <button
          className="cursor-pointer bg-black px-6 py-3 rounded-sm text-white font-semibold"
          onClick={loginWithGithub}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default GooglegithubloginV3Captcha;
