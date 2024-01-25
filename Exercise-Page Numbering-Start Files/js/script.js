// Wait for the HTML document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the list of users from the data.js file
    const users = window.users;

    // Set the number of users to display per page
    const usersPerPage = 10;

    // Calculate the total number of pages needed for pagination
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Reference the container for pagination links in the HTML
    const paginationContainer = document.querySelector(".pagination ul");

    // Validate the container
    if (!paginationContainer) {
        
        console.error("Pagination container not found");
        return; 
    }

    // Loop to create pagination links
    for (let i = 1; i <= totalPages; i++) {
        // Create a list item for each page
        const li = document.createElement("li");

        // Set the inner HTML of the list item with a link to the page
        li.innerHTML = `<a href="#">${i}</a>`;

        // Add a click event listener to the list item
        li.addEventListener("click", function () {
            // Call the displayUsers function when a page link is clicked
            displayUsers(i, users, usersPerPage);
        });

        // Append the list item to the pagination container
        paginationContainer.appendChild(li);
    }

    // Show the first page of users when the page loads
    displayUsers(1, users, usersPerPage);

    // Update the total contacts count on the page
    updateTotalContacts(users.length);
});

// Function to display a specific page of users
function displayUsers(pageNumber, users, usersPerPage) {
    // Calculate the starting and ending indexes for the users on the current page
    const startIndex = (pageNumber - 1) * usersPerPage;
    const endIndex = pageNumber * usersPerPage;

    // Get the subset of users for the current page
    const usersForPage = users.slice(startIndex, endIndex);

    // Reference the container for the list of contacts in the HTML
    const contactList = document.querySelector('.contact-list');

    // Clear the existing content in the contact list container
    contactList.innerHTML = '';

    // Loop through the users for the current page and create HTML elements
    usersForPage.forEach(user => {
        const listItem = document.createElement('li');
        listItem.classList.add('contact-item', 'cf');

        const contactDetails = document.createElement('div');
        contactDetails.classList.add('contact-details');

        const avatar = document.createElement('img');
        avatar.classList.add('avatar');
        avatar.src = user.image;

        const name = document.createElement('h3');
        name.textContent = user.name;

        const joinedDetails = document.createElement('div');
        joinedDetails.classList.add(`joined-details`);

        const joinedDate = document.createElement('span');
        joinedDate.classList.add('date');
        joinedDate.textContent = `Joined ${user.joined}`;

        contactDetails.appendChild(avatar);
        contactDetails.appendChild(name);

        joinedDetails.appendChild(joinedDate);

        listItem.appendChild(contactDetails);
        listItem.appendChild(joinedDetails);

        contactList.appendChild(listItem);
    });
}

// Function to update the total contacts count on the page
function updateTotalContacts(total) {
    // Find the element with the ID 'totalContacts' and update its text content
    document.getElementById("totalContacts").textContent = `Total: ${total}`;
}
