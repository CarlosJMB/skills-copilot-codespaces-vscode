// Create web server
// Create a web server and listen for incoming requests

// Import express module
const express = require('express');

// Import mongoose module
const mongoose = require('mongoose');

// Import body-parser module
const bodyParser = require('body-parser');

// Import the Comment model
const Comment = require('./models/comment');

// Create a new express application
const app = express();

// Set the port number
const port = 3000;

// Connect to the database
mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Define the root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define a route to get all comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comments);
        }
    });
});

// Define a route to get a single comment
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comment);
        }
    });
});

// Define a route to create a new comment
app.post('/comments', (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, savedComment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(savedComment);
        }
    });
});

// Define a route to update a comment
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comment);
        }
    });
});

// Define a route to delete a comment
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(comment);
        }
    });
});

// Start the web