describe("test", function() {
    it("should be successful", function() {
        // given
        var questionServer = tdd.questionService();
        spyOn(questionServer, "nextQuestion").andReturn({"question":"Capital of England?", "answer": "London"});

        var view = tdd.buildView();
        spyOn(view, "setQuestion");

        var presenter = tdd.buildPresenter(questionServer, view);

        // when
        presenter.displayQuestion();

        // then
        expect(questionServer.nextQuestion).toHaveBeenCalled();
        expect(view.setQuestion).toHaveBeenCalledWith("Capital of England?");
    });
});
