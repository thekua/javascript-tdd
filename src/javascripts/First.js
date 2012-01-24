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
    x.nextQuestion = function() {

    };
    return x;
};

tdd.buildView = function() {
    var x = {};
    x.setQuestion = function() {

    };
    return x;
};

tdd.buildPresenter = function(questionService, view) {
    var x = {};
    x.displayQuestion = function() {
        var questionAnswer = questionService.nextQuestion();
        view.setQuestion(questionAnswer["question"]);
    };
    return x;
};
