        import { check, validationResult } from 'express-validator';


        export const registervalidator = [

            check('email')
            .notEmpty().withMessage('Email Is Required')
            .isEmail().withMessage('Enter a Valid Email'),


            check('displayName')
            .notEmpty().withMessage('DisplayName Is Required')
            .isLength({min:3,max:40}).withMessage("DisplayName must be atleast 3 character")
            .matches(/^[A-Za-z\s]+$/).withMessage('Display Name only taking a alphabates not numbers'),

            check('password')
            .notEmpty().withMessage('Password Is Required')
            .isLength({min:8}).withMessage('password must be at least 8 character')
            .matches(/[0-9]/).withMessage('password must contain a number')
            .matches(/[!@#$%&*]/).withMessage('password must contain a special character'),

        (req,res,next)=>{
            
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                const extractedErrors = errors.array().map(err=>({field:err.param,msg:err.msg}));
                return res.status(400).json({
                    success:false,
                    message:"Validation Failed",
                    errors:extractedErrors
                })

            }
            next()
        }


        ]