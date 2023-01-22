let myLibrary = [
  { frontCover:"./images/thefellowshipofthering.jpg", title: "The Fellowship of the Ring", author: "Tolkien", pages: 295, read: true },
  { frontCover:"./images/thehobbit.jpg", title: "The Hobbit", author: "Tolkien", pages: 311, read: false },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "Tolkien", pages: 185, read: true },
];
const libTable = document.getElementById("library_table")
const frontcoverInput = document.getElementById("newbook_input_frontcover");
const titleInput = document.getElementById("newbook_input_title");
const authorInput = document.getElementById("newbook_input_author");
const pagesInput = document.getElementById("newbook_input_pages");
const readInput = document.getElementById("newbook_input_read");
let messageTimer;

function Book(frontCover, title, author, pages, read) {
  this.frontCover = frontCover  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addToLibrary(){
  const newBook = new Book( frontcoverInput.value, titleInput.value, authorInput.value, pagesInput.value, readInput.checked );
  myLibrary.push(newBook);
  renderTable()
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false
}

function renderTable(){

for(var i = libTable.rows.length - 1; i > 0; i--)
{
    libTable.deleteRow(i);
}
  
  myLibrary.forEach(function(object){
    let newRow = libTable.insertRow(-1)

    //front cover image
    let newFrontCoverCell = newRow.insertCell(0)
    let frontcoverImg = document.createElement("img");
    frontcoverImg.classList.add("frontcover_container")
    frontcoverImg.src = object.frontCover
    newFrontCoverCell.appendChild(frontcoverImg);

    //book title
    let newTitleCell = newRow.insertCell(1)
    let titleCell = document.createTextNode(object.title);
    newTitleCell.appendChild(titleCell);

    //book author
    let newAuthorCell = newRow.insertCell(2)
    let authorCell = document.createTextNode(object.author);
    newAuthorCell.appendChild(authorCell);

    //book number of pages
    let newPagesCell = newRow.insertCell(3)
    let pagesCell = document.createTextNode(object.pages);
    newPagesCell.appendChild(pagesCell);

    //been read?
    let newReadCell = newRow.insertCell(4)
    let readCell;
    if(object.read === true){
      readCell = document.createTextNode("You have read this book")
    } else {
      readCell = document.createTextNode("You haven't read this book")
    }
    newReadCell.appendChild(readCell);

    //options buttons
    let newOptionsCell = newRow.insertCell(5)
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    editButton.textContent = "Edit"
    deleteButton.textContent = "Delete"
    newOptionsCell.appendChild(editButton);
    newOptionsCell.appendChild(deleteButton);

  })
}
let sidebarToggle = false
document.getElementById("hamburger").addEventListener("click",function(){
  
  if(sidebarToggle === false){
    document.getElementById("sidebar").style.width = "250px"
    sidebarToggle = true
  } else {
    document.getElementById("sidebar").style.width = "0px"
    sidebarToggle = false
  }
})

document.getElementById("close_sidebar").addEventListener("click",function(){
    document.getElementById("sidebar").style.width = "0px"
    sidebarToggle = false
})

//brings up add new book overlay form
document.getElementById("newbook_button").addEventListener("click",function(){
  document.getElementById("overlay").style.visibility = "visible"
  clearForm()
})

const form = document.getElementById("newbook_form").addEventListener("submit", 
(e) => {
e.preventDefault()
addToLibrary();
document.getElementById("overlay").style.visibility = "hidden"
})

//closes overlay form
document.getElementById("overlay").addEventListener("click",function(){
  document.getElementById("overlay").style.visibility = "hidden"
})

//stops form from closing when form container is clicked.
document.getElementById("form_container").addEventListener("click", function(e) {
    e.stopPropagation();
  });


libTable.addEventListener("click", function(e){
  if((e.target.tagName === "BUTTON")){
    let title =  e.target.parentNode.parentNode.childNodes[1].textContent
    let author = e.target.parentNode.parentNode.childNodes[2].textContent
    let pages = e.target.parentNode.parentNode.childNodes[3].textContent
    let read = e.target.parentNode.parentNode.childNodes[4].textContent
    let targetBookObjectIndex = myLibrary.findIndex(function(object){
      if((object.title === title)&&(object.author === author)){
        return true
      }
    })
    clearTimeout(messageTimer)
    if(e.target.textContent === "Edit"){
        document.getElementById("overlay").style.visibility = "visible"
        titleInput.value = title;
        authorInput.value = author;
        pagesInput.value = pages;
        readInput.checked = read;
    }else if(e.target.textContent === "Delete"){
        let messenger = document.getElementById("messenger")
        messageTimer = setTimeout(function(){messenger.style.visibility = "hidden"}, 8000)
        messenger.style.visibility = "visible"
        messenger.textContent = "Successfully deleted " + title + " from your library"
        myLibrary.splice(targetBookObjectIndex, 1)
    }else{
    }
  }else{
  }
  renderTable()
})

renderTable()