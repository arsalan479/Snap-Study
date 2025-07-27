import {React,useEffect} from 'react'
import GooglegithubloginV3Captcha from '../../UserScreensPage/GooglegithubloginV3Captcha';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import GoogleLogin from '../../UserScreensPage/GoogleLogin';
import CurvedLoop from '../../../ReactBits/CurvedLoop/CurvedLoop.jsx';



const Checkauthgooglegithub = () => {

  return (
<>     


<div className='main2 flex justify-center items-center min-h-screen '>
  <div className='main bg-[var(--background)] rounded-[40px] w-full h-full flex items-center flex-wrap md:flex-nowrap'>
    
    {/* Image Section (hidden on mobile) */}
   <div className="hidden lg:block lg:w-1/2 h-full">
        <div className="flex flex-col text-black  justify-center bg-white items-center  w-full h-screen">
          <h1 className="text-8xl tracking-tight">
            SnapStudy
            <span>
              <i className="text-2xl ri-circle-fill"></i>
            </span>
          </h1>
          <p className="tracking-tight pt-5 text-center p-6">
            Join thousands of learners on SnapStudy and unlock powerful tools
            designed to help you study smarter. Sign up now to access
            personalized resources, save your progress, and collaborate with
            peers all in one place. Start your learning journey with SnapStudy
            and reach your academic goals faster.
          </p>
          <CurvedLoop 
  marqueeText="Be ✦ Creative ✦ With ✦ Snap ✦ Study ✦"
  speed={4}
  curveAmount={500}
  direction="left"
  interactive={true}
  className="custom-text-style"
/>
        </div>
      </div>

    {/* Content Section */}
    <div className='w-full md:w-1/2 rounded-[24px] h-auto md:h-[45vw] p-10'>
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