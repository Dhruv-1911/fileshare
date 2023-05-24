require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path")
const db = require('./config/db');
const bodyParser = require('body-parser');
PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use(express.static('public'))
app.use("/api/files",require("./routes/files"))
app.use("/files",require("./routes/show"))
app.use('/files/download',require("./routes/download"))

const start =async ()=>{
    try {
        //connect database
        await db;
        app.listen(PORT ,()=>{
            console.log(`listening on ${PORT} port...`);
        })
        
    } catch (error) {
        console.log(error);
    }
}
start();