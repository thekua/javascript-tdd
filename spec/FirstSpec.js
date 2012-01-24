describe("presenter", function() {
    it("should successfully update the view on return from the server", function() {
        // given
        var questionServer = tdd.questionService();
        spyOn(questionServer, "nextQuestion").andCallFake(function(onSuccess) {
            onSuccess({"question":"Capital of England?", "answer": "London"});
        });

        var view = tdd.buildView();
        spyOn(view, "setQuestion");
        spyOn(view, "showQuestionSection");
        spyOn(view, "showAnswerSection");
        spyOn(view, "hideLoader");

        var presenter = tdd.buildPresenter(questionServer, view);

        // when
        presenter.displayQuestion();

        // then
        expect(questionServer.nextQuestion).toHaveBeenCalled();
        expect(view.setQuestion).toHaveBeenCalledWith("Capital of England?");
        expect(view.showQuestionSection).toHaveBeenCalled();
        expect(view.showAnswerSection).toHaveBeenCalled();
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

        var presenter = tdd.buildPresenter(questionServer, view);

        // when
        presenter.displayQuestion();

        // expect
        expect(questionServer.nextQuestion).toHaveBeenCalled();
        expect(view.showLoader).toHaveBeenCalled();
        expect(view.hideQuestionSection).toHaveBeenCalled();
        expect(view.hideAnswerSection).toHaveBeenCalled();
    });

});
