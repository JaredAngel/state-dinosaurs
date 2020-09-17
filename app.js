/* eslint-disable strict */

/**
 * Our Notes
 * ---------------------------------------------------------------------------------------------------------------
 * Template Generation Functions:
 *   ↓ these also need helper functions
 *   -generateIntroViewHTML()    // start game btn, instructions
 *   -generateQuestionViewHTML() // questions 1-5 --> if last question -> submit button not next button
 *   -generateFeedbackViewHTML() // question result at each submission
 *   -generateResultsViewHTML()  // overall results and new game btn
 *
 * Render Functions:
 *   -render()
 *     if view === "intro" --> generateIntroViewHTML()
 *     if view === "question" --> generateQuestionViewHTML()
 *     if view === "feedback" --> generateFeedbackViewHTML()
 *     if view === "result" --> generateResultsViewHTML()
 *
 * Event Listener Functions:
 *   -handleStartButtonClick()    // intro page start button;
 *                                // also handles new game button
 *      -calls reset()--> setView("question")
 *   -handleNextButtonClick()     // next question button;
 *                                // also handles submit button
 *      -calls: scoreQuestion(), setView("feedback")
 *   -handleContinueButtonClick() // feedback continue button
 *      -calls: incrementQuestion(), setView("question"), setView("results")
 * ---------------------------------------------------------------------------------------------------------------
 */

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

const store = {
  questions: [
    {
      id: 0,
      image: './images/texas-paluxysaurus.jpg', // Image of offical state dinosaur
      dinosaur: 'Paluxysaurus jonesi', // Official state dinosaur in question
      state: 'Texas', // Answer
      options: ['California', 'Texas', 'Florida', 'Washington'] // Multiple choice options
    },
    {
      id: 1,
      image: './images/utah-utahraptor.png',
      dinosaur: 'Utahraptor ostrommaysorum',
      state: 'Utah',
      options: ['Utah', 'Alaska', 'Massachusetts', 'Pennsylvania']
    },
    {
      id: 2,
      image: './images/wyoming-triceratops.jpg',
      dinosaur: 'Triceratops horridus',
      state: 'Wyoming',
      options: ['Michigan', 'Wyoming', 'Ohio', 'Hawaii']
    },
    {
      id: 3,
      image: './images/connecticut-dilophosaurus.jpg',
      dinosaur: 'Dilophosaurus wetherilli',
      state: 'Connecticut',
      options: ['Illinois', 'Montana', 'Connecticut', 'New York']
    },
    {
      id: 4,
      image: './images/colorado-stegosaurus.jpg',
      dinosaur: 'Stegosaurus armatus',
      state: 'Colorado',
      options: ['Georgia', 'Colorado', 'Oregon', 'North Carolina']
    }
  ],
  
  questionNumber: 0, // The current question number user is on
  correct: false, // Whether user's most recent answer was correct
  score: 0, // The user's cumulative score
  view: 'feedback', // The view of the page: 'intro', 'question', 'feedback', 'results'
};

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/**
 * Return a string containing HTML for the 
 * introductory view.
 */

const generateIntroViewHTML = function () {
  return `
  <section>
    <h2>Do you know your state dinos?</h2>
    <p class="intro"></p>
    <button class="js-start-button">Start Game</button>
  </section>`;

};

const generateQuestionViewHTML = function (question, questionNumber, score, totalQuestions) {
  let progressQuestion = '';
  if(questionNumber === 4) {
    progressQuestion = 'Submit';
  } else {
    progressQuestion = 'Next';
  }
  return `
  <section>
    <h2>(${questionNumber+1}/${totalQuestions}):${question.dinosaur}</h2>
    <img src=${question.image} alt=${question.dinosaur}>
    <p class="question"><i>The ${question.dinosaur} is the official dinosaur of which U.S. state?</i></p>
    
    <form class="js-questionnaire">
      <input type="radio" id="${question.options[0]}" name="answer" value="${question.options[0]}">
      <label for="">${question.options[0]}</label>
      <input type="radio" id="${question.options[1]}" name="answer" value="${question.options[1]}">
      <label for="">${question.options[1]}</label>
      <input type="radio" id="${question.options[2]}" name="answer" value="${question.options[2]}">
      <label for="">${question.options[2]}</label>
      <input type="radio" id="${question.options[3]}" name="answer" value="${question.options[3]}">
      <label for="">${question.options[3]}</label>
      <button class="js-next-button">${progressQuestion}</button>
    </form>
  </section>
  <section>
    <h3>Current Score: ${score} out of ${totalQuestions} correct!</h3>
  </section>

`;

};

/**
 * Return a string containing HTML for the 
 * feedback view.
 */
const generateFeedbackViewHTML = function (correct, question) {
  let reveal = '✓ Correct!';

  if (!correct) reveal = 'Incorrect.';

  return `
    <section>
      <h2>${reveal}</h2>
      <p class="feedback"><i>${question.dinosaur} is the state dinosaur of ${question.state}.</i></p>
      <button class="js-continue-button feedback">Continue</button>
    </section>`;
};

/**
 * Return a string containing HTML for the 
 * results view.
 */
const generateResultsViewHTML = function (score, totalQuestions) {
  let message = '';

  if (score < totalQuestions/3) {
    message = 'Maybe you should study more...';
  } else if (score < totalQuestions/3*2) {
    message = 'Keep trying!';
  } else {
    message = 'You\'ve got too much time on your hands...';
  }

  return `
    <h2 class="group">
      <span class="item">You got:</span>
      <span class="results item">${score}/5</span>
      <span class="item">correct.</span>
    </h2>
    <hr>
    <p class="results">${message}</p>
    <button class="js-start-button">New Game ⟳</button>`;
};


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/**
 * Render the introductory, question,
 * feedback, or results pages in the DOM.
 */
const render = function () {
  let view = store.view;
  let html = '';
  let totalQuestions = store.questions.length;

  if (view === 'intro') {
    html = generateIntroViewHTML();

  } else if (view === 'question') {
    let question = store.questions[store.questionNumber];
    let questionNumber = store.questionNumber;
    let score = store.score;

    html = generateQuestionViewHTML(question, questionNumber, score, totalQuestions);
  } else if (view === 'feedback') {
    let correct = store.correct;
    let question = store.questions[store.questionNumber];


    html = generateFeedbackViewHTML(correct, question);

  } else if (view === 'results') {
    let score = store.score;

    html = generateResultsViewHTML(score, totalQuestions);

  } else {
    throw new Error(`${view} is invalid value for view property`);
  }

  $('main').html(html);
};

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

/**
 * Update store with the view to render.
 */
const setView = function (view) {
  store.view = view;
};

/**
 * Reset the store's question number, correct, 
 * and score properties.
 */
const reset = function () {
  store.questionNumber = 0;
  store.correct = false;
  store.score = 0;
};

/**
 * Places an event listener on the "Start"
 * and "New Game" buttons of the introductory
 * and results pages.
 */
const handleStartButtonClick = function () {
  $('main').on('click', '.js-start-button', () => {
    reset();
    setView('question');
    render();
  });
};

const scoreQuestion = function (answer) {
  if(answer === store.questions[store.questionNumber].state) {
    store.correct = true;
    store.score++;
  } else {
    store.correct = false;
  }
};

const handleNextButtonClick = function () {
  $('main').on('click', '.js-next-button', event => {
    event.preventDefault();
    let answer = $('input[name="answer"]:checked').val();
    scoreQuestion(answer);
    setView('feedback');
    render();
  });
};

/**
 * Update store to render the results or 
 * the next question.
 */
const setViewAfterFeedbackPage = function () {
  if (store.questionNumber === store.questions.length - 1) {
    setView('results');
  } else {
    store.questionNumber++;
    setView('question');
  }
};

/**
 * Places an event listener on the continue
 * button of a feedback page.
 */
const handleContinueButtonClick = function () {
  $('main').on('click', '.js-continue-button', () => {
    setViewAfterFeedbackPage();
    render();
  });
};

/**
 * Callback for when page loads.
 */
const main = function () {
  handleStartButtonClick();
  handleNextButtonClick();
  handleContinueButtonClick();
  render();
};

$(main);
