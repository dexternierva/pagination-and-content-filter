/**
  * Pagination and Content Filter
  * https://github.com/dexternierva/pagination-and-content-filter
*/

var page = document.querySelector('div.page');
var ul = document.querySelector('.student-list');
var li = ul.children;
var listItemsArray = Array.apply(null, li); // convert lis into an array
var numOfItems = li.length;
var displayItems = 10;
var pagination = document.createElement('ul');
var numOfPages = numOfItems / displayItems;
var pageHeader = document.querySelector('.page-header');

/**
 * Split the Array into chunks of a given size
 * Returned array should be grouped by ten
*/
var createGroupedArray = function (arr, chunkSize) {
	var groups = [], i;
	for (var i = 0; i < arr.length; i += chunkSize) {
		groups.push(arr.slice(i, i + chunkSize));
	}

	return groups;
}
var studentsArray = createGroupedArray(listItemsArray, displayItems);

// Function that hides list items from student list
function clearStudentList () {
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.lastChild);
	}
}

// Function that appends newContent to the list
function appendNewContent (newContent) {
	for ( var i = 0; i < newContent.length; i++ ) {
		ul.appendChild(newContent[i]);
	}
}

// Add the 'active' class to clicked pagination links
function addActiveClass (el) {
	var paginationLinks = document.querySelectorAll('a.paginationLink');
	for (var i = 0; i < paginationLinks.length; i++) {
		paginationLinks[i].classList.remove('active');
	}
	el.classList.add('active');
}

/**
 * Build the pagination elements
 * Add click event and append to page
*/
function buildPagination() {
	// Check if numOfItems / displayItems has a remainder
	if ( (numOfItems % displayItems) > 1 ) {
		numOfPages += 1; // Add 1 page for remainders
	}
	pagination.classList.add('pagination');

	// Create list items for the pagination ul
	for ( var i = 1; i < numOfPages; i += 1 ) {
		var listItem = '<li><a class="paginationLink" href="#">' + i + '</a></li>';
		pagination.innerHTML += listItem;
	}

	page.appendChild(pagination);

	// Add click event on the pagination links
	var paginationLinks = document.querySelectorAll('a.paginationLink');
	for (var i = 0; i < paginationLinks.length; i++) {
		paginationLinks[i].addEventListener('click', paginationEvent);
	}
}

// function to be executed when a pagination link is clicked
function paginationEvent (event) {
	event.preventDefault();
	var index = parseInt(this.innerHTML);
		index = index - 1;
	var newContent = studentsArray[index];

	// Add 'active' class
	addActiveClass(this);

	// Remove current children of student list
	clearStudentList();

	// Append newContent to student list
	appendNewContent(newContent);
}

/**
 * Initialization Function
 *
*/
function init() {
	clearStudentList();
	appendNewContent(studentsArray[0]);

	// Add pagination to the page
	buildPagination();

	// Add the search form
	searchFormCreation();

	// add class active on the first pagination links
	var firstPaginationLink = document.querySelector('a.paginationLink');
	firstPaginationLink.classList.add('active');
}
// Initialize
init();


/**
 * Search form
 *
*/
function searchFormCreation () {
	var searchContainer = document.createElement('div');
	var searchInput = document.createElement('input');
	var searchBtn = document.createElement('button');

	// Modify elements
	searchContainer.className = 'student-search';
	searchInput.placeholder = 'Search for students...';
	searchInput.className = 'searchInput';
	searchBtn.innerText = 'Search';
	searchBtn.className = 'search';

	// Append searchInput and searchBtn to searchContainer
	pageHeader.appendChild(searchContainer);
	searchContainer.appendChild(searchInput);
	searchContainer.appendChild(searchBtn);
}

// Function to loop and search through the array
function searchItems(item) {
	// search through the listItemsArray for the 'item'
	var results = []; // store matched items here

	for (var i = 0; i < listItemsArray.length; i++) {
		if(listItemsArray[i].innerText.toLowerCase().indexOf(item) > -1) {
			results.push(listItemsArray[i]);
		}
	}

	if ( results.length > 0 ) {
		clearStudentList();
		appendNewContent(results);
	} else {
		alert( 'Sorry, ' + item + ' is not in our list' );
	}
}

//Event handler for the search button when clicked
function searchEvent () {
	// check if input has a value
	var formInput = document.querySelector('.searchInput');

	if (formInput.value === '') {
		formInput.placeholder = 'Please enter a value...';
	} else {
		searchItems( formInput.value.toLowerCase() );
	}
}

// When search button is clicked
var formSearch = document.querySelector('.search');
formSearch.addEventListener('click', searchEvent);
