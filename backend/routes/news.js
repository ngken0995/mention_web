const router = require('express').Router();
const webhoseio = require('webhoseio');
require('dotenv').config();

const client = webhoseio.config({token: process.env.WEBHOSE_TOKEN});


router.route('/').post((req, res) => {
    const keyword = req.body.keyword;
    const query_params = {
        "q": `language:english text:${keyword}`,
        "sort": "crawled",
        "ts":1629496652695
        }
    client.query('filterWebContent', query_params)
    .then(output => res.json(output))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;