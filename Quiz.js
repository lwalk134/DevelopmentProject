<<<<<<< HEAD
/**
 * Web Development Quiz
 * Responsive JavaScript quiz with scoring and progress tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    // Quiz questions
    const questions = [
        {
            question: "What does HTML stand for?",
            answers: [
                { text: "Hyper Text Markup Language", correct: true },
                { text: "Hyperlinks and Text Markup Language", correct: false },
                { text: "Home Tool Markup Language", correct: false },
                { text: "Hyper Transfer Markup Language", correct: false }
            ]
        },
        {
            question: "Which of these is NOT a semantic HTML element?",
            answers: [
                { text: "<div>", correct: true },
                { text: "<article>", correct: false },
                { text: "<section>", correct: false },
                { text: "<header>", correct: false }
            ]
        },
        {
            question: "What does CSS stand for?",
            answers: [
                { text: "Cascading Style Sheets", correct: true },
                { text: "Computer Style Sheets", correct: false },
                { text: "Creative Style Sheets", correct: false },
                { text: "Colorful Style Sheets", correct: false }
            ]
        },
        {
            question: "Which CSS property controls text size?",
            answers: [
                { text: "font-size", correct: true },
                { text: "text-size", correct: false },
                { text: "font-style", correct: false },
                { text: "text-style", correct: false }
            ]
        },
        {
            question: "Where is the correct place to insert JavaScript in HTML?",
            answers: [
                { text: "Both the <head> and <body> sections", correct: true },
                { text: "Only the <head> section", correct: false },
                { text: "Only the <body> section", correct: false },
                { text: "In a separate file only", correct: false }
            ]
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image?",
            answers: [
                { text: "alt", correct: true },
                { text: "title", correct: false },
                { text: "src", correct: false },
                { text: "href", correct: false }
            ]
        },
        {
            question: "Which CSS property is used to change the background color?",
            answers: [
                { text: "background-color", correct: true },
                { text: "color", correct: false },
                { text: "bgcolor", correct: false },
                { text: "background", correct: false }
            ]
        },
        {
            question: "How do you create a function in JavaScript?",
            answers: [
                { text: "function myFunction()", correct: true },
                { text: "function = myFunction()", correct: false },
                { text: "function:myFunction()", correct: false },
                { text: "create myFunction()", correct: false }
            ]
        },
        {
            question: "Which HTML element is used to specify a footer for a document?",
            answers: [
                { text: "<footer>", correct: true },
                { text: "<bottom>", correct: false },
                { text: "<section>", correct: false },
                { text: "<div>", correct: false }
            ]
        },
        {
            question: "Which operator is used to assign a value to a variable in JavaScript?",
            answers: [
                { text: "=", correct: true },
                { text: "*", correct: false },
                { text: "-", correct: false },
                { text: "x", correct: false }
            ]
        }
    ];

    // DOM Elements
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const resultsElement = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const currentQuestionElement = document.getElementById('current-question');
    const progressFill = document.querySelector('.progress');
    const quizProgress = document.getElementById('quiz-progress');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-btn');

    // Quiz State
    let shuffledQuestions, currentQuestionIndex, score;

    // Initialize Quiz
    function initQuiz() {
        totalQuestionsElement.textContent = questions.length;
        startButton.addEventListener('click', startQuiz);
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            setNextQuestion();
        });
        restartButton.addEventListener('click', startQuiz);
    }

    // Start Quiz
    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        
        startButton.classList.add('hide');
        quizProgress.classList.remove('hide');
        questionContainer.classList.remove('hide');
        resultsElement.classList.add('hide');
        
        setNextQuestion();
    }

    // Set Next Question
    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        
        // Update progress
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }

    // Show Question
    function showQuestion(question) {
        questionElement.innerText = question.question;
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('answer-btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    // Reset State
    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    // Select Answer
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        // Update score if correct
        if (correct) {
            score++;
        }
        
        // Highlight correct/incorrect answers
        setStatusClass(selectedButton, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
            button.disabled = true;
        });
        
        // Show next button or end quiz
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            showResults();
        }
    }

    // Set Status Class
    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }

    // Clear Status Class
    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('incorrect');
    }

    // Show Results
    function showResults() {
        questionContainer.classList.add('hide');
        quizProgress.classList.add('hide');
        resultsElement.classList.remove('hide');
        scoreElement.innerText = score;
        
        // Set result message based on score
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) {
            resultMessage.innerText = "Excellent! You have a strong understanding of web development fundamentals.";
        } else if (percentage >= 60) {
            resultMessage.innerText = "Good job! You know the basics but could learn more.";
        } else {
            resultMessage.innerText = "Keep studying! Review the material and try again.";
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    // Initialize the quiz
    initQuiz();
=======
/**
 * Web Development Quiz
 * Responsive JavaScript quiz with scoring and progress tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    // Quiz questions
    const questions = [
        {
            question: "What does HTML stand for?",
            answers: [
                { text: "Hyper Text Markup Language", correct: true },
                { text: "Hyperlinks and Text Markup Language", correct: false },
                { text: "Home Tool Markup Language", correct: false },
                { text: "Hyper Transfer Markup Language", correct: false }
            ]
        },
        {
            question: "Which of these is NOT a semantic HTML element?",
            answers: [
                { text: "<div>", correct: true },
                { text: "<article>", correct: false },
                { text: "<section>", correct: false },
                { text: "<header>", correct: false }
            ]
        },
        {
            question: "What does CSS stand for?",
            answers: [
                { text: "Cascading Style Sheets", correct: true },
                { text: "Computer Style Sheets", correct: false },
                { text: "Creative Style Sheets", correct: false },
                { text: "Colorful Style Sheets", correct: false }
            ]
        },
        {
            question: "Which CSS property controls text size?",
            answers: [
                { text: "font-size", correct: true },
                { text: "text-size", correct: false },
                { text: "font-style", correct: false },
                { text: "text-style", correct: false }
            ]
        },
        {
            question: "Where is the correct place to insert JavaScript in HTML?",
            answers: [
                { text: "Both the <head> and <body> sections", correct: true },
                { text: "Only the <head> section", correct: false },
                { text: "Only the <body> section", correct: false },
                { text: "In a separate file only", correct: false }
            ]
        },
        {
            question: "Which HTML attribute specifies an alternate text for an image?",
            answers: [
                { text: "alt", correct: true },
                { text: "title", correct: false },
                { text: "src", correct: false },
                { text: "href", correct: false }
            ]
        },
        {
            question: "Which CSS property is used to change the background color?",
            answers: [
                { text: "background-color", correct: true },
                { text: "color", correct: false },
                { text: "bgcolor", correct: false },
                { text: "background", correct: false }
            ]
        },
        {
            question: "How do you create a function in JavaScript?",
            answers: [
                { text: "function myFunction()", correct: true },
                { text: "function = myFunction()", correct: false },
                { text: "function:myFunction()", correct: false },
                { text: "create myFunction()", correct: false }
            ]
        },
        {
            question: "Which HTML element is used to specify a footer for a document?",
            answers: [
                { text: "<footer>", correct: true },
                { text: "<bottom>", correct: false },
                { text: "<section>", correct: false },
                { text: "<div>", correct: false }
            ]
        },
        {
            question: "Which operator is used to assign a value to a variable in JavaScript?",
            answers: [
                { text: "=", correct: true },
                { text: "*", correct: false },
                { text: "-", correct: false },
                { text: "x", correct: false }
            ]
        }
    ];

    // DOM Elements
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const resultsElement = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const currentQuestionElement = document.getElementById('current-question');
    const progressFill = document.querySelector('.progress');
    const quizProgress = document.getElementById('quiz-progress');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-btn');

    // Quiz State
    let shuffledQuestions, currentQuestionIndex, score;

    // Initialize Quiz
    function initQuiz() {
        totalQuestionsElement.textContent = questions.length;
        startButton.addEventListener('click', startQuiz);
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            setNextQuestion();
        });
        restartButton.addEventListener('click', startQuiz);
    }

    // Start Quiz
    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        
        startButton.classList.add('hide');
        quizProgress.classList.remove('hide');
        questionContainer.classList.remove('hide');
        resultsElement.classList.add('hide');
        
        setNextQuestion();
    }

    // Set Next Question
    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        
        // Update progress
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }

    // Show Question
    function showQuestion(question) {
        questionElement.innerText = question.question;
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('answer-btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    // Reset State
    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    // Select Answer
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        // Update score if correct
        if (correct) {
            score++;
        }
        
        // Highlight correct/incorrect answers
        setStatusClass(selectedButton, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
            button.disabled = true;
        });
        
        // Show next button or end quiz
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            showResults();
        }
    }

    // Set Status Class
    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }

    // Clear Status Class
    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('incorrect');
    }

    // Show Results
    function showResults() {
        questionContainer.classList.add('hide');
        quizProgress.classList.add('hide');
        resultsElement.classList.remove('hide');
        scoreElement.innerText = score;
        
        // Set result message based on score
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) {
            resultMessage.innerText = "Excellent! You have a strong understanding of web development fundamentals.";
        } else if (percentage >= 60) {
            resultMessage.innerText = "Good job! You know the basics but could learn more.";
        } else {
            resultMessage.innerText = "Keep studying! Review the material and try again.";
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    // Initialize the quiz
    initQuiz();
>>>>>>> 365f978379a2fe2419f4528ec5b1bc1a9f0a098c
});