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

    x.showCorrect = function() {
        $("#ok").show();
    };

    x.setHiddenAnswer = function(answer) {
        $("#hidden-answer").val(answer);
    };

    x.bindToAnswerInput = function(listener) {
        $("#user-answer").keyup(listener);
    };

    x.getHiddenAnswer = function() {
        return $("#hidden-answer").val();
    };

    x.getUserInput = function() {
        return $("#user-answer").val();
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
            view.showQuestionSection();
            view.setHiddenAnswer(answer);
        });
    };

    return x;
};

tdd.inputPresenter = function(view) {
    var x = {};

    x.monitor = function() {

        var userInput = view.getUserInput();
        var answer = view.getHiddenAnswer();
        if (userInput == answer) {
            view.showCorrect();
        }
    };

    return x;
};


tdd.main = function() {
    var view = tdd.buildView();
    var questionService = tdd.questionService();
    var presenter = tdd.buildPresenter(questionService, view);
    presenter.displayQuestion();

    var inputPresenter = tdd.inputPresenter(view);
    view.bindToAnswerInput(inputPresenter.monitor);
}();
