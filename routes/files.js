require('dotenv').config();
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../model/file");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../services/emailservices");
const html = require("../services/emailTemplate");
const { log } = require('console');

//multer use for upload file
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads")
    }, filename: function (req, file, cb) {
        
        cb(null, `${file.originalname.split(".")[0]}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

  /**
   * @function upload_file
   * @description This method upload file in db 
   * @author Dhruv K
   */
const upload = multer({
    storage,
    limit: { filesize: 1000000 * 10000 } //10 gb file
}).single("myfile");

router.post('/', (req, res) => {

    try {
        //store file
        upload(req, res, async (err) => {
            //check send file is validate request or not
            if (!req.file) {
                return res.json({ error: "all fields are required" })
            }
            if(err){
                return res.status(500).json({message:err.message})
            }
    
            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                size: req.file.size,
                path: req.file.path
            })
    
            const response = await file.save();
            return res.json({ files: `${process.env.URL}/files/${response.uuid}` })
        })
        
    } catch (error) {
        console.log('error: ', error);
        
    }
});

  /**
   * @function send_email
   * @description This method send file to the other email address
   * @author Dhruv K
   */
router.post('/send', async (req, res) => {
    //validate req
    const { uuid, To, from } = req.body
    if (!uuid || !To || !from) {
        return res.status(422).send({ error: "All field require" })
    }
    const file = await File.findOne({ uuid: uuid });
    
    if (file.sender) {
        return res.status(422).send({ error: "email alerady send" })
    }

    file.sender = from;
    file.receiver = To;
    const response = await file.save();

    //send mail
    sendMail({
        from: from,
        To: To,
        subject: "File Sharing",
        text: `${from} shared a file with you.`,
        html: html({
            from: from,
            downloadLink: `${process.env.URL}/files/${file.uuid}`,
            size: parseInt(file.size / 1000) + 'kb',
            expires: '24 hours'
        })
    }).then(() => {
            return res.json({ success: true });
        }).catch((err) => {
            
            return res.status(500).json({ error: 'Error in email sending.' });
        })
    })

module.exports = router