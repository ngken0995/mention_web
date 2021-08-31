
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = function() {
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
}
module.exports = sendEmail;




