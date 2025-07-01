import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY_2,
    api_secret:process.env.CLOUD_API_SECRET_2
});

export const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'QuizCards',
        allowed_formats:['jpg','png','pdf'],
        resource_type:'auto'
    }
})


