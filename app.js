'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var genCards = function genCards() {
  if (!localStorage.getItem("storedState")) {
    return [];
  } else return JSON.parse(localStorage.getItem("storedState"));
};

var genButtons = function genButtons() {
  if (!localStorage.getItem("storedState")) {
    return [];
  } else {
    var cardsList = JSON.parse(localStorage.getItem("storedState"));
    var buttonSet = new Set();
    cardsList.forEach(function (card) {
      buttonSet.add(card.target);
    });
    console.log(Array.from(buttonSet));
    return Array.from(buttonSet);
  }
};

var genDifficulties = function genDifficulties() {
  if (!localStorage.getItem("storedState")) {
    return [];
  } else {
    var cardsList = JSON.parse(localStorage.getItem("storedState"));
    var difficultySet = new Set();
    cardsList.forEach(function (card) {
      difficultySet.add(card.difficulty);
    });
    console.log(Array.from(difficultySet));
    return Array.from(difficultySet);
  }
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.showSubmit = function (id) {
      _this.setState(function (prevState) {
        var newCardList = [].concat(_toConsumableArray(prevState.cards));
        newCardList[id].hidden = !newCardList[id].hidden;
        return { cards: newCardList };
      });
    };

    _this.filterTarget = function (target) {
      _this.setState(function (prevState) {
        console.log('localStorage', JSON.parse(localStorage.getItem("storedState")));
        var storedCardList = JSON.parse(localStorage.getItem("storedState"));
        var newCardList = storedCardList.filter(function (card) {
          return card.target === target;
        });
        return { cards: newCardList };
      });
    };

    _this.filterDifficulty = function (difficulty) {
      _this.setState(function (prevState) {
        console.log('localStorage', JSON.parse(localStorage.getItem("storedState")));
        var storedCardList = JSON.parse(localStorage.getItem("storedState"));
        var newCardList = storedCardList.filter(function (card) {
          return card.difficulty === difficulty;
        });
        return { cards: newCardList };
      });
    };

    _this.setNewCard = function (e) {
      var id = e.target.id;
      var value = e.target.value;
      _this.setState(function (prevState) {
        var newCard = prevState.newCard;
        newCard[id] = value;
        return { newCard: newCard };
      });
    };

    _this.addNewCard = function () {
      _this.setState(function (prevState) {
        var newCard = prevState.newCard;
        newCard["hidden"] = false;
        var newCardList = localStorage.getItem("storedState") ? JSON.parse(localStorage.getItem("storedState")) : [];
        newCardList.push(newCard);
        localStorage.setItem("storedState", JSON.stringify(newCardList));
        return { cards: newCardList, buttons: genButtons(), difficulties: genDifficulties() };
      });
    };

    _this.deleteCard = function (id) {
      console.log(id);
      _this.setState(function (prevState) {
        var newCardList = JSON.parse(localStorage.getItem("storedState"));
        newCardList.splice(id, 1);
        localStorage.setItem("storedState", JSON.stringify(newCardList));
        return { cards: newCardList, buttons: genButtons(), difficulties: genDifficulties() };
      });
    };

    _this.showAll = function () {
      _this.setState({ cards: genCards() });
    };

    _this.state = {
      cards: genCards(),
      buttons: genButtons(),
      difficulties: genDifficulties(),
      newCard: {}
    };
    _this.showSubmit = _this.showSubmit.bind(_this);
    _this.filterTarget = _this.filterTarget.bind(_this);
    _this.filterDifficulty = _this.filterDifficulty.bind(_this);
    _this.setNewCard = _this.setNewCard.bind(_this);
    _this.addNewCard = _this.addNewCard.bind(_this);
    _this.deleteCard = _this.deleteCard.bind(_this);
    _this.showAll = _this.showAll.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {

      return React.createElement(CardsContainer, {
        cards: this.state.cards,
        buttons: this.state.buttons,
        difficulties: this.state.difficulties,
        showSubmit: this.showSubmit,
        filterTarget: this.filterTarget,
        filterDifficulty: this.filterDifficulty,
        newCard: this.state.newCard,
        setNewCard: this.setNewCard,
        addNewCard: this.addNewCard,
        deleteCard: this.deleteCard,
        showAll: this.showAll
      });
    }
  }]);

  return App;
}(React.Component);

var CardsContainer = function CardsContainer(props) {
  var cards = props.cards,
      buttons = props.buttons,
      difficulties = props.difficulties,
      showSubmit = props.showSubmit,
      filterTarget = props.filterTarget,
      setNewCard = props.setNewCard,
      newCard = props.newCard,
      addNewCard = props.addNewCard,
      deleteCard = props.deleteCard,
      showAll = props.showAll,
      filterDifficulty = props.filterDifficulty;

  var cardlist = [];
  for (var i = 0; i < cards.length; i++) {
    cardlist.push(React.createElement(Card, { key: i, hidden: cards[i].hidden, card: cards[i], showSubmit: showSubmit, id: i, deleteCard: deleteCard }));
  }
  return React.createElement(
    "div",
    { className: "app__container" },
    React.createElement(
      "div",
      { className: "buttons__container" },
      React.createElement(FilterButtons, { filterTarget: filterTarget, buttons: buttons, showAll: showAll }),
      React.createElement(FilterDifficulties, { filterDifficulty: filterDifficulty, difficulties: difficulties, showAll: showAll })
    ),
    React.createElement(
      "div",
      { className: "cards__container" },
      cardlist,
      React.createElement(CardCreator, { newCard: newCard, setNewCard: setNewCard, addNewCard: addNewCard })
    )
  );
};

var FilterButtons = function FilterButtons(props) {
  console.log(props);
  var buttons = props.buttons,
      filterTarget = props.filterTarget,
      showAll = props.showAll;

  var buttonList = [];
  for (var i = 0; i < buttons.length; i++) {
    buttonList.push(React.createElement(FilterButton, { key: i, button: buttons[i], filterTarget: filterTarget }));
  }
  return React.createElement(
    "div",
    { className: "filter__container" },
    buttonList,
    React.createElement(ShowAll, { showAll: showAll })
  );
};

var FilterButton = function FilterButton(props) {
  var button = props.button,
      filterTarget = props.filterTarget;

  return React.createElement(
    "button",
    { onClick: function onClick() {
        return filterTarget(button);
      } },
    button
  );
};

var FilterDifficulties = function FilterDifficulties(props) {
  console.log(props);
  var difficulties = props.difficulties,
      filterDifficulty = props.filterDifficulty,
      showAll = props.showAll;

  var buttonList = [];
  for (var i = 0; i < difficulties.length; i++) {
    buttonList.push(React.createElement(FilterDifficulty, { key: i, difficulties: difficulties[i], filterDifficulty: filterDifficulty }));
  }
  return React.createElement(
    "div",
    { className: "filter__container" },
    buttonList,
    React.createElement(ShowAll, { showAll: showAll })
  );
};

var FilterDifficulty = function FilterDifficulty(props) {
  var difficulties = props.difficulties,
      filterDifficulty = props.filterDifficulty;

  return React.createElement(
    "button",
    { onClick: function onClick() {
        return filterDifficulty(difficulties);
      } },
    difficulties
  );
};

var ShowAll = function ShowAll(props) {
  var showAll = props.showAll;

  return React.createElement(
    "button",
    { onClick: showAll },
    "Show All Menus"
  );
};

var Card = function Card(props) {
  var card = props.card,
      hidden = props.hidden,
      showSubmit = props.showSubmit,
      id = props.id,
      deleteCard = props.deleteCard;

  return React.createElement(
    "div",
    null,
    hidden ? React.createElement(SubmitRequest, { card: card }) : React.createElement(CardDetails, { card: card, showSubmit: showSubmit, id: id, deleteCard: deleteCard })
  );
};

var CardDetails = function CardDetails(props) {
  var showSubmit = props.showSubmit,
      id = props.id,
      card = props.card,
      deleteCard = props.deleteCard;
  var title = card.title,
      target = card.target,
      description = card.description,
      duration = card.duration,
      participants = card.participants,
      applications = card.applications,
      difficulty = card.difficulty;

  return React.createElement(
    "div",
    { className: "card" },
    React.createElement(CardDeletor, { id: id, deleteCard: deleteCard }),
    React.createElement(
      "h2",
      null,
      title
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "span",
        { className: "tag" },
        target
      ),
      React.createElement(
        "span",
        { className: "difficulty" },
        difficulty
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "h3",
        null,
        "Description:"
      ),
      React.createElement(
        "p",
        null,
        description
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "h3",
        null,
        "Duration:"
      ),
      React.createElement(
        "span",
        null,
        duration,
        " hours"
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "h3",
        null,
        "Participants:"
      ),
      React.createElement(
        "span",
        null,
        participants
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "h3",
        null,
        "Applications:"
      ),
      React.createElement(
        "span",
        null,
        applications
      )
    ),
    React.createElement(
      "button",
      { onClick: function onClick() {
          return showSubmit(id);
        } },
      "Request This Training"
    )
  );
};

var SubmitRequest = function SubmitRequest(props) {
  var card = props.card;
  var title = card.title,
      target = card.target,
      description = card.description,
      duration = card.duration,
      participants = card.participants,
      applications = card.applications,
      difficulty = card.difficulty;

  return React.createElement(
    "div",
    { className: "card submitted" },
    React.createElement(
      "h2",
      null,
      title
    ),
    React.createElement(
      "p",
      null,
      "Request Submitted."
    )
  );
};

var CardCreator = function CardCreator(props) {
  var newCard = props.newCard,
      setNewCard = props.setNewCard,
      addNewCard = props.addNewCard;
  var title = newCard.title,
      target = newCard.target,
      description = newCard.description,
      duration = newCard.duration,
      participants = newCard.participants,
      applications = newCard.applications,
      difficulty = newCard.difficulty;


  return React.createElement(
    "div",
    { className: "card creator" },
    React.createElement(
      "h2",
      null,
      "Add a Menu"
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Title:",
        React.createElement("input", { type: "text", id: "title", value: title, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Target:",
        React.createElement("input", { type: "text", id: "target", value: target, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Description:",
        React.createElement("input", { type: "text", id: "description", value: description, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Duration:",
        React.createElement("input", { type: "text", id: "duration", value: duration, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Partipants:",
        React.createElement("input", { type: "text", id: "participants", value: participants, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Applications:",
        React.createElement("input", { type: "text", id: "applications", value: applications, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Difficulty:",
        React.createElement("input", { type: "text", id: "difficulty", value: difficulty, onChange: setNewCard })
      )
    ),
    React.createElement(
      "button",
      { onClick: addNewCard },
      "Submit Idea"
    )
  );
};

var CardDeletor = function CardDeletor(props) {
  var deleteCard = props.deleteCard,
      id = props.id;

  return React.createElement(
    "button",
    { className: "delete__button", onClick: function onClick() {
        return deleteCard(id);
      } },
    "X"
  );
};

var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);