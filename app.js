// ============ GLOBAL VARIABELS ============ //
const endpoint =
    "https://race-dat-v1-default-rtdb.europe-west1.firebasedatabase.app";
let selectedUser;

// ============ READ ============ //
// Read (GET) all users from Firebase (Database) using REST API
async function readUsers() {
    const response = await fetch(`${endpoint}/users.json`);
    const data = await response.json();
    const users = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
    return users;
}

// Create HTML and display all users from given list
function displayUsers(list) {
    // reset <section id="users-grid" class="grid-container">...</section>
    document.querySelector("#users-grid").innerHTML = "";
    //loop through all users and create an article with content for each
    for (const user of list) {
        document.querySelector("#users-grid").insertAdjacentHTML(
            "beforeend",
            /*html*/ `
            <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <p>${user.title}</p>
                <a href="mailto:${user.mail}">${user.mail}</a>
                 <div class="btns">
                    <button class="btn-update-user">Update</button>
                    <button class="btn-delete-user">Delete</button>
                </div>
            </article>
        `
        );
        document
            .querySelector("#users-grid article:last-child .btn-delete-user")
            .addEventListener("click", () => deleteUser(user.id));
        document
            .querySelector("#users-grid article:last-child .btn-update-user")
            .addEventListener("click", () => selectUser(user));
    }
}

// ============ CREATE ============ //
// Create (POST) user to Firebase (Database) using REST API
async function createUser(event) {
    event.preventDefault();
    // create reference (variable) to name, title, mail, image in event.target.xxxx.value
    // to do...

    // create a new user
    const newUser = {}; // to do: use name, title, mail, image
    const userAsJson = JSON.stringify(newUser);
    const response = await fetch(`${endpoint}/users.json`, {
        method: "POST",
        body: userAsJson
    });

    if (response.ok) {
        // if success, update the users grid
        updateUsersGrid();
        // and scroll to top
        scrollToTop();
    }
}

// ============ UPDATE ============ //
function selectUser(user) {
    // set global varaiable
    selectedUser = user;
    const form = document.querySelector("#form-update");

    // set form input fields with user properties/values
    // to do...

    form.scrollIntoView({ behavior: "smooth" });
}

async function updateUser(event) {
    event.preventDefault();
    // create reference (variable) to name, title, mail, image in event.target.xxxx.value
    // to do...

    // update user
    const userToUpdate = {}; // to do: use name, title, mail, image
    const userAsJson = JSON.stringify(userToUpdate);
    const response = await fetch(`${endpoint}/users/${selectedUser.id}.json`, {
        method: "PUT",
        body: userAsJson
    });
    if (response.ok) {
        // if success, update the users grid
        // to do...
        // and scroll to top
<<<<<<< Updated upstream
        scrollToTop();
=======
        // to do...
>>>>>>> Stashed changes
    }
}

// ================== DELETE ============ //
async function deleteUser(id) {
    const response = await fetch(`${endpoint}/users/${id}.json`, {
        method: "DELETE"
    });
    if (response.ok) {
        // if success, update the users grid
        // to do...
    }
}

// ================== Events and Event Listeners ============ //
document.querySelector("#form-update").addEventListener("submit", updateUser);
document.querySelector("#form-create").addEventListener("submit", createUser);

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateUsersGrid() {
    const users = await readUsers();
    displayUsers(users);
}

// ============ Init CRUD App ============ //
// initialize the grid view with users, call updateUsersGrid
// to do...
