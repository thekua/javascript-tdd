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
        $.get('ajax/question', function(data) {
            onSuccess(data);
        });
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
        questionService.nextQuestion(function(questionAnswer) {
            var question = questionAnswer["question"];
            view.setQuestion(question);
        });
    };
    return x;
};
