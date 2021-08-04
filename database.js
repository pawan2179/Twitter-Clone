const { MongoServerSelectionError } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://admin:mongoDB@twitterclonecluster.ajru1.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
        .then(() => {
        console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log("Failed to connect Database " + err);
        })
    }
}

module.exports = new Database();