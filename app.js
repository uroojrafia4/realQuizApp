// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence,GoogleAuthProvider , signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Initialize Firestore



// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZ_zMb0Yk4COomHsdUsO4aJ-d2TO9bwIM",
    authDomain: "quiz-2df39.firebaseapp.com",
    projectId: "quiz-2df39",
    storageBucket: "quiz-2df39.firebasestorage.app",
    messagingSenderId: "574978813161",
    appId: "1:574978813161:web:2b17edc71171385f6ed478",
    measurementId: "G-2F4871HD76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app);



const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTransfer Markup Language",
            "HyperText Markdown Language",
        ],
        answer: 0,
    },
    {
        question: "Which tag is used for creating hyperlinks in HTML?",
        options: ["link", "a", "href", "hyperlink"],
        answer: 1,
    },
    {
        question: "What is the purpose of the <title> tag in HTML?",
        options: [
            "To define the heading of the webpage",
            "To display the webpage title on the browser tab",
            "To set the font of the webpage",
            "To create clickable buttons",
        ],
        answer: 1,
    },
    {
        question: "Which tag is used to create an unordered list?",
        options: ["ul", "ol", "li", "list"],
        answer: 0,
    },
    {
        question: "Which attribute is used to provide alternative text for an image?",
        options: ["title", "alt", "src", "href"],
        answer: 1,
    },
];



const questions2 = [

    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Computer Style Sheets",
            "Creative Style Sheets",
        ],
        answer: 0,
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "background-color", "bg-color", "background"],
        answer: 1,
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "text-color", "color", "font-style"],
        answer: 2,
    },
    {
        question: "How do you add comments in CSS?",
        options: [
            "// This is a comment",
            "( This is a comment ) ",
            "/* This is a comment */",
            "# This is a comment",
        ],
        answer: 2,
    },
    {
        question: "Which CSS property is used to control the spacing between lines of text?",
        options: ["letter-spacing", "line-height", "text-spacing", "line-spacing"],
        answer: 1,
    }

];


const questions3 = [
    {
        question: "Which type of JavaScript language is used?",
        options: ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
        answer: 1,
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "'<!-- -->'"],
        answer: 0,
    },
    {
        question: "What is the correct syntax to declare a variable in JavaScript?",
        options: ["'var myVar;'", "'variable myVar;'", "'v myVar;'", "'let myVar:'"],
        answer: 0,
    },
    {
        question: "Which method is used to convert a string to an integer?",
        options: ["'parseInt()'", "'toString()'", "'parseFloat()'", "'Number()'"],
        answer: 0,
    },
    {
        question: "Which function is used to display messages in the browser console?",
        options: ["'print()'", "'log()'", "'console.log()'", "'write()'"],
        answer: 2,
    },
];

let name1 = document.getElementById("name");
let password = document.getElementById("password");
let email = document.getElementById("email");
let rollNo = document.getElementById("rollNo");
let loginemail = document.getElementById("login-email");
let loginpassword = document.getElementById("login-password");

let currentQuestionIndex = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const prevButton = document.getElementById("prev");
const prevButton2 = document.getElementById("prev2");
const prevButton3 = document.getElementById("prev3");
const nextButton = document.getElementById("next");
const nextButton2 = document.getElementById("next2");
const nextButton3 = document.getElementById("next3");

const quizButtons = document.querySelectorAll('.quiz-btn');
quizButtons.forEach((button) => {
    button.addEventListener('click', () => {
        quizButtons.forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});
const htmlQuiz = document.getElementById("htmlQuiz");
const cssQuiz = document.getElementById("cssQuiz");
const jsQuiz = document.getElementById("jsQuiz");


document.getElementById("submit").addEventListener("click", () => {

    if (
        email.value === "" ||
        password.value === "" ||
        name1.value === "" ||
        rollNo.value === ""
    ) {

        Swal.fire({
            icon: "error",
            title: "One or more field(s) is empty!",
            text: "Please fill all the fields",
        });
        return; // Prevent further execution
    }
    if (rollNo.value.length !== 4) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "The Roll-no must be exactly 4 characters!",
        });
        return; // Prevent further execution
    }

    // If all checks pass, proceed with registration
    registerUser(email.value, password.value);
});

function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User registered successfully
            const user = userCredential.user;
            console.log("User created:", user);
            Swal.fire({
                title: "You've successfully Registered",
                icon: "success",
            }).then(() => { showWelcome() });
        })
        .catch((error) => {
            // Handle Errors here
            console.error("Error during sign-up:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        });
}
document.getElementById('log').addEventListener('click', () => { showlogin() })


function showlogin() {
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("login").style.display = "block";

}
document.getElementById("login-button").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form reload

    if (loginemail.value === "" || loginpassword.value === "") {
        Swal.fire({
            icon: "error",
            title: "One or more field(s) is empty!",
            text: "Please fill all the fields",
        });
        return;
    }

    loginUser(loginemail.value, loginpassword.value);
});

function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            Swal.fire({
                title: "Login Successful",
                icon: "success",
            }).then(() => {
                showWelcome(); // Ensure this doesn't redirect to registration
            });
        })
        .catch((error) => {
            if (error.code === "auth/too-many-requests") {
                Swal.fire({
                    icon: "error",
                    title: "Account Locked",
                    text: "Too many login attempts. Please try again later.",
                });}
           else if(error.code === 'auth/network-request-failed'){
                Swal.fire({
                    icon: "error",
                    title: "Network error",
                    text: "Please connect to a stable Internet Connection before Proceeding!",
                });
              }
             else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                });
            }
        });

}
document.getElementById('logout-button').addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut()
        .then(() => {
            console.log("User logged out");
            Swal.fire({
                title: "Logout Successful",
                icon: "success",
            }).then(() => {
                showlogin();
                document.getElementById("welcome").style.display = 'none';
            });
        })
        .catch((error) => console.error("Error during logout:", error));
})


window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        document.getElementById('loading').style.display = 'none';
        // document.getElementById('registration-form').style.display = 'block';
        if (user) {
            // User is signed in
            console.log("User is logged in:", user);
            showWelcome(); // Navigate to welcome page
        } else {
            // User is logged out

            console.log("User is logged out");
            showlogin();
            // Navigate to login page
        }
    })
};
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistence set to local.");
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });

    // Google Sign-In
const googleSigninButton = document.getElementById("google-signin-btn");

googleSigninButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Google user signed in:", user);
        Swal.fire({
            title: "Login Successful",
            icon: "success",
        }).then(() => {
            showWelcome();  // Navigate to welcome page
        });
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        Swal.fire({
            icon: "error",
            title: "Google Sign-In Failed",
            text: error.message,
        });
    }
});


    document.getElementById("start-quiz").addEventListener('click', () => {
        if (!selected){
            Swal.fire({
                icon: "error",
                title: "No Quiz is Selected",
                text: "Please select a quiz to proceed!",
            });
            return;
        }
    })



function showWelcome() {
    document.getElementById("login").style.display = "none";
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("nam").innerHTML = name1.value;

}
let selected = false;
htmlQuiz.addEventListener('click', () => {
   selected = true;
    document.getElementById("start-quiz").addEventListener('click', () => {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion();

    })
})


cssQuiz.addEventListener('click', () => {
    selected = true;
    document.getElementById("start-quiz").addEventListener('click', () => {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion2();

    })
})

jsQuiz.addEventListener('click', () => {
    selected = true;
    document.getElementById("start-quiz").addEventListener('click', () => {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion3();

    })
})

// Function to load a question
function loadQuestion() {
    nextButton.style.display = "block";
    prevButton.style.display = "block";
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous options
    optionsElement.innerHTML = "";

    // Render options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "quiz-option"; // Add class
        optionElement.innerHTML = `
          <label for="option${index}">
            <input type="radio" id="option${index}" name="option" value="${index}" 
            ${selectedAnswers[currentQuestionIndex] === index ? "checked" : ""} style="margin-right: 8px;">
            ${option}
          </label>
        `;
        optionsElement.appendChild(optionElement);
    });
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}


function loadQuestion2() {
    nextButton2.style.display = "block";
    prevButton2.style.display = "block";
    const currentQuestion = questions2[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous options
    optionsElement.innerHTML = "";

    // Render options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "quiz-option"; // Add class
        optionElement.innerHTML = `
          <label for="option${index}">
            <input type="radio" id="option${index}" name="option" value="${index}" 
            ${selectedAnswers[currentQuestionIndex] === index ? "checked" : ""} style="margin-right: 8px;">
            ${option}
          </label>
        `;
        optionsElement.appendChild(optionElement);
    });

    prevButton2.disabled = currentQuestionIndex === 0;
    nextButton2.textContent =
        currentQuestionIndex === questions2.length - 1 ? "Submit" : "Next";
}


function loadQuestion3() {
    nextButton3.style.display = "block";
    prevButton3.style.display = "block";
    const currentQuestion = questions3[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous options
    optionsElement.innerHTML = "";

    // Render options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "quiz-option"; // Add class
        optionElement.innerHTML = `
          <label for="option${index}">
            <input type="radio" id="option${index}" name="option" value="${index}" 
            ${selectedAnswers[currentQuestionIndex] === index ? "checked" : ""} style="margin-right: 8px;">
            ${option}
          </label>
        `;
        optionsElement.appendChild(optionElement);
    });

    prevButton3.disabled = currentQuestionIndex === 0;
    nextButton3.textContent =
        currentQuestionIndex === questions3.length - 1 ? "Submit" : "Next";
}

// Event listener for next button
nextButton.addEventListener("click", () => {

    const selectedOption = document.querySelector('input[name="option"]:checked');

    // Check if an option is selected
    if (!selectedOption) {
        Swal.fire({
            icon: "error",
            title: "No option is selected",
            text: "Please select an answer before proceeding",
        });
        return; // Stop further execution if no option is selected
    }

    // Save the selected answer if one is chosen
    selectedAnswers[currentQuestionIndex] = parseInt(selectedOption.value);

    // Check if this is the last question
    if (nextButton.textContent === "Submit") {
        calculateResult();
        return;
    }

    // Move to the next question if there are more questions left
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
})


nextButton2.addEventListener("click", () => {
    nextButton2.style.display = "block";
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        Swal.fire({
            icon: "error",
            title: "No option is selected",
            text: "Please select an answer before proceeding",
        });
        return; // Stop further execution if no option is selected
    }

    if (selectedOption) {
        selectedAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }

    if (nextButton2.textContent === "Submit") {
        calculateResult2();
        return;
    }

    if (currentQuestionIndex < questions2.length - 1) {
        currentQuestionIndex++;
        loadQuestion2();
    }
});

nextButton3.addEventListener("click", () => {
    nextButton3.style.display = "block";
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        Swal.fire({
            icon: "error",
            title: "No option is selected",
            text: "Please select an answer before proceeding",
        });
        return; // Stop further execution if no option is selected
    }

    if (selectedOption) {
        selectedAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }

    if (nextButton3.textContent === "Submit") {
        calculateResult3();
        return;
    }

    if (currentQuestionIndex < questions3.length - 1) {
        currentQuestionIndex++;
        loadQuestion3();
    }
});

// Event listener for previous button
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

prevButton2.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion2();
    }
});

prevButton3.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion3();
    }
});
// Function to calculate and display the result
async function calculateResult() {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === questions[index].answer) {
            score++;
        }
    });

    // Calculate percentage
    let percentage = (score / questions.length) * 100;

    // Determine the result message based on passing percentage
    let resultMessage = '';
    let resultColor = '';
    if (percentage >= 65) {
        resultMessage = `Congratulations! You passed with a score of ${score} out of ${questions.length} (${percentage.toFixed(2)}%)`;
        resultColor = 'green';
    } else {
        resultMessage = `Sorry, you failed with a score of ${score} out of ${questions.length} (${percentage.toFixed(2)}%)`;
        resultColor = 'red';
    }
    try {
        const user = auth.currentUser; // Ensure user is logged in
        if (!user) {
            throw new Error("User is not logged in");
        }

        await addDoc(collection(db, "results"), {
            userId: user.uid,
            score: score,
            percentage: percentage,
            date: Timestamp.now(),
            quiz : 'HTML',
        });
        console.log("Result saved successfully!");
        Swal.fire({
            icon: "success",
            title: "Result Saved!",
            text: "Your result has been successfully stored."})
    } catch (error) {
        console.error("Error saving result:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not save your result. Please try again "+error
        });
    }

    document.getElementById("quiz-container").innerHTML = `
    <div id="result">
    <h2>Quiz Completed</h2>
    <p style="color: ${resultColor};">${resultMessage}</p>
    <div style="margin-top: 20px;">
        <button id="logout-btn" style="padding: 10px 20px; margin: 5px; background-color: rgba(255, 255, 255, 0); color: #120035;border:solid; border-color: #120035 ; border-radius: 5px; cursor: pointer;">Logout</button>
        <button id="another-quiz-btn" style="padding: 10px 20px; margin: 5px; background-color: #31136b; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Take Another Quiz</button>
    </div>
    </div>
  `;


    // Add event listeners for buttons
    document.getElementById("logout-btn").addEventListener("click", () => {
        showlogin(); // Navigate to login page
        document.getElementById('result').style.display = 'none';

    });

    document.getElementById("another-quiz-btn").addEventListener("click", () => {
        location.reload();
    });
}


async function calculateResult2() {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === questions2[index].answer) {
            score++;
        }
    });

    // Calculate percentage
    let percentage = (score / questions2.length) * 100;

    // Determine the result message based on passing percentage
    let resultMessage = '';
    let resultColor = '';
    if (percentage >= 65) {
        resultMessage = `Congratulations! You passed with a score of ${score} out of ${questions2.length} (${percentage.toFixed(2)}%)`;
        resultColor = 'green';
    } else {
        resultMessage = `Sorry, you failed with a score of ${score} out of ${questions2.length} (${percentage.toFixed(2)}%)`;
        resultColor = 'red';
    }
    
    // Save result to Firestore
     // Save result to Firestore
     try {
        const user = auth.currentUser; // Ensure user is logged in
        if (!user) {
            throw new Error("User is not logged in");
        }

        await addDoc(collection(db, "results"), {
            userId: user.uid,
            score: score,
            percentage: percentage,
            date: Timestamp.now(),
             quiz : 'CSS',
        });
        console.log("Result saved successfully!");
        Swal.fire({
            icon: "success",
            title: "Result Saved!",
            text: "Your result has been successfully stored."})
    } catch (error) {
        console.error("Error saving result:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not save your result. Please try again."
        });
    }
    // Display the result
    document.getElementById("quiz-container").innerHTML = `
    <div id="result2">
    <h2>Quiz Completed</h2>
    <p style="color: ${resultColor};">${resultMessage}</p>
    <div style="margin-top: 20px;">
        <button id="logout-btn" style="padding: 10px 20px; margin: 5px; background-color: rgba(255, 255, 255, 0); color: #120035;border:solid; border-color: #120035 ; border-radius: 5px; cursor: pointer;">Logout</button>
        <button id="another-quiz-btn" style="padding: 10px 20px; margin: 5px; background-color: #31136b; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Take Another Quiz</button>
    </div>
    </div>
  `;


    // Add event listeners for buttons
    document.getElementById("logout-btn").addEventListener("click", () => {
        showlogin(); // Navigate to login page
        document.getElementById('result2').style.display = 'none';

    });

    document.getElementById("another-quiz-btn").addEventListener("click", () => {
        location.reload();
    });
}



async function calculateResult3() {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === questions3[index].answer) {
            score++;
        }
    });

    // Calculate percentage
    let percentage = (score / questions3.length) * 100;

    // Determine the result message
    let resultMessage = "";
    let resultColor = "";
    if (percentage >= 65) {
        resultMessage = `Congratulations! You passed with a score of ${score} out of ${questions3.length} (${percentage.toFixed(2)}%)`;
        resultColor = "green";
    } else {
        resultMessage = `Sorry, you failed with a score of ${score} out of ${questions3.length} (${percentage.toFixed(2)}%)`;
        resultColor = "red";
    }

    // Save result to Firestore
    try {
        const user = auth.currentUser; // Ensure user is logged in
        if (!user) {
            throw new Error("User is not logged in");
        }

        await addDoc(collection(db, "results"), {
            userId: user.uid,
            score: score,
            percentage: percentage,
            date: Timestamp.now(),
            quiz : JavaScript,
            // quizName : 'javaScript',
        });
        console.log("Result saved successfully!");
        Swal.fire({
            icon: "success",
            title: "Result Saved!",
            text: "Your result has been successfully stored."})
    } catch (error) {
        console.error("Error saving result:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Could not save your result. Please try again."
        });
    }


    // Display the result
    document.getElementById("quiz-container").innerHTML = `
        <div id="result3">
        <h2>Quiz Completed</h2>
        <p style="color: ${resultColor};">${resultMessage}</p>
        <div style="margin-top: 20px;">
            <button id="logout-btn" style="padding: 10px 20px; margin: 5px; background-color: rgba(255, 255, 255, 0); color: #120035;border:solid; border-color: #120035 ; border-radius: 5px; cursor: pointer;">Logout</button>
            <button id="another-quiz-btn" style="padding: 10px 20px; margin: 5px; background-color: #31136b; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Take Another Quiz</button>
        </div>
        </div>
      `;

    // Add event listeners for buttons
    document.getElementById("logout-btn").addEventListener("click", () => {
        showlogin(); // Navigate to login page
        document.getElementById('result3').style.display = 'none';
    });

    document.getElementById("another-quiz-btn").addEventListener("click", () => {
        location.reload(); // Refresh the page
    });
}

async function fetchUserResults() {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User is not logged in");
        }

        const resultsRef = collection(db, "results");
        const q = query(resultsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        // Create HTML to display the results
        let resultsHTML = "<h2>Your Quiz Results</h2><ul>";
        // if (querySnapshot.empty) {
        //     // No results found for the user
        //     resultsHTML += `
        //         <p>No results found. Please take a quiz to see results.</p>
        //     `};
            
        querySnapshot.forEach((doc) => {
            const result = doc.data();
            const formattedDate = result.date 
                ? (result.date.toDate ? result.date.toDate() : new Date(result.date)).toLocaleDateString()
                : "Unknown Date";
            resultsHTML += `
                <li style="list-style-type: none; padding: 0; max-width: 600px; margin: auto; font-family: Arial, sans-serif;">

                 <strong>Quiz:</strong> ${result.quiz}<br>
                    <strong>Date:</strong> ${formattedDate}<br>
                    <strong>Score:</strong> ${result.score}<br>
                    <strong>Percentage:</strong> ${result.percentage.toFixed(2)}%<br>
                </li><hr>`;
        });
        resultsHTML += "</ul>";
        resultsHTML += "<button id='back'>Back to Home</button>";
       

        document.getElementById("welcome").innerHTML = resultsHTML;
        document.getElementById("back").addEventListener("click", () => {
            location.reload(); 
        });
    } catch (error) {
        console.error("Error fetching results:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch results. Please try again."
        });
    }
}

// Attach the event listener to the button
document.getElementById("read").addEventListener("click", fetchUserResults);





