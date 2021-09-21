var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
//var ejs = require("ejs")
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

/*const details = {
    name: String,
    email: String,
    gender: String,
    file: String,
    link: String
}*/

//const student = mongoose.model('student',details);

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var male = req.body.male;
    var female = req.body.female;
    var other = req.body.other;
    var image = req.body.image;
    var link = req.body.link;


    var data = {
        "name": name,
        "email" : email,
        "male": male,
        "female":female,
        "other":other,
        "image":image, 
        "link" : link
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Submited Successfully");
    });

    return res.redirect('signup.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");
