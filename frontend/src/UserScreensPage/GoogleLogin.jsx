import {React,useState,useRef} from 'react'
import { axiosinstance } from '../AxiosInstance/axios.js';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


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
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <form
    onSubmit={submithandler}
    className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm space-y-6"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

    <input
      type="email"
      name="email"
      value={email}
      onChange={(e) => setemail(e.target.value)}
      placeholder="Enter your email"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type={eyepassword ? 'text' : 'password'}
      name="password"
      value={password}
      onChange={(e) => setpassword(e.target.value)}
      placeholder="Enter your password"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <span
    onClick={tooglepassword}
     style={{
          position: 'absolute',
          right:"36%",
          top: '48%',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
    >
      {eyepassword ? <EyeSlashIcon className='h-5 w-5'/> : <EyeIcon className='h-5 w-5'/>}
    </span>

        {/* Google reCAPTCHA  */}
        {/* <div className="mb-6">
          <ReCAPTCHA sitekey={sitekeyV2} ref={recaptchaRef} />
        </div> */}
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200"
    >
      Login
    </button>

<p className="text-sm text-center text-gray-500">
      <span  onClick={forgetpasswordbyId}  className="text-blue-600 cursor-pointer hover:underline">Forget Password</span>
    </p>

    <p className="text-sm text-center text-gray-500">
      Don’t have an account? <span className="text-blue-600 cursor-pointer hover:underline">Sign up</span>
    </p>
  </form>
</div>

  )
}

export default GoogleLogin