const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const frontRouter = require('./routers/front/router.js');
const router = require('./routers/api/router.js');
const multer = require('multer');
const form = multer();
require('dotenv').config();

/*-----------    Experiment code  ------ 

-----------    Experiment code  ------ */

const PORT = process.env.PORT;

const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log(err));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')());

app.use(frontRouter);
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});