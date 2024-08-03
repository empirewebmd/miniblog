import express from 'express';



const app = express();


import bodyParser from 'body-parser';
import path from 'path';
app.use(express.static("public"));

// In-memory data store
let posts = [];
let nextId = 1;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Routes

// List all posts   in the
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
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== id); // Filter out the post with the given ID
    res.redirect('/'); // Redirect to list all posts
});





// edit rendering



app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
        res.render('edit.ejs', { post });
    } else {
        res.redirect('/'); // Redirect if post not found
    }
});


// Handle update form submission
app.post('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { category, description, name, image } = req.body;

    const post = posts.find(p => p.id === id);
    if (post) {
        post.category = category;
        post.description = description;
        post.author = name;
        post.image = image;
    }
    res.redirect('/'); // Redirect to list all posts
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});