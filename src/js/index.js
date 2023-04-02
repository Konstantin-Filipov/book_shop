async function bookRepeat(selectedTitle)
{
  for(let i = 0; i < bookCart.length; i++)
  {
    if (selectedTitle == bookCart[i].title)
    {
      return true;
    }
  }
  return false;
}

async function getBookIndex(selectedTitle)
{
  let index;
  console.log("in get index function");
  for(let i = 0; i < bookCart.length; i++)
  {
    console.log(`${selectedTitle} ?= ${bookCart[i].title}`);
    if (selectedTitle == bookCart[i].title)
    {
      console.log("matched!");
      return i;
    }
  }
}

async function addToCart(selectedTitle, selectedPrice) {

  let defaultQuantity = 1;

  payload = {
    title: selectedTitle.textContent,
    price: selectedPrice.textContent,
    quantity: defaultQuantity
  };

  //if book title is NOT in shop cart, add to shop cart 
  if (!(await bookRepeat(payload.title)))
  {
    bookCart.push(payload);
  }
  //if book title is already in shop cart, increase quantity
  else if((await bookRepeat(payload.title)))
  {
    let index = await getBookIndex(payload.title)
    bookCart[index].quantity += 1;  //increase quantity of the book by 1
  }
  
  //update overall price
  let splitPrice = payload.price.split(' ');
  let price = parseFloat(splitPrice[2]);
  overallPrice += price;
}

let overallPrice = 0;
let booksState = [];
let bookCart = [];


document.getElementById("dropdownMenuButton").addEventListener("click", loadCart);
function loadCart() {
  let htmlMain = document.getElementsByClassName("dropdown-menu")[0];
  bookCart.map((item) => console.log(item));
  let html = "";
  bookCart.map((e) =>(html += `<a class="dropdown-item" href="#">${e.title} ${e.price} ${e.quantity}</a>`));
  html += `<div class="dropdown-divider"></div><a class="dropdown-item" href="#">Total sum: ${overallPrice.toFixed(2)} SEK</a>`;
  htmlMain.innerHTML = html;
  htmlMain.classList.add("show");
}

// Add an event listener to the dropdown menu to remove the "show" class when the menu is closed
document.getElementsByClassName("dropdown-menu")[0].addEventListener("mouseleave", function() {
  this.classList.remove("show");
});

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
        <img src="${book.img}" />
        <div class="card-body">
            <h5 class="card-title"> Title: ${book.title} </h5>
            <h6 class="card-author"> Author: ${book.author} </h6>
            <h6 class="card-price"> Price: ${book.price} kr </h6>
            <h6 class="card-category"> Category: ${book.category} </h6>
        </div>
        <div class="card-body">
            <a href="#" id="popDetail" class="card-link" data-bs-toggle="modal" data-bs-target="#popModal-${index}">Details</a>
            <a href="#" id="purchase" class="card-link">Purchase</a>
        </div>
    </div>
    </div>

    <div class="modal fade" id="popModal-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Book title: ${book.title} </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card h-100">
                    <div class="card-body">
                        <h6 class="card-secondary"> Author: ${book.author} </h6>
                        <h6 class="card-secondary modal-price"> Price: ${book.price} kr </h6>
                        <h6 class="card-secondary"> Category: ${book.category} </h6>
                        <h6 class="card-secondary"> Description: ${book.category} </h6>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary modal_purchase">Purchase</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    `;
  });

  booksRow.innerHTML = booksHtml;
  let purchases = document.querySelectorAll("#purchase");

  /** Add event listen to purchase element, when it is clicked,
   * add the book.
   */
  purchases.forEach((purchase) => {
    purchase.addEventListener("click", (event) => {
      event.preventDefault();
      
      let selectedTitle = purchase.parentElement.parentElement.querySelector(".card-title");
      let selectedPrice = purchase.parentElement.parentElement.querySelector(".card-price");
      
      addToCart(selectedTitle, selectedPrice);
    });
  });

  console.log(purchase);

  let modal_purchases = document.querySelectorAll(".modal_purchase");
  modal_purchases.forEach((modal_purchase) => {
    modal_purchase.addEventListener("click", (event) => {
      
      event.preventDefault();
      
      let selectedTitle = modal_purchase.parentElement.parentElement.querySelector(".modal-title");
      let selectedPrice = modal_purchase.parentElement.parentElement.querySelector(".modal-price");
      
      addToCart(selectedTitle, selectedPrice);
    });
  });
}

/** entry point to index.html
 *  Find main tag and set its innerHTML to div container and div row
 *  Call load function to start the load of data
 */
function loadMain() {
  console.log("come to load main");
  document.querySelector("main").innerHTML = `
    <div class="container rounded m2-auto ">
      <div id="books" class="row text-center mt-2 g-3 flex-row justify-content-center">
      <h1>hahaha</h1>
      </div>
    </div>`;
  load();
}

/** Start the script with loadMain function */
loadMain();
