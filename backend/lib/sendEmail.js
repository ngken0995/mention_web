
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require('../db/User');



const sendEmail = function() {
    let data = {};
    User.find({} , (err, users) => {
        users.map(user => {
            const params = {
                keyword: user.keyword
            }
            axios.post('news/', params)
            .then(response => {
                data = response.data.posts
            })
            .catch((error) => {
                console.log(error);
            })
            const msg = {
                to: user.email,
                from: 'ngken0995@gmail.com', // Use the email address or domain you verified above
                subject: 'Sending with Twilio SendGrid is Fun',
                text: `You have ${data.result} result. Go to http://localhost:3000/result?keyword=${user.keyword} to view more`,
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
        })
    })
}
module.exports = sendEmail;




