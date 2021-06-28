const express = require ('express');
const mongoose = require ('mongoose');
const cors =require('cors');

mongoose.connect('mongodb://localhost/react-example',{
useNewUrlParser:true,
useUnifiedTopology: true

}).then(db=> console.log('DB Connected'))
.catch(err => console.log(err))

const app = express();
const Book= require('./models/book');

app.use(cors());
app.use(express.json());

app.get('/books', async (req,res)=>{
   const LBook = await Book.find();
   res.json(LBook);
});
app.put('/books', async (req,res)=>{
   const bookId = req.body;
   for(const [i,id] of bookId.entries()){
    await Book.updateOne({_id: id}, {sorting:i})
   }
    res.json({msg:'The list was ordered'});
    
});
app.post('/books', async (req,res)=>{
    const newBook = new Book(req.body);
    newBook.sorting = await Book.estimatedDocumentCount();
    newBook.save();
    res.json({msg: 'received'});
});

app.listen(4000, ()=>{
    console.log('server on port 4000');

})
