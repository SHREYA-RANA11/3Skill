// Check if users exist in localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Register new user
function registerUser(username, email, password) {
    // Check if email already exists
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === email) {
            alert("Email already registered! Please login.");
            return;
        }
    }
    
    // Add new user
    const newUser = {
        username: username,
        email: email,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username);
    
    alert("Registration successful!");
    window.location.href = "quiz.html";
}

// Login user
function loginUser(email, password) {
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === email && users[i].password === password) {
            localStorage.setItem("currentUser", users[i].username);
            window.location.href = "quiz.html";
            return;
        }
    }
    
    alert("Wrong email or password!");
}

// Check if user is logged in
function checkAuth() {
    if(!localStorage.getItem("currentUser")) {
        window.location.href = "index.html";
    }
}

// Logout user
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}