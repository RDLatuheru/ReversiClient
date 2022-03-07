class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId(){
        return this._elementId;
    }

    show(message, type){
        var actual = $("#"+this.elementId) //document.getElementById(this.elementId);
        let success = $("#feedback-success") //document.getElementById("feedback-success");
        let danger = $("#feedback-danger") //document.getElementById("feedback-danger");


        if (actual.attr("id") === success.attr("id") && actual.css("display") === "none") {
            actual.css("display", "block");
            danger.css("display", "none");
            actual.children().first().text(message)
            console.log("hit")
        }else{
            this.hide();
            danger.css("display", "block");
        }

        if (type === "success"){
            actual.removeClass("alert-danger")
            actual.addClass("alert-success")
        }else{
            actual.addClass("alert-danger")
            actual.removeClass("alert-success")
        }

        this.log({message : message, type : type})
        console.log(localStorage.getItem("feedbackwidget"))
    }

    hide(){
        $("#"+this.elementId).css("display", "none");
    }

    log(message){
        let messagesJson = JSON.parse(localStorage.getItem("feedbackwidget"))
        let messagesArray = []

        if (messagesJson === null) {
            messagesArray = []
        }

        for (let m in messagesJson){
            messagesArray.push(messagesJson[m])
        }

        let count = messagesArray.length
        if (count >= 10){
            messagesArray.shift()
        }

        messagesArray.push(message)
        localStorage.setItem("feedbackwidget", JSON.stringify(messagesArray))
    }

    removeLog(){
        localStorage.removeItem("feedbackwidget")
    }

    history(){
        let messages = []
        let json = (JSON.parse(localStorage.getItem("feedbackwidget")));
        console.log(json)
        let stringBuilder = "";

        let i = 0;
        for (const parseKey in json) {
            messages.push(json[parseKey])
            stringBuilder += "type: "+messages[i].type+" - "+messages[i].message+"\n"
            i++
        }

        return stringBuilder;
    }
}
