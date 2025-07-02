import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { axiosinstance } from "../AxiosInstance/axios.js";
import toast from 'react-hot-toast';
import Dashboard from './Dashboard.jsx';
import googlepng from '../assets/LoginImages/googlepng.png'
import githublogo from '../assets/LoginImages/github-seeklogo.png'

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
      <div>
        <button
          className="flex items-center justify-center gap-2 cursor-pointer bg-[var(--button)] hover:bg-[var(--hover)] transition-colors duration-200 w-full mt-4 rounded-[15px] text-white font-semibold py-3"
          onClick={loginWithGoogle}
        >
          <img src={googlepng} className="w-5 h-5 object-cover" alt="Google" />
          Continue With Google
        </button>
      </div>

      <div>
        <button
          className="flex items-center justify-center gap-2 cursor-pointer bg-[var(--button)] hover:bg-[var(--hover)] transition-colors duration-200 w-full mt-4 rounded-[15px] text-white font-semibold py-3"
          onClick={loginWithGithub}
        >
          <img src={githublogo} className='w-6 h-6 object-cover' alt="" />
          Continue With GitHub
        </button>
      </div>
    </div>
  );
};

export default GooglegithubloginV3Captcha;
