import {React,useEffect} from 'react'
import GooglegithubloginV3Captcha from '../../UserScreensPage/GooglegithubloginV3Captcha';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';
import loginimage from '../../assets/LoginImages/loginimage.png'
import GoogleLogin from '../../UserScreensPage/GoogleLogin';



const Checkauthgooglegithub = () => {

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      // Use the message if available, otherwise use the error code
      toast.error(message || error);
      
      // Clean the URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); 


  return (
<>     


<div className='main2 flex justify-center items-center min-h-screen px-4'>
  <div className='main bg-[var(--background)] rounded-[40px] w-[80vw] h-[51vw] flex items-center flex-wrap md:flex-nowrap'>
    
    {/* Image Section (hidden on mobile) */}
    <div className='img w-[90%] md:w-1/2 h-[45vw] m-5 hidden md:block'>
      <img src={loginimage} className='rounded-[24px] h-full w-full object-cover' alt="" />
    </div>

    {/* Content Section */}
    <div className='w-full md:w-1/2 rounded-[24px] h-auto md:h-[45vw] m-5'>
      <div className='text-center'>
        <h1 className='font-semibold text-2xl text-[var(--text)]'>Start Smarter, Learn Faster</h1>
        <p className='text-[var(--text)]'>Login to your AI-powered education hub.</p>
      </div>

      <div className='text-center mt-4'>
        <GoogleLogin />
      </div>

      <div>
<GoogleReCaptchaProvider  reCaptchaKey="6LeSgVsrAAAAACWzWYsGB-IvtAHdtHlU3J5KAVOA" >

    <GooglegithubloginV3Captcha/>

</GoogleReCaptchaProvider>

  
      </div>

      <p className='text-[var(--text)] text-sm md:text-[1.3vw] text-center mt-7'>
        By continuing, you agree to Snap Study's 
        <span className='text-[var(--Accent)] border-b mx-1'>Terms</span> 
        and 
        <span className='text-[var(--Accent)] border-b mx-1'>Privacy Policy</span>.
      </p>
    </div>
  </div>
</div>


    

  </>
  )
}

export default Checkauthgooglegithub