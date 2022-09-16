const mongoose = require('mongoose')
const username = "Sayanm2345";
const password = "Myselfsayan4455";
const cluster = "notebook";
const dbname = "notebook";
const mongoURI = `mongodb+srv://${username}:${password}@${cluster}.zf2xrhd.mongodb.net/${dbname}?retryWrites=true&w=majority`
// const mongoURI = `mongodb+srv://Sayanm2345:Myselfsayan4455@notebook.zf2xrhd.mongodb.net/notebook?retryWrites=true&w=majority`

const connectToDB = ()=>{ 
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to database successfully!");
    }).catch((err)=> console.log(err.message))
}


module.exports = connectToDB;