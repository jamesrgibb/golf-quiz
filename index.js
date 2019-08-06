let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

//change the question
function changeQuestionNumber () {
    questionNumber++;
  $('.questionNumber').text(questionNumber+1);
}

//increment score
function changeScore () {
  score++;
}

//start Quiz
function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.testForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

// render question in DOM
function renderQuestion () {
  $('.testForm').html(generateQuestion());
}

//user answers and then triggers the feedback functions
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}
//update score if answer is right
function ifAnswerIsCorrect () {
  answerFeedBackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  answerFeedBackWrong();
}

//inform the user they answered correctly.
function answerFeedBackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.testForm').html(`<div class="correctFeedback"><div class="icon"></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

//inform the user they answered incorrectly and the correct answer. 
function answerFeedBackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  
  $('.testForm').html(`<div class="correctFeedback"><div class="icon"></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

//change and update the score
function updateScore () {
  changeScore();
  $('.score').text(score);
}

//html added at the end
function renderResults () {
  if (score >= 8) {
    $('.testForm').html(`<div class="results correctFeedback"><h3>Good job ole chap!</h3><p>Your score was ${score} / 10</p><p>A true golf expert!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.testForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><p>Your score was ${score} / 10</p><p>You may want to study the rule book again...</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.testForm').html(`<div class="results correctFeedback"><h3>Ouch! You need a lot of practice</h3><p>Your score was:  ${score} / 10</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

//next Button
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);

