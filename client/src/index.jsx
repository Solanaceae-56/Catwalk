import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview.jsx';
import axios from 'axios';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItems/RelatedItemsComparison.jsx';
import { createContext } from 'react';
const AppContext = createContext();
export default AppContext;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      num_Of_Ratings: 0,
      product_id: 0,
      name: '',
      darkMode: false,
    }
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
  }

  componentDidMount() {
    axios.get("/products", { params: { path: "/products" } })
      .then((data) => {
        this.setState({
          product_id: data.data['0']['id'],
          name: data.data['0']['name'],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.product_id !== this.state.product_id) {
      axios.get("/reviews/meta", { params: { product_id: this.state.product_id } })
        .then((data) => {
          var total = 0;
          var votes = 0;
          for (var key in data.data.ratings) {
            total += key * parseInt(data.data.ratings[key], 10);
            votes += parseInt(data.data.ratings[key], 10);
          }
          var average = Math.round(1000 * total / votes) / 1000;
          this.setState({
            rating: average,
            num_Of_Ratings: votes,
          });
        });
    }
  }

  handleCardClick(e) {
    this.setState({
      product_id: e.target.id,
      name: e.target.alt
    });

  }

  handleDarkMode() {
    if (this.state.darkMode) {
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
      this.setState({
        darkMode: false
      });
    } else {
      document.body.style.backgroundColor="rgb(60, 60, 60)";
      document.body.style.color="white";
      this.setState({
        darkMode: true
      });
    }
  }

  render() {
    var lightDark;
    if (this.state.darkMode) {
      lightDark = <button id='lightDarkMode' onClick={(e) => this.handleDarkMode(e)}> Light</button>;
    } else {
      lightDark = <button id='lightDarkMode' onClick={(e) => this.handleDarkMode(e)}> Dark </button>;
    }

    return (
      <AppContext.Provider value={this.state.darkMode}>
        <div>
          {lightDark}
        </div>
        <div className='app-container' onClick={this.handleClickElement}>
           <Overview product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} />
          <div id='questionsAnswers'><QuestionsAnswers productName={this.state.name} id={this.state.product_id} /></div>
          <div id='relatedItems'><RelatedItemsComparison handleCardClick={this.handleCardClick} product_id={this.state.product_id} /></div>
          <div id='ratingsReviews'><RatingsReviews product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} /></div>
        </div>
      </AppContext.Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
