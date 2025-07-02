import bcrypt from 'bcrypt';


export const hashedpassword = async(hashpassword)=>{
const salt = 10
const hashing = bcrypt.hash(hashpassword,salt);
return hashing
}


    export const comparepasssword = async (hashpassword,hashing)=>{
        const isMatch = await bcrypt.compare(hashpassword,hashing)
        return isMatch
    }

