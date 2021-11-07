import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/Overview.jsx';
import axios from 'axios';
import RatingsReviews from './components/RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './components/QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItemsComparison from './components/RelatedItems/RelatedItemsComparison.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      num_Of_Ratings: 0,
      product_id: 0,
      name: ''
    }
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3000/products", { params: { path: "/products" } })
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
      axios.get("http://localhost:3000/reviews/meta", { params: { product_id: this.state.product_id } })
        .then((data) => {
          console.log(data.data);
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
        })
    }
  }

  handleCardClick(e) {
    this.setState({
      product_id: e.target.id,
      name: e.target.alt
    });

  }

  render() {
    return (
      <div className='app-container'>
        <Overview product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings}/>
        <div id='questionsAnswers'><QuestionsAnswers productName={this.state.name} id={this.state.product_id} /></div>
<<<<<<< HEAD
        <div id='relatedItems'><RelatedItemsComparison handleCardClick={this.handleCardClick} product_id={this.state.product_id}/></div>}
=======
        <div id='relatedItems'><RelatedItemsComparison handleCardClick={this.handleCardClick} product_id={this.state.product_id} /></div>
>>>>>>> 18dfb9aa79595bfe7c5aeeed3a393916d94336f3
        <div id='ratingsReviews'><RatingsReviews product_id={this.state.product_id} rating={this.state.rating} num_Of_Ratings={this.state.num_Of_Ratings} /></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));