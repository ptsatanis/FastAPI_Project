// =========================================================
// QUESTIONS
// =========================================================

const questions = [


{
    column: "ENVSAT",
    text: "Are you satisfied with your living conditions?"
},

{
    column: "POSSAT",
    text: "Are you satisfied with your working conditions?"
},

{
    column: "FINSTR",
    text: "Are you experiencing financial struggles?"
},

{
    column: "DEBT",
    text: "Are you in debt?"
},

{
    column: "EATDIS",
    text: "Are you suffering from any eating disorder?"
},

{
    column: "INSOM",
    text: "Are you experiencing insomnia?"
},

{
    column: "ANXI",
    text: "Have you recently felt anxiety about anything?"
},

{
    column: "DEPRI",
    text: "Have you recently experienced feelings of deprivation?"
},

{
    column: "ABUSED",
    text: "Have you been abused?"
},

{
    column: "CHEAT",
    text: "Have you been cheated on?"
},

{
    column: "THREAT",
    text: "Have you experienced a threatening situation recently?"
},

{
    column: "SUICIDE",
    text: "Have you experienced suicidal ideations recently?"
},

{
    column: "INFER",
    text: "Have you felt inferior to other people?"
},

{
    column: "CONFLICT",
    text: "Have you been in conflict with your friends or family?"
},

{
    column: "LOST",
    text: "Have you recently lost a family member or a close friend?"
}


];

// =========================================================
// STATE
// =========================================================

let currentQuestion = 0;

let answers = {};

// =========================================================
// DOM ELEMENTS
// =========================================================

const questionElement = document.getElementById("question");

const questionNumberElement = document.getElementById("questionNumber");

const percentageElement = document.getElementById("percentage");

const progressElement = document.getElementById("progress");

const questionnaireElement = document.getElementById("questionnaire");

const resultElement = document.getElementById("result");

const loadingElement = document.getElementById("loading");

const predictionElement = document.getElementById("prediction");

const probabilityElement = document.getElementById("probability");

const yesButton = document.getElementById("yesButton");

const noButton = document.getElementById("noButton");

const restartButton = document.getElementById("restartButton");

// =========================================================
// DISPLAY QUESTION
// =========================================================

function displayQuestion() {


    const q = questions[currentQuestion];

    questionElement.textContent = q.text;


    const number = currentQuestion + 1;

    const total = questions.length;


    const percentage = Math.round( number / total * 100);


    questionNumberElement.textContent = `Question ${number} of ${total}`;


    percentageElement.textContent = `${percentage}%`;


    progressElement.style.width = `${percentage}%`;

}

// =========================================================
// USER ANSWERS QUESTION
// =========================================================

function answerQuestion(answer) {


    const q = questions[currentQuestion];


    // Save answer

    answers[q.column] = answer;


    console.log("Saved answer:",q.column,"=",answer);


    // Move to next question

    currentQuestion++;


    if (currentQuestion <questions.length) {

        displayQuestion();

    }

    else {

        submitAnswers();

    }


}

// =========================================================
// SUBMIT ALL ANSWERS
// =========================================================

async function submitAnswers() {


    console.log( "================================");

    console.log("ALL ANSWERS:");

    console.log(answers);


    loadingElement.style.display = "block";


    // Disable buttons while processing

    yesButton.disabled = true;
    noButton.disabled = true;


    try {

        const response =
            await fetch(
                "/predict",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            answers
                        )

                }
            );


        if (!response.ok) {

            const error = await response.json();

            throw new Error(
                JSON.stringify(error)
            );

        }


        const result = await response.json();


        console.log("MODEL RESPONSE:");

        console.log(result);


        displayResult(result);

    }

    catch (error) {

        console.error("Prediction error:", error);


        alert("There was an error processing your answers.");

    }

    finally {

        loadingElement.style.display = "none";

        yesButton.disabled = false;
        noButton.disabled = false;

    }


}

// =========================================================
// DISPLAY MODEL RESULT
// =========================================================

function displayResult(result) {


    console.log("DISPLAYING RESULT:",result);


    // Check that the backend returned
    // the expected values

    if (result.prediction === undefined || result.probability === undefined) {

        console.error("Unexpected response from server:", result);


        predictionElement.textContent = "Prediction unavailable";

        probabilityElement.textContent = "Probability unavailable";

        return;

    }


    const prediction = Number(result.prediction);

    const probability = Number(result.probability);


    if ( Number.isNaN(prediction) || Number.isNaN(probability)) {

        console.error("Invalid prediction values:", result);


        predictionElement.textContent = "Prediction unavailable";

        probabilityElement.textContent = "Probability unavailable";

        return;

    }


    // Hide questionnaire

    questionnaireElement.style.display = "none";


    // Show result

    resultElement.style.display = "block";


    // Convert 0/1 into readable result

    if (prediction === 1) {

        predictionElement.textContent = "Prediction: Positive";

    }

    else {

        predictionElement.textContent = "Prediction: Negative";

    }


    // Display probability

    probabilityElement.textContent = `Model probability: ${(probability * 100).toFixed(2)}%`;


}

// =========================================================
// RESTART
// =========================================================

function restart() {


    currentQuestion = 0;

    answers = {};


    questionnaireElement.style.display = "block";


    resultElement.style.display = "none";


    displayQuestion();


}

// =========================================================
// EVENT LISTENERS
// =========================================================

yesButton.addEventListener("click", () => answerQuestion("Yes"));

noButton.addEventListener("click",() => answerQuestion("No"));

restartButton.addEventListener("click",restart);

// =========================================================
// START
// =========================================================

displayQuestion();
