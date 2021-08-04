const { response } = require('express');
const express = require('express');
const app = express();
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const session = require('express-session')

const port = 3003;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

const loginRoutes = require("./routes/layoutRoutes");
const registerRoutes = require("./routes/registerRoutes");

app.use("/login", loginRoutes);
app.use("/register", registerRoutes)

app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: "Alpha Beta Gamma Theta",
    resave: true,
    saveUninitialized: false
}))

const server = app.listen(port, () => console.log("Server running on port : ", port));

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle : "Home"
    }

    res.status(200).render("home", payload);
})