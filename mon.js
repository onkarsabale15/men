const dotenv = require('dotenv');
const env = dotenv.config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DBUSR}:${process.env.DBPASS}@cluster0.h9uveex.mongodb.net/${process.env.DBNAME}`, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then(db => console.log('Connected To The Remote Database.'))
    .catch(err => console.log(err));
const postsSchema = new mongoose.Schema({
    title: String,
    description: String
})

const Article = mongoose.model('Article', postsSchema)

function newTitle(titl,desc){
    const article = new Article({
        title:titl,
        description:desc  
    })
    article.save().then(()=>{
        console.log("User Saved")
    })
}


// Article.find({title:"Onkar Sabale"}).then(doc =>{
//     console.log(doc);
// })

function findTitle(titl){
    Article.find({title:titl}).then(doc=>{
        const data = JSON.stringify(doc[0])
        // console.log(doc[0])
        return doc
    }).catch(err=>{
        res.write("There is an Unexpected Error")
        console.log(err)
    });
}
findTitle("Aryan Deshmukh")