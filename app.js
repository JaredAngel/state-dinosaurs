/* eslint-disable strict */
/**


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

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

store = {
  questions: [{ // fill in questions
    id: 0,
    image: “./dinosaur.jpg”,
    dinosaur: “Triceratops”,
    state: “Texas”,
    options: [“California”, “Colorado”, “Texas”, “Nevada”]
    }],
  currentQuestionNumber: 0,
  correct: false;
  currentScore: 0,
  view: "intro" // lets render know which view to use
}

// v -- also need helper functions
introView() // start game btn, instructions
questionView() // questions 1-5 --> if last question -> submit button not next button
feedbackView() // question result at each submission
resultsView() // overall results and new game btn

render
  if view === "intro" --> introView()
  if view === "question" --> questionView()
  if view === "feedback" --> feedBackView()
  if view === "result" --> resultsView()

handleStartButtonClick() // intro page start button; 
                       // also handles new game button
      -calls reset()--> changeView("question")
handleNextButtonClick() // next question button;
                      // also handles submit button
      -calls: scoreQuestion(), changeView("feedback")
handleFeedbackContinueButtonClick() // feedback continue button
      -calls: incrementQuestion(), changeView("question"), changeView("results")


function main() {
  
}
$(main);
