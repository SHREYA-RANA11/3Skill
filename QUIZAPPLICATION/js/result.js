// Initialize results page
function initResults() {
    // Get result from localStorage
    const result = JSON.parse(localStorage.getItem("quizResult"));
    
    if(!result) {
        window.location.href = "quiz.html";
        return;
    }
    
    // Display results
    document.getElementById("score").textContent = result.score;
    document.getElementById("correct").textContent = result.correct;
    document.getElementById("total").textContent = result.total;
    document.getElementById("time").textContent = result.timeTaken + "s";
    document.getElementById("percentage").textContent = result.score + "%";
    
    // Display message
    const message = document.getElementById("message");
    if(result.score >= 90) {
        message.textContent = "Excellent! 🏆 You're a quiz master!";
        message.style.color = "#2ecc71";
    } else if(result.score >= 70) {
        message.textContent = "Great job! 👍 You did well!";
        message.style.color = "#3498db";
    } else if(result.score >= 50) {
        message.textContent = "Good effort! 📚 Keep learning!";
        message.style.color = "#f39c12";
    } else {
        message.textContent = "Keep trying! 💪 Practice makes perfect!";
        message.style.color = "#e74c3c";
    }
}

// Take quiz again
function takeQuizAgain() {
    window.location.href = "quiz.html";
}

// View leaderboard
function viewLeaderboard() {
    window.location.href = "leaderboard.html";
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("quizResult");
    window.location.href = "index.html";
}

// Initialize when page loads
window.onload = initResults;