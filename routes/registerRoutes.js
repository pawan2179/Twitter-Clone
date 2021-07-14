const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({extended: false}))

router.get("/", (req, res, next) => {
    res.status(200).render("register");
})

router.post("/", (req, res, next) => {

    var firstname = req.body.firstname.trim();
    var lastname = req.body.lastname.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if(firstname && lastname && username && password && email) {

    }
    else {
        payload.errorMessage = "Make sure the values entered are valid."
        res.status(200).render("register", payload);
    }
})

module.exports = router