const express = require("express");
const app = express();
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const numberQuiz = require("./lib/number-quiz");
const { getNextQuestionNumber } = require("./lib/number-quiz");
const port = 8080;

app.use(sessions({
    secret: "TempSecret",
    resave: false,
    saveUninitialized: false,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var session;

app.set("view engine", "pug");

app.get("/", function(req, res){
    session = req.session;
    if(!session.answers){
        session.answers = [];        
    }
    var nextQuestionNumber = numberQuiz.getNextQuestionNumber(session.answers);    
    var score = numberQuiz.getScore(session.answers);
    if(!numberQuiz.isCompleted(session.answers)){
        res.render('index', { 
                                currentScore: score, 
                                sequence: numberQuiz.getQuestion(nextQuestionNumber),
                                questionNumber: nextQuestionNumber,
                            });
    } else {
        // Reset the answers and so that the quiz can be taken again
        var totalScoreText = numberQuiz.getTotalScoreText(session.answers);
        session.answers = [];
        res.render('completed', { 
            currentScore: score, 
            totalScoreText: totalScoreText,
        });
    }
});

app.post("/", function(req, res){
    session = req.session;
    if(req.body["question-no"] && req.body["answer"]){
        session.answers[req.body["question-no"]] = req.body["answer"];
    }
    res.redirect("/");
});

app.listen(port, function () {
    console.log(`Number Quiz Lab app listening on port ${port}!`);
});