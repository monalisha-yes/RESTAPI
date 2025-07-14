const express = require('express')

const app = express()

app.use(express.json())
let books = [
    {
        id : 1,
        title : 'Book 1'
    },
    {
        id : 2,
        title : 'Book 2'
    },
    {
        id : 3,
        title : 'Book 3'
    },

];

app.get('/', (req,res)=>{
    res.json({
        message : " welcome to out book page",
    });
});
app.get('/getbooks', (req,res)=>{
    res.json(books);
});
app.get('/get/:id',(req,res)=>{
    const book = books.find(item=> item.id == req.params.id);
    if(book){
        res.status(200).json(book)
    }
    else{
        res.status(404).json({
            message : "book not found please enter another id number",
        })
    }
});

app.post('/add',(req,res)=>{
    const newBook = {
        id : books.length + 1,
        title : `Book ${books.length+ 1}`
    }
    books.push(newBook)
    res.json(newBook)
});

app.put('/update/:id',(req,res)=>{
    const currentBook = books.find(booksItem => booksItem.id == req.params.id);
    if(currentBook){
        currentBook.title = req.body.title || currentBook.title

        res.status(200).json({
            message : "updated successfully ",
            data : currentBook,
    })
    }
    else{
        res.status(404).json({
            message: "id not found",
        })
    }
})
app.delete('/delete/:id', (req, res) => {
    const bookIndex = books.findIndex(book => book.id == req.params.id);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1); // removes the book
        res.status(200).json({
            message: "Book deleted successfully",
            data: deletedBook[0],
        });
    } else {
        res.status(404).json({
            message: "Book ID not found",
        });
    }
});
const port = 3000;
app.listen(3000, ()=>{
console.log("server is ruuning");
});
