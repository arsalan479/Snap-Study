import axios from 'axios';
import { Router } from 'express';


const route = Router();


route.post('/verify-captcha-V3', async (req, res) => {
  const { token } = req.body;
  const secret = process.env.RECAPTCHA_SECRET_KEY_V3;

  try {
    const googleRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    if (googleRes.data.success && googleRes.data.score > 0.5) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'reCAPTCHA failed or suspicious behavior' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Verification error' });
  }
});


route.post('/verify-captcha-V2',async(req,res)=>{
  const {token} = req.body
    const secretkey = process.env.RECAPTCHA_SECRET_KEY_V2;

    try {


        const googleres = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params:{
                 secret: secretkey, // ✅ Correct key name
                    response:token
                }
            }
        )
        if(googleres.data.success){
            return res.status(200).json({success:true})
        }else{
            return res.status(400).json({success:false,message:"reCAPTCHA failed"})
        }
    } catch (error) {
        console.error('reCAPTCHA error:', error.message); // ✅ Log it!
        return res.status(500).json({ success: false, message: 'Verification error' });

    }
})

export default route;