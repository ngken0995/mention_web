const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passportControl = require('./lib/passport-control')
const bodyParser = require('body-parser')

const newsRouter = require('./routes/news');
const auth = require('./routes/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
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


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'kennethng2017@gmail.com',
  from: 'ngken0995@gmail.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
