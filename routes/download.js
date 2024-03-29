require('dotenv').config();
const router = require("express").Router()
const File = require('../model/file')

  /**
   * @function upload_file
   * @description This Api use for download file
   * @author Dhruv K
   */

router.get("/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { error: "link has been expired" })
        }
        
        const filePath = `${__dirname}/../${file.path}`;
        res.download(filePath);

    } catch (error) {
        return res.render('download', { error: "sommthing went wrong" })
    }
})

module.exports = router