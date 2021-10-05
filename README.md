# mention_web

## Description

A new project about notifying users with keywords through email. A news search engineer which will provide the result of any mention of keywords within the title or comments. JWT authentication with passportjs was used for the login system. Afterward, I can use twilio sendgrid to send email out to users containing real time information about their keywords. 

## Tech Stack
- MongoDB
- Express
- React
- Node

# Setup
## Frontend\mention-front

Go to "mention-front" folder from Frontend folder and run `npm install`
<br />
run `npm start` to start frontend.
<br />
frontend url is http://localhost:3000

## Backend

Go to the backend folder and run `npm install`
<br />
Next create a .env file and copy and paste the variable below. 
```
PORT=5000
DB_STRING=
WEBHOSE_TOKEN=
SENDGRID_API_KEY=
```
`DB_STRING` is creating a mongodb database and storing the mongodb connection.
`WEBHOSE_TOKEN` is creating an account with webhose API(https://webhose.io/) and storing the token.
`SENDGRID_API_KEY` is creating an account with Twilio sendgrid(https://www.twilio.com/sendgrid/email-api) and storing the token. Also register and email address with twilio.

run `node server` to start backend.


