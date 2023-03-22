let booksState = [];

/** Get json data by url, return data */
async function getBooks(url) {
  console.log("come to get books");
  const books = await fetch(url);
  const data = await books.json();

  return data;
}

/** Load first the data by calling getBooks and send in path of books.json
 * Call loadHome(pass in booksState as argument)
 */
async function load() {
  console.log("come to load");
  booksState = await getBooks("../books.json");
  loadHome(booksState);
}

/** Find the #books element and add books in this function*/
function loadHome(bookState) {
  console.log("books", bookState);
  /** set booksHtml to empty string
   *
   */
  let booksHtml = "";
  let booksRow = document.querySelector("#books");
  bookState.map((book, index) => {
    booksHtml += `
    <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6">
     
    <div class="card card-img-top h-100">
        <img src="https://s1.adlibris.com/images/28652140/designing-user-experience.jpg" />
        <div class="card-body">
            <h5 class="card-title"> Title: ${book.title} </h5>
            <h6 class="card-secondary"> Author: ${book.author} </h6>
            <h6 class="card-secondary"> Price: ${book.price} kr </h6>
            <h6 class="card-secondary"> Category: ${book.category} kr </h6>
        </div>
        <div class="card-body">
            <a href="#" class="card-link">Details</a>
            <a href="#" class="card-link">Purchase</a>
        </div>
    </div>
    </div>
    `;
  });

  booksRow.innerHTML = booksHtml;
}

/** entry point to index.html
 *  Find main tag and set its innerHTML to div container and div row
 *  Call load function to start the load of data
 */
function loadMain() {
  console.log("come to load main");
  document.querySelector("main").innerHTML = `
    <div class="container rounded m-2">
      <div id="books" class="row text-center g-3 flex-row justify-content-center">
      <h1>hahaha</h1>
      </div>
    </div>`;
  load();
}

/** Start the script with loadMain function */
loadMain();
