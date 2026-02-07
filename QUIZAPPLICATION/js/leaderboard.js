// Initialize leaderboard
function initLeaderboard() {
    loadLeaderboard();
}

// Load leaderboard data
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const tbody = document.getElementById("leaderboardBody");
    
    tbody.innerHTML = "";
    
    if(leaderboard.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; padding:40px;">
                    No scores yet! Be the first to take the quiz! 🎯
                </td>
            </tr>
        `;
        return;
    }
    
    // Display leaderboard
    leaderboard.forEach((entry, index) => {
        const row = document.createElement("tr");
        
        // Highlight top 3
        if(index === 0) row.classList.add("rank-1");
        if(index === 1) row.classList.add("rank-2");
        if(index === 2) row.classList.add("rank-3");
        
        // Highlight current user
        const currentUser = localStorage.getItem("currentUser");
        if(entry.username === currentUser) {
            row.style.backgroundColor = "#e8f4f8";
            row.style.fontWeight = "bold";
        }
        
        // Format time
        const minutes = Math.floor(entry.timeTaken / 60);
        const seconds = entry.timeTaken % 60;
        const timeDisplay = minutes > 0 ? 
            `${minutes}m ${seconds}s` : 
            `${seconds}s`;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.username} ${entry.username === currentUser ? " (You)" : ""}</td>
            <td>${entry.score}</td>
            <td>${timeDisplay}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Go to quiz page
function goToQuiz() {
    window.location.href = "quiz.html";
}

// Go to home
function goHome() {
    window.location.href = "index.html";
}

// Initialize when page loads
window.onload = initLeaderboard;