var tdd = {};

tdd.buildView = function () {
    var x = {};

    x.setJavascriptExecutingIndicator = function (text) {
        $("#javascript-working").html(text);
    };

    return x;
};

tdd.buildPresenter = function (view) {
    var x = {};

    x.showJavascriptWorking = function () {
        view.setJavascriptExecutingIndicator("Hey, it looks like JS is working!!!");
    };

    return x;
};

(function () {
    var presenter = tdd.buildPresenter(tdd.buildView());
    presenter.showJavascriptWorking();
}());
