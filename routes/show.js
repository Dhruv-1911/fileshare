require('dotenv').config();
const router = require("express").Router()
const File = require('../model/file')

  /**
   * @function upload_file
   * @description This method render download page 
   * @author Dhruv K
   */
  
router.get("/:uuid", async (req,res)=>{
    try {
        const file = await File.findOne({uuid:req.params.uuid});
        if(!file){
            return res.render('download',{error:"sommthing went wrong"})
        }
        return res.render('download',{uuid:file.uuid , filename:file.filename , size :file.size ,downloadLink:`${process.env.URL}/files/download/${file.uuid}`})
    } catch (error) {
        return res.render('download',{error:"sommthing went wrong"})
    }
})

module.exports = router