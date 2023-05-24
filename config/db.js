const mongoose = require("mongoose");

const connect_db =mongoose.connect('mongodb://localhost:27017/fileShare')
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

module.exports=connect_db;