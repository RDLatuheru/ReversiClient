"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FeedbackWidget = /*#__PURE__*/function () {
  function FeedbackWidget(elementId) {
    _classCallCheck(this, FeedbackWidget);

    this._elementId = elementId;
  }

  _createClass(FeedbackWidget, [{
    key: "elementId",
    get: function get() {
      return this._elementId;
    }
  }, {
    key: "show",
    value: function show(message, type) {
      var actual = $("#" + this.elementId); //document.getElementById(this.elementId);

      var success = $("#feedback-success"); //document.getElementById("feedback-success");

      var danger = $("#feedback-danger"); //document.getElementById("feedback-danger");

      if (actual.attr("id") === success.attr("id") && actual.css("display") === "none") {
        actual.css("display", "block");
        danger.css("display", "none");
        actual.children().first().text(message);
        console.log("hit");
      } else {
        this.hide();
        danger.css("display", "block");
      }

      if (type === "success") {
        actual.removeClass("alert-danger");
        actual.addClass("alert-success");
      } else {
        actual.addClass("alert-danger");
        actual.removeClass("alert-success");
      }

      this.log({
        message: message,
        type: type
      });
      console.log(localStorage.getItem("feedbackwidget"));
    }
  }, {
    key: "hide",
    value: function hide() {
      $("#" + this.elementId).css("display", "none");
    }
  }, {
    key: "log",
    value: function log(message) {
      var messagesJson = JSON.parse(localStorage.getItem("feedbackwidget"));
      var messagesArray = [];

      if (messagesJson === null) {
        messagesArray = [];
      }

      for (var m in messagesJson) {
        messagesArray.push(messagesJson[m]);
      }

      var count = messagesArray.length;

      if (count >= 10) {
        messagesArray.shift();
      }

      messagesArray.push(message);
      localStorage.setItem("feedbackwidget", JSON.stringify(messagesArray));
    }
  }, {
    key: "removeLog",
    value: function removeLog() {
      localStorage.removeItem("feedbackwidget");
    }
  }, {
    key: "history",
    value: function history() {
      var messages = [];
      var json = JSON.parse(localStorage.getItem("feedbackwidget"));
      console.log(json);
      var stringBuilder = "";
      var i = 0;

      for (var parseKey in json) {
        messages.push(json[parseKey]);
        stringBuilder += "type: " + messages[i].type + " - " + messages[i].message + "\n";
        i++;
      }

      return stringBuilder;
    }
  }]);

  return FeedbackWidget;
}();

$(document).ready(function () {
  console.log("ready!");
  var feedbackWidget = new FeedbackWidget("feedback-success");
  var button = $("#selector");
  button.on("click", function () {
    feedbackWidget.show("Yo!", "success");
    feedbackWidget.history();
  });
});

var Game = function (url) {
  /**
   * contains the api url
   * @type {{apiUrl: string}}
   */
  var configMap = {
    apiUrl: url
  };
  var stateMap = {
    gameState: null
  };

  var init = function init(callback) {
    console.log(configMap.apiUrl);

    _getCurrentGameState();

    callback();
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    setInterval(function () {
      stateMap.gameState = Game.Model.getGameState();
    }, 2000); //For testing purposes

    /*setTimeout(function (){
        clearInterval(interval);
    }, 10000)*/
  };

  return {
    init: init
  };
}('/api/spel');

function afterInit() {
  console.log('Game init voltooid');
}

Game.Data = function () {
  /**
   * Responsible for communicating with the Reversi server
   */
  var configMap = {
    apiKey: 'http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=6d89f197d2b20f70807f087de3c4012f',
    mock: [{
      url: 'api/Spel/Beurt',
      data: 0
    }]
  };
  var stateMap = {
    environment: "development"
  };

  function getMockData(url) {
    var mockData = configMap.mock.find(function (x) {
      return x.url === url;
    }).data;
    return new Promise(function (resolve, reject) {
      if (mockData !== null) {
        resolve(mockData);
      } else {
        reject(new Error("Mockdata niet gevonden!"));
      }
    });
  }

  var get = function get(url) {
    if (stateMap.environment === "development") {
      return getMockData('api/Spel/Beurt');
    }

    if (stateMap.environment === "production") {
      return $.get(url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    }
  };

  var init = function init(environment) {
    console.log("Data init");
    stateMap.environment = environment;
    if (environment !== 'production' || environment !== 'development') throw new Error("Environment niet gelijk aan 'production' of 'development'");

    if (environment === 'production') {//request aan server
    }

    if (environment === 'development') {
      return getMockData('api/Spel/Beurt');
    }
  };

  return {
    init: init,
    get: get
  };
}();

Game.Model = function () {
  /**
   * Responsible for (user) data validation
   */
  var configMap;

  var _getGameState = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var gameData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Game.Data.get('/api/Spel/Beurt/token').then(function (r) {
                gameData = r;
                console.log(gameData);
              })["catch"](function (e) {
                console.log(e.message);
              });

            case 2:
              if (!(gameData > 2 || gameData < 0)) {
                _context.next = 4;
                break;
              }

              throw new Error("gameData valt buiten de geldige waarde");

            case 4:
              if (!(gameData === 0)) {
                _context.next = 9;
                break;
              }

              console.log("geen specifieke waarde");
              return _context.abrupt("return", "geen specifieke waarde");

            case 9:
              if (!(gameData === 1)) {
                _context.next = 14;
                break;
              }

              console.log("wit aan zet");
              return _context.abrupt("return", "wit aan zet");

            case 14:
              if (!(gameData === 2)) {
                _context.next = 17;
                break;
              }

              console.log("zwart aan zet");
              return _context.abrupt("return", "zwart aan zet");

            case 17:
              console.log("end of _getGameState, returning null...");
              return _context.abrupt("return", null);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function _getGameState() {
      return _ref.apply(this, arguments);
    };
  }();

  var init = function init() {
    console.log("Model init");
  };

  return {
    init: init,
    getGameState: _getGameState
  }; //Get weather exercise

  /*const getWeather = function () {
      let url = 'http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=6d89f197d2b20f70807f087de3c4012f'
      Game.Data.get(url).then(function (data){
          return{
              data: data
          }
      }).then(function (result){
          let temp = result.data.main.temp.toString();
          if (temp === ""){
              throw new Error("Geen temperatuur aanwezig")
          }
          console.log(temp)
      }).catch(function (error){
          console.log(`Error: ${error.message}`)
      })
  }*/
}();

Game.Reversi = function () {
  var configMap;

  var init = function init() {
    console.log("test Reversi");
  };

  return {
    init: init
  };
}();