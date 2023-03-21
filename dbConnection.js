const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// open database in memory
const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the log file SQlite database.');
});


//uncomment to create table
//-------------------------------------------------------------------------
/* 
sql = `CREATE TABLE books(title TEXT PRIMARY KEY, category TEXT, author TEXT, price REAL)`
db.run(sql)
 */
//-------------------------------------------------------------------------

//uncomment to drop table
//-------------------------------------------------------------------------
/* sql = `DROP TABLE books`;
db.run(sql)
 */
//-------------------------------------------------------------------------

//uncomment to make an insertion
//-------------------------------------------------------------------------
/* 
var title = "Head First JavaScript Programming"
var category = "JS"
var author = "Eric Freeman"
var price = 465.00

db.run( `INSERT INTO books(title, category, author, price) VALUES(?,?,?,?)`, [title, category, author, price], function(err)
{
  if (err)
  {
    return console.log(err.message);
  }
});
 */
//-------------------------------------------------------------------------

//uncomment to select all rows in books and put them in json file
//-------------------------------------------------------------------------
/* db.all('SELECT * FROM books', [], (err, rows) => {

  if (err)
  {
    throw err;
  }

  // create an array to hold the books
  let books = [];

  // loop through the rows and add each book to the array
  rows.forEach((row) => {
    let book = 
    {
      title: row.title,
      category: row.category,
      author: row.author,
      price: row.price
    };
    books.push(book);
  });

  // create a JSON string from the array of books
  let jsonString = JSON.stringify({books: books}, null, 2);

  // write the JSON string to a file
  fs.writeFile('books.json', jsonString, (err) => {
    if (err) {
      throw err;
    }
    console.log('Books saved to books.json');
  });
});
 */
//-------------------------------------------------------------------------

//uncomment to close the database connection
//-------------------------------------------------------------------------
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
//-------------------------------------------------------------------------

//module.exports = db;