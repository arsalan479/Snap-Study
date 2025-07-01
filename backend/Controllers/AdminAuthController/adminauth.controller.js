export const getauser = async(req,res)=>{
try {
    res.send("hello admin")
} catch (error) {
    console.log("admin error",error)
}
}