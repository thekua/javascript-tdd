describe("presenter", function() {
    it("should successfully update the view on return from the server", function() {
        // given
        var questionServer = tdd.questionService();
        spyOn(questionServer, "nextQuestion").andCallFake(function(onSuccess) {
            onSuccess({"question":"Capital of England?", "answer": "London"});
        });

        var view = tdd.buildView();
        spyOn(view, "showLoader");
        spyOn(view, "hideQuestionSection");
        spyOn(view, "hideAnswerSection");
        spyOn(view, "setQuestion");
        spyOn(view, "setHiddenAnswer");
        spyOn(view, "showQuestionSection");
        spyOn(view, "showAnswerSection");
        spyOn(view, "hideLoader");

        var presenter = tdd.buildPresenter(questionServer, view);

        // when
        presenter.displayQuestion();

        // then
        expect(questionServer.nextQuestion).toHaveBeenCalled();
        expect(view.setQuestion).toHaveBeenCalledWith("Capital of England?");
        expect(view.setHiddenAnswer).toHaveBeenCalledWith("London");
        expect(view.showQuestionSection).toHaveBeenCalled();
        expect(view.showAnswerSection).not.toHaveBeenCalled();
        expect(view.hideLoader).toHaveBeenCalled();
    });

    it("should show a loader before calling next question, hiding any question and answers", function() {
        // given
        var questionServer = tdd.questionService();
        spyOn(questionServer, "nextQuestion");

        var view = tdd.buildView();
        spyOn(view, "showLoader");
        spyOn(view, "hideQuestionSection");
        spyOn(view, "hideAnswerSection");
        spyOn(view, "showAnswerSection");
        spyOn(view, "showQuestionSection");

        var presenter = tdd.buildPresenter(questionServer, view);

        // when
        presenter.displayQuestion();

        // expect
        expect(questionServer.nextQuestion).toHaveBeenCalled();
        expect(view.showLoader).toHaveBeenCalled();
        expect(view.hideQuestionSection).toHaveBeenCalled();
        expect(view.hideAnswerSection).toHaveBeenCalled();

        expect(view.showAnswerSection).not.toHaveBeenCalled();
        expect(view.showQuestionSection).not.toHaveBeenCalled();
    });
});

describe("monitorInput", function() {
    it("should not display the correct answer if the answers do not match", function() {
        // given
        var view = tdd.buildView();
        var inputPresenter = tdd.inputPresenter(view);
        spyOn(view, "getHiddenAnswer").andReturn("correctAnswer");
        spyOn(view, "getUserInput").andReturn("differentAnswer");
        spyOn(view, "showCorrect");

        // when
        inputPresenter.monitor();

        // then
        expect(view.showCorrect).not.toHaveBeenCalled();
    });


    it ("should display correct answer, allowing progress on successful answer", function() {
        // given
        var view = tdd.buildView();
        var inputPresenter = tdd.inputPresenter(view);
        spyOn(view, "getHiddenAnswer").andReturn("correctAnswer");
        spyOn(view, "getUserInput").andReturn("correctAnswer");
        spyOn(view, "showCorrect");

        // when
        inputPresenter.monitor();

        // then
        expect(view.showCorrect).toHaveBeenCalled();

    });
});

