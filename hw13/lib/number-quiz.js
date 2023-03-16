module.exports = { 
    getQuestions : function() {
        return ["3, 1, 4, 1, 5",
                "1, 1, 2, 3, 5",
                "1, 4, 9, 16, 25",
                "2, 3, 5, 7, 11",
                "1, 2, 4, 8, 16",
            ];
    },
    getAnswers : function() {
        return [9,8,36,13,32];
    },
    getQuestion : function(questionNumber){
        return this.getQuestions()[questionNumber];
    },
    getAnswer : function(questionNumber){
        return this.getAnswers()[questionNumber];
    },
    isCorrect : function(questionNumber, answer){
        return this.getAnswer(questionNumber) === answer;
    },
    getScore : function(answers){
        var score = 0;
        for(var i in answers){
            if(answers[i] == this.getAnswer(i)) {
                score++;
            }
        }
        return score;
    },
    getNextQuestionNumber : function(answers){
        if(answers == null || answers.length == 0){
            return 0;
        }
        for(var i=0; i<this.getQuestions().length; i++){
            if(!answers[i]) {
                return i;
            }
        }
    },
    getTotalScoreText: function(answers){
        var numberOfQuestions = this.getQuestions().length;
        var score = this.getScore(answers);
        return score + " out of " + numberOfQuestions;
    },
    isCompleted: function(answers){
        var numberOfQuestions = this.getQuestions().length;
        return numberOfQuestions === answers.length;
    }
};