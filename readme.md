Book Management API
Postman Link=> https://www.postman.com/security-physicist-98665268/workspace/book-management/collection/38187457-6eabacde-39c3-4b7c-aeec-e9858bd35b19?action=share&creator=38187457
This is a simple book management API best using NodeJS Express and MySQL.
It allows users to manage books through crud operations (create,read,update,delete) using rest API.
The book data is stored in a MySQL database.

Features
Retrieve all books
Retrieve with an ID 
Create a new book
Update an existing book by ID
Delete by ID

Technology used
Node JS:  JavaScript runtime for backend
Express JS:  web Framework  for node JS
MySQL:  database to store book records
MySQL2:  NodeJs library to interact with MySQLdatabase

Prerequisites
NodeJs
MySQL 

Setup
Extract the contents of the folder by unzipping  it
Install the dependencies with the command “npm install”

Set up MySQL database
Configure the database connection
Start the server  using the command node index.js
Server will run on https:// localhost:3000/ books

API endpoints :

Get all books
URL: /books
method: get 
Response:  Json array of all books in the database

Get the book by ID:
URL: /books/: id
method: get
Response:  Json array of all books in the database

Add a new book:
URL: /books
method: Post
request body:  Json body containing the new book details
Response:   confirmation message about successfully added or failed

Update an existing book
URL: /books/:id
method: Put
request body:  Json body  with updated book details
Response:   confirmation message about successfully  updated or failed

Delete a Book
URL: /books
method: delete 
Response:  confirmation message about successfully  deleted or failed

Testing with postman
Import the provided postman collection to easily test the API endpoints.
Ensure that the request headers for Post and put request include:
 content-type: application/Json
For  post and put requests,Provide a json body 

Error Handling
404 not found:  return when a book with specified ID is not found
500  internal server error: Returned when there is a server side error


