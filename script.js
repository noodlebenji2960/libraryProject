let myLibrary = [
  { frontCover:"./images/thehobbit.jpg", title: "The Hobbit", author: "J.R.R. Tolkien", pages: 311, read: false },
  { frontCover:"./images/thefellowshipofthering.jpg", title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", pages: 185, read: false },
  { frontCover:"./images/thetwotowers.jpg", title: "The Two Towers", author: "J.R.R. Tolkien", pages: 185, read: true },
  { frontCover:"./images/thereturnoftheking.jpg", title: "The Return of the King", author: "J.R.R. Tolkien", pages: 185, read: false },
  { frontCover:"./images/Silmarillion.png", title: "The Silmarillion", author: "J.R.R. Tolkien", pages: 185, read: true },
  { frontCover:"./images/agameofthrones.jpg", title: "A Game of Thrones", author: "George R.R. Martin", pages: 185, read: true },
  { frontCover:"./images/adancewithdragons.jpg", title: "A Dance with Dragons", author: "George R.R. Martin", pages: 185, read: true },
  { frontCover:"./images/midnightmass.jpg", title: "Midnight Mass", author: "F. Paul Wilson", pages: 185, read: true },
  { frontCover:"./images/The_Brothers_War.webp", title: "The Brother's War", author: "Jeff Grubb", pages: 185, read: false },
];
const libTable = document.getElementById("library_table")
const frontcoverInput = document.getElementById("newbook_input_frontcoverFILE");
const frontcoverInputURL = document.getElementById("newbook_input_frontcoverURL");
const titleInput = document.getElementById("newbook_input_title");
const authorInput = document.getElementById("newbook_input_author");
const pagesInput = document.getElementById("newbook_input_pages");
const readInput = document.getElementById("newbook_input_read");
const messenger = document.getElementById("messenger")
const newBookInputTitle = document.getElementById("newbook_input_title")

let messageTimer;
let titleSortToggle = 1;
let authorSortToggle = 1;
let pagesSortToggle = 1;
let readSortToggle = 1;

//book object constructor
function Book(frontCover, title, author, pages, read) {
  this.frontCover = frontCover;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//updaes array with new book object
function addToLibrary(){
  const newBook = new Book( frontcoverInputURL.value, titleInput.value, authorInput.value, pagesInput.value, readInput.checked );
  myLibrary.push(newBook);
  renderTable(myLibrary)
}

//updates library stats/log
function updateLog(){
  document.getElementById("unreadLog").textContent = "Unread: " + myLibrary.filter(function(object){
    if(object.read === false){
      return true
    }
  }).length;

  document.getElementById("readLog").textContent = "Read: " + myLibrary.filter(function(object){
    if(object.read === true){
      return true
    }
  }).length;

  document.getElementById("totalLog").textContent = "Total: " + myLibrary.length
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  frontcoverInputURL.value = "";
  readInput.checked = false
}

function clearTable(){
  for(var i = libTable.rows.length - 1; i > 0; i--)
  {
      libTable.deleteRow(i);
  }
}


function renderTable(array){
  clearTable()
  
  //if no array has been provided to populate table use myLibrary array
  if(array == "no result"){
    let newRow = libTable.insertRow(-1)
    let noResult = document.createTextNode("Your search has not returned any results.");
    newRow.appendChild(noResult);
  }else if( array !== "no result"){
    array.forEach(function(object){
      let newRow = libTable.insertRow(-1)

    
      //create front cover image
      let newFrontCoverCell = newRow.insertCell(0)
      let frontcoverImg = document.createElement("img");
      frontcoverImg.classList.add("frontcover_container")
      frontcoverImg.src = object.frontCover
      newFrontCoverCell.appendChild(frontcoverImg);
    
      //create book title
      let newTitleCell = newRow.insertCell(1)
      let titleCell = document.createTextNode(object.title);
      newTitleCell.appendChild(titleCell);
    
      //create book author
      let newAuthorCell = newRow.insertCell(2)
      let authorCell = document.createTextNode(object.author);
      newAuthorCell.appendChild(authorCell);
    
      //create book number of pages
      let newPagesCell = newRow.insertCell(3)
      let pagesCell = document.createTextNode(object.pages);
      newPagesCell.appendChild(pagesCell);
    
      //create been read?
      let newReadCell = newRow.insertCell(4)
      let readButton = document.createElement("button");
      if(object.read === true){
        readButton.textContent = "Read"
        readButton.style.background = "#A8FFA9"
      } else {
        readButton.textContent = "Not Read"
        readButton.style.background = "#FFB1AB"
        
      }
      newReadCell.appendChild(readButton);
    
      //options buttons
      let newOptionsCell = newRow.insertCell(5)
      let editButton = document.createElement("button");
      let deleteButton = document.createElement("button");
      editButton.textContent = "Edit"
      deleteButton.textContent = "Delete"
      newOptionsCell.appendChild(editButton);
      newOptionsCell.appendChild(deleteButton);
    })
  
    updateLog()
  }
}

//event listener for hamburger to open/close sidebar
let sidebarToggle = false
document.getElementById("hamburger").addEventListener("click",function(){
  
  if(sidebarToggle === false){
    document.getElementById("sidebar").style.width = "225px"
    sidebarToggle = true
  } else {
    document.getElementById("sidebar").style.width = "0px"
    sidebarToggle = false
  }
})

//event listener for close button on sidebar
document.getElementById("close_sidebar").addEventListener("click",function(){
    document.getElementById("sidebar").style.width = "0px"
    sidebarToggle = false
})

//brings up add new book overlay form
document.getElementById("newbook_button").addEventListener("click",function(){
  document.getElementById("form_container").style.visibility = "visible"
  document.getElementById("overlay").style.visibility = "visible"
  clearForm()
})

//create event listener for submit button to then populate table and cloe overlay
const form = document.getElementById("newbook_form").addEventListener("submit", 
(e) => {
e.preventDefault()
addToLibrary();
document.getElementById("form_container").style.visibility = "hidden"
document.getElementById("overlay").style.visibility = "hidden"
clearSearchTable()
})



//closes overlay form
document.getElementById("overlay").addEventListener("click",function(){
  document.getElementById("overlay").style.visibility = "hidden"
  document.getElementById("form_container").style.visibility = "hidden"
  clearSearchTable()
})

//stops form from closing when form container is clicked.
document.getElementById("form_container").addEventListener("click", function(e) {
    e.stopPropagation();
  });

//populate table based on search results
function searchBar(){
  let searchValue = document.getElementById("search_book").value
  let searchQuery = myLibrary.filter(function(object){
    if((object.title.toUpperCase() === searchValue.toUpperCase())||(object.author.toUpperCase() === searchValue.toUpperCase())){
      return true
    }
  })
  
  if((searchQuery.length == 0)&&(searchValue !== "")){
    searchQuery = "no result"
  }else if (searchQuery.length == 0){
    searchQuery = myLibrary
  }

  if(searchValue!==""){
    messageTimer = setTimeout(function(){messenger.style.visibility = "hidden"}, 8000)
    messenger.style.visibility = "visible"
    messenger.textContent = "Displaying results for \"" + searchValue + "\""
  }else{}

  renderTable(searchQuery)
}

libTable.addEventListener("click", function(e){
  let myLibrarySorted = myLibrary
  if(e.target.tagName === "IMG"){

    
  } else if((e.target.tagName === "BUTTON")){
    let title =  e.target.parentNode.parentNode.childNodes[1].textContent
    let author = e.target.parentNode.parentNode.childNodes[2].textContent
    let pages = e.target.parentNode.parentNode.childNodes[3].textContent
    let read = e.target.parentNode.parentNode.childNodes[4].textContent
    let targetBookObject = myLibrary.find(function(object){
      if((object.title === title)&&(object.author === author)){
        return true
      }
    })
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
        messageTimer = setTimeout(function(){messenger.style.visibility = "hidden"}, 8000)
        messenger.style.visibility = "visible"
        messenger.textContent = "Successfully deleted " + title + " from your library"
        myLibrary.splice(targetBookObjectIndex, 1)
    }else if(e.target.textContent === "Read"){
        targetBookObject.read = false
    }else if(e.target.textContent === "Not Read"){
      targetBookObject.read = true
    }else{}

  }else if(e.target.id == "title_chevron"){
    clearTable()
    document.getElementById("author_chevron").classList.remove("chevron_up")
    document.getElementById("author_chevron").classList.remove("chevron_down")
    document.getElementById("pages_chevron").classList.remove("chevron_up")
    document.getElementById("pages_chevron").classList.remove("chevron_down")
    document.getElementById("read_chevron").classList.remove("chevron_up")
    document.getElementById("read_chevron").classList.remove("chevron_down")
    authorSortToggle = 1
    pagesSortToggle = 1
    readSortToggle = 1
    if(titleSortToggle==1){
      titleSortToggle=2
      document.getElementById(e.target.id).classList.add("chevron_up");
      document.getElementById(e.target.id).classList.remove("chevron_down");
      myLibrarySorted.sort(function(a, b){
        return a.title.localeCompare(b.title)
      })
    } else if(titleSortToggle==2){
      titleSortToggle=3
      document.getElementById(e.target.id).classList.remove("chevron_up");
      document.getElementById(e.target.id).classList.add("chevron_down");
      myLibrarySorted.sort(function(a, b){
        return a.title.localeCompare(b.title)
      }).reverse()
    } else{
      titleSortToggle=1
      document.getElementById(e.target.id).classList.remove("chevron_down");
    }
  }else if(e.target.id == "author_chevron"){
    clearTable()
    document.getElementById("title_chevron").classList.remove("chevron_up")
    document.getElementById("title_chevron").classList.remove("chevron_down")
    document.getElementById("pages_chevron").classList.remove("chevron_up")
    document.getElementById("pages_chevron").classList.remove("chevron_down")
    document.getElementById("read_chevron").classList.remove("chevron_up")
    document.getElementById("read_chevron").classList.remove("chevron_down")
    titleSortToggle = 1
    pagesSortToggle = 1
    readSortToggle = 1
    if(authorSortToggle==1){
      authorSortToggle=2
      document.getElementById(e.target.id).classList.remove("chevron_up");
      document.getElementById(e.target.id).classList.add("chevron_down");
      myLibrarySorted.sort(function(a, b){
        return a.author.localeCompare(b.author)
      })
    } else if(authorSortToggle == 2){
      authorSortToggle=3
      document.getElementById(e.target.id).classList.add("chevron_up");
      document.getElementById(e.target.id).classList.remove("chevron_down");
      myLibrarySorted.sort(function(a, b){
        return a.author.localeCompare(b.author)
      }).reverse()
    } else{
      authorSortToggle=1
      document.getElementById(e.target.id).classList.remove("chevron_up");
    }
  }else if(e.target.id == "pages_chevron"){
    clearTable()
    document.getElementById("author_chevron").classList.remove("chevron_up")
    document.getElementById("author_chevron").classList.remove("chevron_down")
    document.getElementById("title_chevron").classList.remove("chevron_up")
    document.getElementById("title_chevron").classList.remove("chevron_down")
    document.getElementById("read_chevron").classList.remove("chevron_up")
    document.getElementById("read_chevron").classList.remove("chevron_down")
    titleSortToggle = 1
    authorSortToggle = 1
    readSortToggle = 1
    if(pagesSortToggle==1){
      pagesSortToggle=2
      document.getElementById(e.target.id).classList.add("chevron_up");
      document.getElementById(e.target.id).classList.remove("chevron_down");
      myLibrarySorted.sort(function(a, b){
        return a.pages - b.pages
      })
    }else if(pagesSortToggle==2){
      pagesSortToggle=3
      document.getElementById(e.target.id).classList.remove("chevron_up");
      document.getElementById(e.target.id).classList.add("chevron_down");
      myLibrarySorted.sort(function(a, b){
        return a.pages - b.pages
      })
      myLibrary.reverse()
    } else {
      pagesSortToggle=1
      document.getElementById(e.target.id).classList.remove("chevron_down");
    }
  }else if(e.target.id == "read_chevron"){
    clearTable()
    document.getElementById("author_chevron").classList.remove("chevron_up")
    document.getElementById("author_chevron").classList.remove("chevron_down")
    document.getElementById("pages_chevron").classList.remove("chevron_up")
    document.getElementById("pages_chevron").classList.remove("chevron_down")
    document.getElementById("title_chevron").classList.remove("chevron_up")
    document.getElementById("title_chevron").classList.remove("chevron_down")
    titleSortToggle = 1
    authorSortToggle = 1
    pagesSortToggle = 1
    if(readSortToggle==1){
      readSortToggle=2
      document.getElementById(e.target.id).classList.remove("chevron_up");
      document.getElementById(e.target.id).classList.add("chevron_down");
      myLibrary.sort(function(a, b){
        return a.read - b.read
      })
    }else if(readSortToggle==2){
      readSortToggle=3
      document.getElementById(e.target.id).classList.add("chevron_up");
      document.getElementById(e.target.id).classList.remove("chevron_down");
      myLibrary.sort(function(a, b){
        return a.read - b.read
      })
      myLibrary.reverse()
    }else{
      readSortToggle=1
      document.getElementById(e.target.id).classList.remove("chevron_up");
    }
  } else {}
  renderTable(myLibrary)
})

renderTable(myLibrary)

//clear search results table for title box in add new book form
function clearSearchTable(){
  searchResultsContainer = document.getElementById("title_input_results")
  searchTable = document.getElementById("title_input_results_table")
  for(var i = searchTable.rows.length - 1; i > 0; i--)
  {
      searchTable.deleteRow(i);
  }
  searchResultsContainer.style.visibility = "hidden"
}

//create auto drop down that populates with title and author, onclick autofill all fields.
function queryGoogleBooksApi() {
  let resultsBox = document.getElementById("title_input_results")
  if(newBookInputTitle.value !== ""){
  clearSearchTable()
  const QUERY = (document.getElementById("newbook_input_title").value).toLowerCase();

    const URL = "https://www.googleapis.com/books/v1/volumes?q=" + QUERY
    
    var request = new XMLHttpRequest();
    
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', URL, true);
    
    request.onload = function () {
        // Begin accessing JSON data here
        for (var i = 0; i < 10; i++) {
            var data = JSON.parse(this.response);
            //console.log(data)
            var authors = (data["items"][i]["volumeInfo"]["authors"]) || 'No Author Disclosed'
            var title = (data["items"][i]["volumeInfo"]["title"]) || 'No title Disclosed'
            var pageCount = (data["items"][i]["volumeInfo"]["pageCount"]) || 'No publisher Disclosed'
            var thumbnail = (data["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"]) || 'No publisher Disclosed'

            //create new row
            let newRow = document.getElementById("title_input_results_table").insertRow(-1)

            //create event listener to populate form
              newRow.addEventListener("click", 
              (function(e){
                  frontcoverInputURL.value = e.target.parentNode.childNodes[0].childNodes[0].src
                  titleInput.value = e.target.parentNode.childNodes[1].textContent
                  authorInput.value = e.target.parentNode.childNodes[2].textContent
                  pagesInput.value = e.target.parentNode.childNodes[3].textContent
              }))

              //create book thumbnail
              let newThumbnailCell = newRow.insertCell(0)
              var img = document.createElement('img');
              img.src = thumbnail;
              newThumbnailCell.appendChild(img);

              //create book title
              let newTitleCell = newRow.insertCell(1)
              let titleCell = document.createTextNode(title);
              newTitleCell.appendChild(titleCell);
              
              //create book author
              let newAuthorCell = newRow.insertCell(2)
              let authorCell = document.createTextNode(authors);
              newAuthorCell.appendChild(authorCell);

              //create book pages
              let newPagesCell = newRow.insertCell(3)
              let pagesCell = document.createTextNode(pageCount);
              newPagesCell.appendChild(pagesCell);
            
        }
        }
    // Send request
    request.send()
    resultsBox.style.visibility = "visible"
  } else{
    //if no title provided clear results
    clearSearchTable()
  }
  document.getElementById("form_container").addEventListener("click", clearSearchTable)
}


//change read / not read buttons to "switch" checkboxes
//add bookmarked page
//on click of a row expand to show books api previewer