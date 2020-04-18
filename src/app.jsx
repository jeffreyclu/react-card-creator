'use strict';

const genCards = () => {
  if (!localStorage.getItem("storedState")) {
    return [];
  }
  else return JSON.parse(localStorage.getItem("storedState"));
}

const genButtons = () => {
  if (!localStorage.getItem("storedState")) {
    return [];
  }
  else {
    const cardsList = JSON.parse(localStorage.getItem("storedState"));
    const buttonSet = new Set();
    cardsList.forEach(card=>{
      buttonSet.add(card.target);
    })
    return Array.from(buttonSet)
  }
}

const genDifficulties = () => {
  if (!localStorage.getItem("storedState")) {
    return [];
  }
  else {
    const cardsList = JSON.parse(localStorage.getItem("storedState"));
    const difficultySet = new Set();
    cardsList.forEach(card=>{
      difficultySet.add(card.difficulty);
    })
    return Array.from(difficultySet)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      buttons: [],
      difficulties: [],
      newCard: {},
    };
    this.showSubmit = this.showSubmit.bind(this);
    this.filterTarget = this.filterTarget.bind(this);
    this.filterDifficulty = this.filterDifficulty.bind(this);
    this.setNewCard = this.setNewCard.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("storedState")) {
      fetch('data.json')
      .then((response) => {
        return response.json();
      }).then((data)=>{
        const cardsList = data.data;
        localStorage.setItem("storedState", JSON.stringify(cardsList));
        this.setState({cards: cardsList, buttons: genButtons(), difficulties: genDifficulties()});
      });
      return;
    } else {
      const cardsList = JSON.parse(localStorage.getItem("storedState"));
      this.setState({cards: cardsList, buttons: genButtons(), difficulties: genDifficulties()});
    }
  }

  showSubmit = (id) => {
    this.setState(prevState=>{
      const newCardList = [...prevState.cards];
      newCardList[id].hidden = !newCardList[id].hidden;
      return { cards: newCardList };
    })
  }

  filterTarget = (target) => {
    this.setState(prevState=>{
      const storedCardList = JSON.parse(localStorage.getItem("storedState"))
      const newCardList = storedCardList.filter(card=>card.target === target);
      return { cards: newCardList};
    })
  }

  filterDifficulty = (difficulty) => {
    this.setState(prevState=>{
      const storedCardList = JSON.parse(localStorage.getItem("storedState"))
      const newCardList = storedCardList.filter(card=>card.difficulty === difficulty);
      return { cards: newCardList};
    })
  }

  setNewCard = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.setState(prevState=>{
      const newCard = prevState.newCard;
      newCard[id] = value;
      return { newCard: newCard }
    })
  }

  addNewCard = () => {
    this.setState(prevState=>{
      const newCard = prevState.newCard;
      newCard["hidden"] = false;
      const newCardList = localStorage.getItem("storedState") ? JSON.parse(localStorage.getItem("storedState")) : [];
      newCardList.push(newCard);
      localStorage.setItem("storedState", JSON.stringify(newCardList));
      return { cards: newCardList, buttons: genButtons(), difficulties: genDifficulties() };
    })
  }

  deleteCard = (id) => {
    // console.log(id)
    this.setState(prevState=>{
      const newCardList = JSON.parse(localStorage.getItem("storedState"));
      newCardList.splice(id, 1);
      localStorage.setItem("storedState", JSON.stringify(newCardList));
      return { cards: newCardList, buttons: genButtons(), difficulties: genDifficulties() };
    })
  }

  showAll = () => {
    this.setState({ cards: genCards()});
  }

  render() {

    return (
        <CardsContainer 
          cards={this.state.cards}
          buttons={this.state.buttons}
          difficulties={this.state.difficulties} 
          showSubmit={this.showSubmit} 
          filterTarget={this.filterTarget}
          filterDifficulty={this.filterDifficulty} 
          newCard={this.state.newCard} 
          setNewCard={this.setNewCard}
          addNewCard={this.addNewCard} 
          deleteCard={this.deleteCard}
          showAll={this.showAll}
        />
    );
  }
}

const CardsContainer = props => {
  const {cards, buttons, difficulties, showSubmit, filterTarget, setNewCard, newCard, addNewCard, deleteCard, showAll, filterDifficulty} = props;
  const cardlist = [];
  for (let i = 0; i < cards.length; i++) {
    cardlist.push(<Card key={i} hidden={cards[i].hidden} card={cards[i]} showSubmit={showSubmit} id={i} deleteCard={deleteCard} />);
  }
  return(
    <div className="app__container">
      <div className="buttons__container">
        <FilterButtons filterTarget={filterTarget} buttons={buttons} showAll={showAll} />
        <FilterDifficulties filterDifficulty={filterDifficulty} difficulties={difficulties} showAll={showAll} />
      </div>
      <div className = "cards__container">
        {cardlist}
        <CardCreator newCard={newCard} setNewCard={setNewCard} addNewCard={addNewCard} />
      </div>
    </div>
  )
}

const FilterButtons = props => {
  const { buttons, filterTarget, showAll } = props;
  const buttonList = [];
  for (let i = 0; i < buttons.length; i++) {
    buttonList.push(<FilterButton key={i} button={buttons[i]} filterTarget={filterTarget} />);
  }
  return(
    <div className="filter__container">
      {buttonList}
      <ShowAll showAll={showAll}/>
    </div>
  )
}

const FilterButton = props => {
  const { button, filterTarget} = props;
  return (
    <button onClick={()=>filterTarget(button)}>{button}</button>
  )
}

const FilterDifficulties = props => {
  const { difficulties, filterDifficulty, showAll } = props;
  const buttonList = [];
  for (let i = 0; i < difficulties.length; i++) {
    buttonList.push(<FilterDifficulty key={i} difficulties={difficulties[i]} filterDifficulty={filterDifficulty} />);
  }
  return(
    <div className="filter__container">
      {buttonList}
      <ShowAll showAll={showAll}/>
    </div>
  )
}

const FilterDifficulty = props => {
  const { difficulties, filterDifficulty} = props;
  return (
    <button onClick={()=>filterDifficulty(difficulties)}>{difficulties}</button>
  )
}

const ShowAll = props => {
  const { showAll } = props;
  return (
    <button onClick={showAll}>Show All Menus</button>
  )
}

const Card = props => {
  const {card, hidden, showSubmit, id, deleteCard} = props;
  return(
    <div>
      {hidden ?
      <SubmitRequest card={card}/> :
      <CardDetails card={card} showSubmit={showSubmit} id={id} deleteCard={deleteCard} />
      }
    </div>
  )
}

const CardDetails = props => {
  const {showSubmit, id, card, deleteCard} = props
  const {title, target, description, duration, participants, applications, difficulty} = card
  return(
    <div className = "card">
      <CardDeletor id={id} deleteCard={deleteCard} />
      <h2>{title}</h2>
      <div className = "row">
        <span className = "tag">{target}</span>
        <span className = "difficulty">{difficulty}</span>
      </div>
      <div className = "row">
        <h3>Description:</h3>
        <p>{description}</p>
      </div>
      <div className = "row">
        <h3>Duration:</h3>
        <span>{duration} hours</span>
      </div>
      <div className = "row">
        <h3>Participants:</h3>
        <span>{participants}</span>
      </div>
      <div className = "row">
        <h3>Applications:</h3>
        <span>{applications}</span>
      </div>
      <button onClick={()=>showSubmit(id)}>Request This Training</button>
    </div>
  )
}

const SubmitRequest = props => {
  const { card } = props;
  const {title, target, description, duration, participants, applications, difficulty} = card
  return(
    <div className="card submitted">
      <h2>{title}</h2>
      <p>Request Submitted.</p>
    </div>
  )
}

const CardCreator = props => {
  const {newCard, setNewCard, addNewCard} = props;
  const { title, target, description, duration, participants, applications, difficulty } = newCard;

  return(
    <div className = "card creator">
      <h2>Add a Menu</h2>
      <div className = "row">
        <label>
          Title:
        <input type="text" id="title" value={title} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Target:
        <input type="text" id="target" value={target} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Description:
        <input type="text" id="description" value={description} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Duration:
        <input type="text" id="duration" value={duration} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Partipants:
        <input type="text" id="participants" value={participants} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Applications:
        <input type="text" id="applications" value={applications} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Difficulty:
        <input type="text" id="difficulty" value={difficulty} onChange={setNewCard} />
        </label>
      </div>
      <button onClick={addNewCard}>Submit Idea</button>
    </div>
  )
}

const CardDeletor = props => {
  const { deleteCard, id } = props;
  return(
    <button className="delete__button" onClick={()=>deleteCard(id)}>X</button>
  )
}



let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);