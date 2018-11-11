// script to interact with our eos blockchain
// send data from kelley blue book

// initialize values to be sent to blockchain
let localGenre = "Auto";
let localCategory = "N/A";
let localDetail = "N/A";

// sets up make listeners after user has clicked on a category
// currently method not needed
/* function setupMakes() {
  console.log('finding current vehicle category...');
  const category = document.getElementsByClassName("category-name")[0].textContent;
  console.log('category:', category);
  console.log('setting makes...');
  $( ".contentlist.make-list.no-bull.left li" ).each(function( index ) {
    // fetch make elements from DOM
    const make = $( this ).text().trim(); // trim keeps white space consistent
    console.log( index + ": " + make );

    // set on click listener to all makes
    $( this ).click(function() {
      console.log('clicked on:', make);
      sendToBlockchain("Auto", category, make);
      // send data to eos blockchain
    });
  });
} */

// setups category listeners on https://www.kbb.com/new-cars/
// currently method not needed
/* function setupCategories() {
  console.log('setting categories...');
  $( ".infotip.category.text-center" ).each(function( index ) {
    // fetch category elements from DOM
    const elementContent = $( this ).text().trim(); // trim removes whitespace from start and end
    const category = elementContent.substr(0,elementContent.indexOf("\n"));
    console.log( index + ": " + category );

    // set on click listener to all categories
    $( this ).click(function() {
      console.log('clicked on:', category);
      sendToBlockchain("Auto", category);
      // send data to eos blockchain
    });
  });
} */

function sendToBlockchain(genre, category, detail) {
  // put data into array so I can go through and verify each data field as valid
  let dataArray = [genre, category, detail];
  // processes values that may be null
  for(let i = 0; i < dataArray.length; i++) {
    if(dataArray[i] == null) {
      console.log('data at index ' + i + ' was null');
      dataArray[i] = "N/A";
    } else {
      // just making the data to pass pretty, capitalizing the first letter
      dataArray[i] = dataArray[i].charAt(0).toUpperCase() + dataArray[i].slice(1);
    }
  }

  console.log('Data to send to blockchain:', dataArray);

  // send to blockchain logic

}

function isCategoryPath(path) {
  if(path === "/sedan/" || path === "/suv/" || path === "/crossover/" ||
      path === "/luxury-car/" || path === "/pickup-truck/" || path === "/van-minivan/" ||
      path === "/hybrid/" || path === "/electric-car/" || path === "/coupe/" ||
      path === "/hatchback/" || path === "/wagon/" || path === "/convertible") {
        return true;
      } else {
        return false;
      }
}

function isCategoryModelPath(path) {
  const slashLength = (path.match(/\//g) || []).length;
  console.log(slashLength);
  if(slashLength === 3) {
        return true;
      } else {
        return false;
      }
}

function getModel(path) {
  const pathArray = path.split('/');
  localDetail = pathArray[1];
}

function getCategory(path) {
  const pathArray = path.split('/');
  localCategory = pathArray[1];
}

function getCategoryModel(path) {
  const pathArray = path.split('/');
  localCategory = pathArray[2];
  localDetail = pathArray[1];
}

const path = window.location.pathname;
console.log('window path:', path);

if(path === "/") {
  localCategory = "N/A";
  localDetail = "N/A";
} else if(path === "/new-cars/") {
  localCategory = "New Cars";
  localDetail = "N/A";
} else if(isCategoryPath(path)) {
  getCategory(path);
} else if(isCategoryModelPath(path)){
  console.log('is cat model path');
  getCategoryModel(path);
} else {
  // was model path, get model
  getModel(path);
}

sendToBlockchain(localGenre, localCategory, localDetail);

console.log('content script active');
