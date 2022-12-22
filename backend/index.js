const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require("cors");
const multer = require('multer')

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

// Enable body parser
app.use(express.json());
 app.use(express.urlencoded({ extended: false }));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + file.originalname)
    }
})

 app.use(multer({storage : fileStorage}).single('picture'))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./Routes/openairoute'));
app.use('/openai', require('./Routes/openairoute2'));

app.listen(port, () => console.log(`Server started on port ${port}`));