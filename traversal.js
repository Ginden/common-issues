'use strict';
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.get('/:file', function (req, res) {
    fs.readFile(path.join(__dirname, 'so-safe', req.params.file+'.json'), 'utf8', function(err, content) {
        if (err) {
            res.status(500).json({
                error: {
                    message: err && err.message,
                    type: err && err.constructor && err.constructor.name
                }
            });
        } else {
            res.status(200).header('Content-Type', 'application/json').send(content);
        }
    })
});

app.listen(3000, function () {
    console.log('http://localhost:3000/');
});