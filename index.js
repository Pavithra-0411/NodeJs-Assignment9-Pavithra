const express=require('express');
const app=express();
const db=require('./db');
const port=3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/books',(req,res)=>{
    const query='Select * from books';
    db.query(query,(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.json(result);
    });
});

app.get('/books/:id',(req,res)=>{
    const {id} = req.params;
    const query='Select *from books where id=?';
    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(result.length===0){
            return res.status(404).json({message:'Book not found'});
        }
        res.json(result[0]);
    });
});

app.post('/books',(req,res)=>{
    const {title,author,genre,publication_year,language,price,isbn,publisher,rating}=req.body;
    const query=`INSERT INTO books (title,author,genre,publication_year,language,price,isbn,publisher,rating) 
    VALUES (?,?,?,?,?,?,?,?,?)`;
    db.query(query,[title,author,genre,publication_year,language,price,isbn,publisher,rating],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({
            message:'Added Book Successfully',
            book:{id:result.insertId,...req.body}
        });
    });
});

app.put('/books/:id',(req,res)=>{
    const {id}=req.params;
    const {title,author,genre,publication_year,language,price,isbn,publisher,rating}=req.body;
    const query=`
    UPDATE books 
    SET title = ?,author = ?,genre = ?,publication_year = ?,language = ? , price = ?,isbn = ?,publisher = ?,rating = ? 
    WHERE id = ?`;

    const values=[title,author,genre,publication_year,language,price,isbn,publisher,rating,id];
    db.query(query,values,(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(result.affectedRows===0){
            return res.status(404).json({message:'Book not found'});
        }
        res.json({message:'Updating the Book Successful'});
    });
});

app.delete('/books/:id',(req,res)=>{
    const {id}=req.params;
    const query=`DELETE FROM books WHERE id=?`;
    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(result.affectedRows===0){
            return res.status(404).json({message:'Book not found'});
        }
        res.json({message:'Deleting the Book Successful'});
    });
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
});