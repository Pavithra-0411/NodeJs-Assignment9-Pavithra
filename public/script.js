const apiBaseUrl='http://localhost:3000/books';
const booksTable=document.getElementById('books-table').querySelector('tbody');
let editingBookId=null;

window.onload=fetchBooks;

function fetchBooks(){
    fetch(apiBaseUrl)
    .then(response=>response.json())
    .then(data=>{
        booksTable.innerHTML='';
        data.forEach(book => addBookToTable(book));
    })
    .catch(error => console.error('Error fetching books',error));
}

function addBookToTable(book){
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.publication_year}</td>
    <td>${book.language}</td>
    <td>${book.price}</td>
    <td>${book.isbn}</td>
    <td>${book.publisher}</td>
    <td>${book.rating}</td>
    <td>
        <button onclick="editBook(${book.id})">Update</button>
        <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
    </td>
    `;
    booksTable.appendChild(row);
}

document.getElementById('book-form').addEventListener('submit',function(event){
    event.preventDefault();

    const bookData={
        title:document.getElementById('title').value,
        author:document.getElementById('author').value,
        genre:document.getElementById('genre').value,
        publication_year:document.getElementById('publication_year').value,
        language:document.getElementById('language').value,
        price:document.getElementById('price').value,
        isbn:document.getElementById('isbn').value,
        publisher:document.getElementById('publisher').value,
        rating:document.getElementById('rating').value,
    };

    if(editingBookId){
        fetch(`${apiBaseUrl}/${editingBookId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(bookData)
        })
        .then(response=>response.json())
        .then(()=>{
            fetchBooks();
            document.getElementById('book-form').reset();
            editingBookId=null;
        })
        .catch(error=>console.error('Error Updating Book details :',error));
    }
    else{
        fetch(apiBaseUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(bookData)
        })
        .then(response=>response.json())
        .then(book=>{
           addBookToTable(book.book);
            document.getElementById('book-form').reset();
        })
        .catch(error=>console.error('Error Adding Book :',error));
    }
});

function editBook(id){
    fetch(`${apiBaseUrl}/${id}`)
    .then(response=>response.json())
        .then(book=>{
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('genre').value = book.genre;
        document.getElementById('publication_year').value = book.publication_year;
        document.getElementById('language').value = book.language;
        document.getElementById('price').value = book.price;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('rating').value = book.rating;
        editingBookId=id;
    })
    .catch(error=>console.error('Error fetching book details :',error));
}

function deleteBook(id){
    fetch(`${apiBaseUrl}/${id}`,{
        method:'DELETE'
    })
    .then(()=>{
        fetchBooks();
    })
    .catch(error=>console.log('Error deleting book : ',error));
}