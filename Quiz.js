    // Quiz questions
    const questions = [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which language styles web pages?",
            answers: [
                "HTML",
                "CSS",
                "JavaScript"
            ],
            correct: 1
        },
        {
            question: "Which language adds interactivity to web pages?",
            answers: [
                "HTML",
                "CSS",
                "JavaScript"
            ],
            correct: 2
        }
    ];

    // Quiz state
    let currentQuestion = 0;
    let score = 0;

    // DOM elements
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');
    const resultsElement = document.getElementById('results');

    // Load question
    function loadQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;
        
        answersElement.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answersElement.appendChild(button);
        });
    }

    // Select answer
    function selectAnswer(index) {
        const question = questions[currentQuestion];
        const buttons = answersElement.querySelectorAll('button');
        
        if (index === question.correct) {
            buttons[index].style.backgroundColor = '#8bc34a';
            score++;
        } else {
            buttons[index].style.backgroundColor = '#f44336';
            buttons[question.correct].style.backgroundColor = '#8bc34a';
        }
        
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        nextButton.style.display = 'block';
    }

    // Show results
    function showResults() {
        questionElement.textContent = '';
        answersElement.innerHTML = '';
        nextButton.style.display = 'none';
        resultsElement.textContent = `Your score: ${score} out of ${questions.length}`;
    }

    // Next question
    nextButton.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            nextButton.style.display = 'none';
        } else {
            showResults();
        }
    });

    // Start quiz
    loadQuestion();
});
