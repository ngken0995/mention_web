const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passportControl = require('./lib/passport-control')
const bodyParser = require('body-parser');
const cron = require('node-cron');
const sendEmail = require('./lib/sendEmail');

const newsRouter = require('./routes/news');
const auth = require('./routes/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(passportControl.initialize());


const uri = process.env.DB_STRING;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/api', auth);
app.use('/news', newsRouter);


cron.schedule('30 21 30 8 *', () => {
  sendEmail();
});



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
