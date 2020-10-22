import express from "express";
import bodyParser from "body-parser";
import routes from "./routes"
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(routes)
app.use(express.static(path.join(__dirname, '../media')))

const PORT = 5000;
app.listen(PORT, () => {
    console.log("...Backend started on port " + PORT + "...");
});

//DATABASE
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Bachelor_project_database', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("...DB connected...")
});


export {app};