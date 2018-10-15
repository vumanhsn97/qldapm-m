var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://admin:admin123@ds143932.mlab.com:43932/apinodejs');
var faker = require("faker");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8888, function() {
});

var userSchema = new mongoose.Schema({
    email: String,
    password: String
});

var userModel = mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    userModel.find({}).exec((err, user) => {
        if (!err) {
            res.status(200).json(user);
        }
    });
    
});

app.post("/", function(req, res){
    userModel.create(req.body);
    res.status(201).json(req.body);
});

app.get("/user", function(req, res) {
    var data = ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email()
    })
    res.status(200).send(data);
});
