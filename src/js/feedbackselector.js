$(document).ready(function (){
    console.log("ready!");

    const feedbackWidget = new FeedbackWidget("feedback-success");

    const button = $("#selector");
    button.on("click", function (){
        feedbackWidget.show("Yo!", "success");
        feedbackWidget.history()
    })
});