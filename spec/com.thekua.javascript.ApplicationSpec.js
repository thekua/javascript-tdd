describe("test", function () {
    it("should be successful", function () {
        // given
        var view = tdd.buildView();
        spyOn(view, "setJavascriptExecutingIndicator");
        var presenter = tdd.buildPresenter(view);

        // when
        presenter.showJavascriptWorking();

        // then
        expect(view.setJavascriptExecutingIndicator).toHaveBeenCalledWith("Hey, it looks like JS is working!!!");
    });
});
