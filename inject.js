'use strict';
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const db = MongoClient.connect('mongodb://localhost:27017/myproject');
const bodyParser = require('body-parser');
const crypto = require('crypto');


app.use(bodyParser.json());

app.post('/login', function (req, res) {
    return db
        .then(db=> {
            const col = db.collection('users');
            const dbQuery = {
                name: req.body.name,
                password: fancyHash(req.body.password)
            };
            return db.findOne(dbQuery);
        })
        .then(data=>res.json(data))
        .catch(err=>res.status(500).json({error: err}));
});

app.listen(3000, function () {
    console.log('http://localhost:3000/');
});

function fancyHash(pass) {
    return crypto.createHash('sha512').update(pass).digest('hex');
}