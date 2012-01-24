var tdd = {};

tdd.buildModel = function() {
  var x = {};

  x.something = function() {
     return true;
  };  

  return x;
};

tdd.questionService = function() {
    var x = {};
    x.nextQuestion = function(onSuccess) {
        onSuccess({"question" : "What is the default question?", "answer" : "myanswer"});
//        $.get('ajax/question', function(data) {
//            onSuccess(data);
//        });
    };
    return x;
};

tdd.buildView = function() {
    var x = {};

    x.setQuestion = function(question) {
        $("#question").html(question);
    };

    x.showLoader = function() {
        $("#loading-section").show();
    };

    x.hideLoader = function() {
        $("#loading-section").hide();
    };

    x.showQuestionSection = function() {
        $("#question-section").show();
    };

    x.hideQuestionSection = function() {
        $("#question-section").hide();
    };

    x.showAnswerSection = function() {
        $("#answer-section").show();
    };

    x.hideAnswerSection = function() {
        $("#answer-section").hide();
        $("#ok").hide();
        $("#next-question").hide();
    };

    x.hideGiveUp = function() {
        $("#give-up").hide();
    };



    x.showGiveUp = function() {
        $("#give-up").show();
    };

    x.showNextQuestion = function() {
        $("#next-question").show();
    };

    x.showCorrect = function() {
        $("#ok").show();
    };

    x.setAnswer = function(answer) {
        $("#answer").html(answer);
    };

    x.bindToAnswerInput = function(listener) {
        $("#user-answer").keyup(listener);
    };

    x.bindToNext = function(handler) {
        $("#next-question").click(handler);
    };

    x.bindToGiveUp = function(handler) {
        $("#give-up").click(handler);
    };

    x.getAnswer = function() {
        return $("#answer").html();
    };

    x.getUserInput = function() {
        return $("#user-answer").val();
    };

    x.showUserInput = function() {
        $("#user-answer").show();
    };

    x.hideUserInput = function() {
        $("#user-answer").hide();
    };

    x.clearUserInput = function() {
        $("#user-answer").val("");
    };

    return x;
};

tdd.buildPresenter = function(questionService, view) {
    var x = {};

    x.displayQuestion = function() {
        view.showLoader();
        view.hideQuestionSection();
        view.hideAnswerSection();

        questionService.nextQuestion(function(questionAnswer) {
            var question = questionAnswer["question"];
            var answer = questionAnswer["answer"];
            view.setQuestion(question);
            view.hideLoader();
            view.showGiveUp();
            view.showUserInput();
            view.showQuestionSection();
            view.setAnswer(answer);
            view.clearUserInput();
        });
    };

    x.revealAnswer = function() {
        view.showAnswerSection();
        view.hideGiveUp();
        view.showNextQuestion();
        view.hideUserInput();
    };

    x.monitorUserInput = function() {
        var userInput = view.getUserInput();
        var answer = view.getAnswer();
        if (userInput == answer) {
            view.showCorrect();
            view.hideGiveUp();
            view.showNextQuestion();
        }
    };

    return x;
};


tdd.main = function() {
    var view = tdd.buildView();
    var questionService = tdd.questionService();
    var presenter = tdd.buildPresenter(questionService, view);
    presenter.displayQuestion();

    view.bindToAnswerInput(presenter.monitorUserInput);
    view.bindToNext(presenter.displayQuestion);
    view.bindToGiveUp(presenter.revealAnswer);
}();
