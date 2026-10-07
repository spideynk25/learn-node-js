const express = require('express')
const { connectToDb, getDb } = require('./db')
const {ObjectId} = require('mongodb')
// init app & middleware

const app = express()
app.use(express.json())

// db connection
let db


connectToDb((err) => {
    if(!err){
        app.listen(3000,()=>{
            console.log('app listening on port 3000');
        }) 
        db = getDb()
    }
})


// routes
// app.get('/books', (req, res) => {
//         const books = []
//          db.collection('books')
//          .find()
//          .sort({author: 1})
//          .forEach(book => books.push(book))
//          .then(()=>  {
//             res.status(200).json(books)}
//             )
//           .catch((err)=>{
//             res.status(500).json({error: err.stack})
//           })
// })

app.get('/books', async (req, res) => {
   
   try{
        //current page
        const page = req.query.p || 0
        const booksPerPage = 3
        const books = await db.collection('books').find().sort({author:1}).skip(page * booksPerPage).limit(booksPerPage).toArray()
        res.status(200).json(books)
    } catch(err){
        res.status(500).json({error: 'Could not fetch the document'})
    }
    
})

app.get('/books/:id', async  (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        try{
            const book = await db.collection('books')
            .findOne({_id:new ObjectId(req.params.id)})
            console.log(book);
            if(book)
            res.status(200).json(book)
            else
            res.status(404).json({error: 'File not found'})
        } catch(err){
            console.error(err);
            res.status(500).json({error: 'Could not fetch the document'})
        }  
    } else {
        res.status(500).json({error: 'Not a vaild id'})
    }
   
    //  db.collection('book')
    //  .findOne({_id:new ObjectId(req.params.id)})
    //  .then(doc=>{
    //     res.status(200).json(doc)
    //  })

})

app.post('/books', async (req, res) => {
    try{
        const book = req.body
        const result = await db.collection('books').insertOne(book)
        res.status(201).json(result)
    }
    catch(err){
        res.status(500).json({err: 'Could not create a new document'})
    }
})

app.delete('/books/:id', async (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        try{
            const book = await db.collection('books')
            .deleteOne({_id:new ObjectId(req.params.id)})
            console.log(book);
            res.status(200).json(book)
        } catch(err){
            console.error(err);
            res.status(500).json({error: 'Could not delete the document'})
        }  
    } else {
        res.status(500).json({error: 'Not a vaild id'})
    }
})

app.patch('/books/:id', async (req, res) => {
    const updates = req.body

    if(ObjectId.isValid(req.params.id)){
        try{
            const book = await db.collection('books')
            .updateOne({_id:new ObjectId(req.params.id)},{$set: updates})
            console.log(book);
            res.status(200).json(book)
        } catch(err){
            console.error(err);
            res.status(500).json({error: 'Could not update the document'})
        }  
    } else {
        res.status(500).json({error: 'Not a vaild id'})
    }

})