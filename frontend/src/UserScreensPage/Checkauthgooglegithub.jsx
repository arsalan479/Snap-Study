import {React,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import GooglegithubloginV3Captcha from './GooglegithubloginV3Captcha';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';




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
    
<GoogleReCaptchaProvider  reCaptchaKey="6LeSgVsrAAAAACWzWYsGB-IvtAHdtHlU3J5KAVOA" >

    <GooglegithubloginV3Captcha/>

</GoogleReCaptchaProvider>





<div style={{padding:20}}>
  <h1>Google Input SignUp</h1>
  <Link to='/googleregister'>
  <button className='cursor-pointer bg-green-300 px-6 py-3 rounded-sm'>SignUp</button>      
</Link>
</div>


<h1 className='text-center font-bold text-8xl text-[#172144]'>hello world</h1>

  </>
  )
}

export default Checkauthgooglegithub