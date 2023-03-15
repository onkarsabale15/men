const dotenv = require('dotenv');
const env = dotenv.config()
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }))
const mongoose = require('mongoose')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT;

function newTitle(titl, desc) {
    const article = new ArticleModel({
        title: titl,
        description: desc
    })
    return article.save().then(savedData => {
        console.log('data saved')
        return savedData
    }).catch(err=>{
        console.log(err)
    })
};

function findTitle(titl) {
    return ArticleModel.find({ title: titl }).then(doc => {
        const data = JSON.stringify(doc[0])
        return data
    }).catch(err => {
        console.log(err)
    })
}

mongoose.connect(`mongodb+srv://${process.env.DBUSR}:${process.env.DBPASS}@cluster0.h9uveex.mongodb.net/${process.env.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Connected To The Remote Database.'))
    .catch(err => console.log(err));

const postsSchema = {
    title: String,
    description: String
}
const ArticleModel = mongoose.model('Article', postsSchema)
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {
    console.log("The Server Has Started\nListening on port :", PORT, `\nTo Access on local Machine ctrl + click on ==> http://localhost:${PORT}/`)
});
app.get('/', (req, res) => {
    res.send("Hello")
})
app.post('/usr', (req, res) => {
    console.log('received title to get user', req.body.title)
    findTitle(req.body.title).then(data => {
        res.send(data)
    }).catch(error => {
        console.error(error);
    });
})

app.post('/signup', (req, res) => {
    console.log('received title ' + req.body.title + ' and desc '+ req.body.desc +' to create user')
    newTitle(req.body.title, req.body.desc).then(savedData => {
        res.send(savedData)
    }).catch(error => {
        console.error(error);
    });
});

app.delete('/',(req, res)=>{
    ArticleModel.deleteMany().then(
        console.log('Deleted Every Thing'),
        res.send("Deleted Everything")
    ).catch(err=>{
        console.log(err)
    })
})