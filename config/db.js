const mongoose = require("mongoose");

const connect_db =mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connect to Databse..")
    })
    .catch((err) => {
        console.log(err);
    })

module.exports=connect_db;