// Quiz questions and answers
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        answer: "Harper Lee"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: "2"
    }
];

// Select DOM elements
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submitButton');
const resultContainer = document.getElementById('result');

// Function to load the quiz
const loadQuiz = () => {
    quizData.forEach((item, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<h2>${index + 1}. ${item.question}</h2>`;

        const optionsList = document.createElement('ul');
        optionsList.classList.add('options');

        item.options.forEach(option => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="radio" name="question${index}" value="${option}" id="${option}">
                <label for="${option}">${option}</label>
            `;
            optionsList.appendChild(li);
        });

        questionElement.appendChild(optionsList);
        quizContainer.appendChild(questionElement);
    });
};

// Function to calculate results
const calculateResults = () => {
    let score = 0;
    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === item.answer) {
            score++;
        }
    });
    return score;
};

// Event listener for the Submit button
submitButton.addEventListener('click', () => {
    const score = calculateResults();
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}.`;
});

// Load the quiz on page load
loadQuiz();