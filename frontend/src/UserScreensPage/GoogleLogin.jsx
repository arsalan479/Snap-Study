import {React,useState,useRef} from 'react'
import { axiosinstance } from '../AxiosInstance/axios.js';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


// import ReCAPTCHA from 'react-google-recaptcha';

const GoogleLogin = () => {

// const sitekeyV2 = "6LczM1orAAAAANHnVgjcrv65_juy5_xacZ7Sl8dw"; // Replace with your actual site key


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [eyepassword, seteyepassword] = useState(false)
    // const recaptchaRef = useRef(null);



const tooglepassword = ()=>{
  seteyepassword((prev)=>!prev)
}

    const submithandler = async(e)=>{
        e.preventDefault()
        
    //     const token = recaptchaRef.current?.getValue();

    // if (!token) {
    //   toast.error("Please complete the reCAPTCHA.")
    //   return;
    // }
    try {
      

// Step 1: Verify reCAPTCHA token
      // const captchaVerifyRes = await axiosinstance.post(
      //   "/auth/verify-captcha-V2",
      //   { token }
      // );

      // if (!captchaVerifyRes.data.success) {
      //   setError("reCAPTCHA verification failed.");
      //   return;
      // }

           if (!email && !password) {
    toast.error("Email and Password are required");
    return;
  }
  if (!email) {
    toast.error("Email is required");
    return;
  }
  if (!password) {
    toast.error("Password is required");
    return;
  }


          const userdata ={
              email,
              password
          }
 

        const response = await toast.promise(
          axiosinstance.post('/auth/magic/googleinputlogin',
              userdata
            ),
        {
          loading:"Login User...",
          success:"User Login Successfully!",
        })
        
            const data = response.data;

          


            if(data.success && data.redirectURL){
              

              setTimeout(()=>{
                window.location.href = data.redirectURL;
              },2000)
            }

        } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || status === 403 || status === 404) {
        toast.error(data.message);
      } else {
        toast.error(data.message || "Something went wrong. Try again.");
      }

    } else {
      toast.error("Network error. Try again.");
    }
  }
      }

   const forgetpasswordbyId = async () => {

    try {
      const {response} = await toast.promise(
         axiosinstance.post('/auth/magic/forgetPasswordById',   
      { email }
    ),{
      loading:"Forget Password...",
      success:"Check Your Email And Verify On it!",
    }
      )

    } catch (error) {
      // console.error('Forgot Password Error:', error);
      if(error.response){
        const {status,data} = error.response;

        if(status===400){
          toast.error(data.message)
        }else if(status===403){
          toast.error(data.message)
        }else{
          toast.error('Something went wrong. Try again later.')
        }
        
      }else{
        toast.error('Network Error Please Try Again!')

      }
    }
  };

  return (
   <div>
  <form onSubmit={submithandler}>
    
    <input
      type="email"
      name="email"
      value={email}
      onChange={(e) => setemail(e.target.value)}
      placeholder="Enter your email"
      className="w-full px-4 py-2 border border-white text-[var(--text)] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
    />

    <div className="relative w-full mt-4">
  <input
    type={eyepassword ? 'text' : 'password'}
    name="password"
    value={password}
    onChange={(e) => setpassword(e.target.value)}
    placeholder="Enter your password"
    className="w-full px-4 py-2 border text-[var(--text)] border-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
  />
  
  {/* Toggle eye icon */}
  <span
    onClick={tooglepassword}
    className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
  >
    {eyepassword ? (
      <EyeSlashIcon className="h-5 w-5 text-white" />
    ) : (
      <EyeIcon className="h-5 w-5 text-white" />
    )}
  </span>
</div>

        {/* Google reCAPTCHA  */}
        {/* <div className="mb-6">
          <ReCAPTCHA sitekey={sitekeyV2} ref={recaptchaRef} />
        </div> */}
    <button
      type="submit"
      className="font-semibold w-full mt-4 cursor-pointer bg-[var(--button)] hover:bg-[var(--hover)] text-white font-medium py-3 rounded-[15px] transition-all duration-200"
    >
      Continue
    </button>

<div className='flex justify-center gap-10 mt-4'>  
  <p className=" text-sm text-center">
      <span  onClick={forgetpasswordbyId}  className="text-[var(--Accent)] cursor-pointer hover:underline">Forget Password</span>
    </p>

    <p className="text-sm text-center text-gray-400">
      Don’t have an account? <Link to='/googleregister'><span className="text-[var(--Accent)] cursor-pointer hover:underline">Sign up</span></Link>
    </p>
</div>
  </form>
</div>

  )
}

export default GoogleLogin