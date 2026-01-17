// Quiz variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 600; // 10 minutes
let timerInterval;
let userAnswers = [];
let quizStartTime;

// Initialize quiz
function initQuiz() {
    // Check authentication
    if(!localStorage.getItem("currentUser")) {
        window.location.href = "index.html";
        return;
    }
    
    // Set user welcome
    document.getElementById("welcomeUser").textContent = 
        "Welcome, " + localStorage.getItem("currentUser") + "!";
    
    // Set total questions
    document.getElementById("totalQuestions").textContent = questions.length;
    
    // Initialize user answers array
    userAnswers = new Array(questions.length).fill(-1);
    
    // Record start time
    quizStartTime = new Date();
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion(currentQuestion);
}

// Start timer
function startTimer() {
    updateTimer();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

// Update timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if(timeLeft < 60) {
        document.getElementById("timer").style.background = "#ff4757";
    }
}

// Load question
function loadQuestion(index) {
    const question = questions[index];
    
    // Update question number
    document.getElementById("questionNum").textContent = index + 1;
    
    // Set question text
    document.getElementById("questionText").textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option, i) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        if(userAnswers[index] === i) {
            optionDiv.classList.add("selected");
        }
        optionDiv.textContent = `${String.fromCharCode(65 + i)}. ${option}`;
        optionDiv.onclick = () => selectOption(i);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update buttons
    updateButtons();
}

// Select option
function selectOption(optionIndex) {
    // Remove selection from all options
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    
    // Add selection to clicked option
    options[optionIndex].classList.add("selected");
    
    // Save answer
    userAnswers[currentQuestion] = optionIndex;
    
    // Enable next/submit button
    updateButtons();
}

// Update navigation buttons
function updateButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    
    // Previous button
    prevBtn.disabled = currentQuestion === 0;
    
    // Next/Submit buttons
    if(currentQuestion === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
        submitBtn.disabled = userAnswers[currentQuestion] === -1;
    } else {
        nextBtn.style.display = "block";
        submitBtn.style.display = "none";
        nextBtn.disabled = userAnswers[currentQuestion] === -1;
    }
}

// Next question
function nextQuestion() {
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

// Previous question
function prevQuestion() {
    if(currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// Submit quiz
function submitQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    let correct = 0;
    for(let i = 0; i < questions.length; i++) {
        if(userAnswers[i] === questions[i].answer) {
            correct++;
        }
    }
    
    score = Math.round((correct / questions.length) * 100);
    
    // Calculate time taken
    const quizEndTime = new Date();
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);
    
    // Save result
    const result = {
        username: localStorage.getItem("currentUser"),
        score: score,
        correct: correct,
        total: questions.length,
        timeTaken: timeTaken,
        date: new Date().toISOString()
    };
    
    localStorage.setItem("quizResult", JSON.stringify(result));
    
    // Update leaderboard
    updateLeaderboard(result.username, score, timeTaken);
    
    // Redirect to result page
    window.location.href = "result.html";
}

// Update leaderboard
function updateLeaderboard(username, score, timeTaken) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    leaderboard.push({
        username: username,
        score: score,
        timeTaken: timeTaken,
        date: new Date().toISOString()
    });
    
    // Sort by score (high to low)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 20 scores
    if(leaderboard.length > 20) {
        leaderboard = leaderboard.slice(0, 20);
    }
    
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Initialize when page loads
window.onload = initQuiz;