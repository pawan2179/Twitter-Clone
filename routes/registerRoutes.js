const express = require('express');
const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema')
const app = express();
const bcrypt = require('bcrypt')

const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    res.status(200).render("register");
})

router.post("/", async (req, res, next) => {

    var firstname = req.body.firstname.trim();
    var lastname = req.body.lastname.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstname && lastname && username && password && email) {
        var user = await User.findOne({
            $or: [
                { username: username},
                { email: email}
            ]
        })
        .catch((error) => {
            console.log(error);
        });

        if(user == null) {
            var data = req.body
            data.password = await bcrypt.hash(password, 10);

            User.create(data)
            .then((user) => {
                req.session.user = user;
                return res.redirect("/");
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
            if(email == user.email) {
                payload.errorMessage = "Email Already in use.";
            }
            else{
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }
    }
    else {
        payload.errorMessage = "Make sure the values entered are valid."
        res.status(200).render("register", payload);
    }
})

module.exports = router