const quizData = [
    {
        question: 'Where does Hugo Boss have the premises?',
        a: 'Italy',
        b: 'USA', 
        c: 'Germany',
        d: 'France',
        correct: 'c'
    }, {
        question: 'When was CH Good Girl released?',
        a: '2018',
        b: '2016',
        c: '2020',
        d: '2012',
        correct: 'b'
    } , {
        question: 'What is the most gorgeaus bottle of perfume for men?',
        a: 'CH Bad Boy',
        b: 'Dior Sauvage',
        c: 'Paco Rabanne One Million',
        d: 'Jean Paul Gaultier Ultra Male',
        correct: 'a'
    } , {

        question: 'Which is the feminine fragrance from the list below?',
        a: 'Giorgio Armani Stronger With You',
        b: 'Paco Rabanne Invictus',
        c: 'Armani Acqua Di Gio',
        d: 'Dior Hypnotic Poison',
        correct: 'd'
    }
]

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const quiz = document.getElementById('quiz');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    
}

function getSelected () {
    const answerEls = document.querySelectorAll('.answer');

    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked) 
        answer = answerEl.id;
    })

    return answer; 

}

function deselectAnswers () {
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    })
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();


    if(answer) {

        if(answer === quizData[currentQuiz].correct)
            score++;
        currentQuiz++;
        if(currentQuiz < quizData.length) 
            loadQuiz();
        else 
            quiz.innerHTML = `<h2>You answered correctly at ${score} / ${quizData.length} questions.</h2>
            <button onClick="location.reload()">Reload</button>`;
    }

})