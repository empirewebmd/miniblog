const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// In-memory data store
let posts = [];
let nextId = 1;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// List all posts
app.get('/', (req, res) => {
    res.render('index.ejs', { myposts: posts });
});

// Create new post
app.post('/submit', (req, res) => {
    const category = req.body.category;
    const description = req.body.description;
    const author = req.body.name;
    const image = req.body.image; // get the image file from the form data
    const id = nextId++;

    const newPost = {
        author: author,
        category: category,
        description: description,
        image: image,
        id: id
    };

    posts.push(newPost); // push the object in the array
    res.redirect('/'); // Redirect to list all posts
});

// Delete post
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.body.id);
    posts = posts.filter(post => post.id !== id); // Filter out the post with the given ID
    res.redirect('/'); // Redirect to list all posts
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});