const express = require('express');
const mongoose = require('mongoose');
const Article = require("./model/article");
const methodeOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const articleRouter = require('./routes/articles');

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(methodeOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', {articles: articles}) 
})

app.use('/articles', articleRouter);

app.listen(3000);