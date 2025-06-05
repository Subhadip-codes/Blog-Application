import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
var port = 3000;
var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let idCounter = 1;

app.get("/", (req, res) => {
    res.render("index",{posts});
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/create", (req, res) => {
    const { title, content } = req.body;
    posts.push({
        id: idCounter++,title,content});
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id); // convert to number
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).render("notfound");
    }

    res.render("edit", { post }); // ✅ send post to edit.ejs
});


app.post("/update/:id", (req, res) => {
    const id = parseInt(req.params.id); // convert to number
    const { title, content } = req.body;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).render("notfound");
    }

    post.title = title;
    post.content = content;
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});