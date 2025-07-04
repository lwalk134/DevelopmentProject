document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const resultsDiv = document.getElementById('results');
    const scoreSpan = document.getElementById('score');
    const passFail = document.getElementById('pass-fail');
    const answerFeedback = document.getElementById('answer-feedback');
    const restartBtn = document.getElementById('restart-quiz');

    // Correct answers
    const correctAnswers = {
        q1: 'a',
        q2: 'a',
        q3: 'a',
        q4: ['a', 'b'],
        q5: 'attributes'
    };

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        let feedbackHTML = '';
        
        // Check Q1
        const q1Selected = document.querySelector('input[name="q1"]:checked');
        if (q1Selected && q1Selected.value === correctAnswers.q1) {
            score++;
            feedbackHTML += `<p class="feedback-correct">1. Correct! Bootstrap was developed by Twitter.</p>`;
        } else {
            feedbackHTML += `<p class="feedback-incorrect">1. Incorrect. The correct answer is: Twitter</p>`;
        }
        
        // Check Q2
        const q2Selected = document.querySelector('input[name="q2"]:checked');
        if (q2Selected && q2Selected.value === correctAnswers.q2) {
            score++;
            feedbackHTML += `<p class="feedback-correct">2. Correct! HTML stands for Hypertext Markup Language.</p>`;
        } else {
            feedbackHTML += `<p class="feedback-incorrect">2. Incorrect. The correct answer is: Hypertext Markup Language</p>`;
        }
        
        // Check Q3
        const q3Selected = document.querySelector('input[name="q3"]:checked');
        if (q3Selected && q3Selected.value === correctAnswers.q3) {
            score++;
            feedbackHTML += `<p class="feedback-correct">3. Correct! W3C maintains CSS specifications.</p>`;
        } else {
            feedbackHTML += `<p class="feedback-incorrect">3. Incorrect. The correct answer is: W3C</p>`;
        }
        
        // Check Q4 (multiple correct)
        const q4Selected = Array.from(document.querySelectorAll('input[name="q4"]:checked')).map(el => el.value);
        const q4Correct = q4Selected.length === correctAnswers.q4.length && 
                          q4Selected.every(val => correctAnswers.q4.includes(val));
        
        if (q4Correct) {
            score++;
            feedbackHTML += `<p class="feedback-correct">4. Correct! HTML supports Ordered and Unordered lists.</p>`;
        } else {
            feedbackHTML += `<p class="feedback-incorrect">4. Incorrect. The correct answers are: Ordered and Unordered</p>`;
        }
        
        // Check Q5 (fill in blank)
        const q5Answer = document.querySelector('input[name="q5"]').value.trim().toLowerCase();
        if (q5Answer === correctAnswers.q5) {
            score++;
            feedbackHTML += `<p class="feedback-correct">5. Correct! Attributes provide additional information about HTML elements.</p>`;
        } else {
            feedbackHTML += `<p class="feedback-incorrect">5. Incorrect. The correct answer is: Attributes</p>`;
        }
        
        // Display results
        scoreSpan.textContent = score;
        passFail.textContent = score >= 3 ? 'You passed!' : 'You failed. Try again!';
        passFail.className = score >= 3 ? 'feedback-correct' : 'feedback-incorrect';
        answerFeedback.innerHTML = feedbackHTML;
        
        // Show results, hide form
        quizForm.classList.add('hidden');
        resultsDiv.classList.remove('hidden');
    });
    
    // Restart quiz
    restartBtn.addEventListener('click', function() {
        quizForm.reset();
        resultsDiv.classList.add('hidden');
        quizForm.classList.remove('hidden');
    });
});